// API route for admin to fix permissions on existing projects and phases

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Client, Account, Databases, Query } from 'node-appwrite'

const PORTAL_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PORTAL_DATABASE_ID as string
const PROJECTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID as string
const PROJECT_PHASES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_PHASES_COLLECTION_ID as string
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID as string

// Create admin client with API key
function getAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string)

  return {
    databases: new Databases(client),
  }
}

// Create session client to verify user
async function getSessionClient(sessionCookie: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setSession(sessionCookie)

  return {
    account: new Account(client),
  }
}

// Verify user is admin
async function verifyAdminAccess(sessionCookie: string): Promise<boolean> {
  try {
    const { account } = await getSessionClient(sessionCookie)
    const user = await account.get()

    const { databases } = getAdminClient()
    const profiles = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('userId', user.$id)]
    )

    if (profiles.documents.length === 0) return false

    const profile = profiles.documents[0]
    return profile.role === 'admin' || profile.role === 'manager'
  } catch {
    return false
  }
}

export async function POST(_request: NextRequest) {
  try {
    // Get session from cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin access
    const isAdmin = await verifyAdminAccess(sessionCookie)

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { databases } = getAdminClient()
    const errors: string[] = []
    let projectsFixed = 0
    let phasesFixed = 0

    // Fix project permissions
    try {
      const projectsResponse = await databases.listDocuments(
        PORTAL_DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.limit(500)]
      )

      for (const project of projectsResponse.documents) {
        try {
          // Set permissions: owner can read/update/delete, no public access
          await databases.updateDocument(
            PORTAL_DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            project.$id,
            {}, // No data changes
            [
              `read("user:${project.userId}")`,
              `update("user:${project.userId}")`,
              `delete("user:${project.userId}")`,
            ]
          )
          projectsFixed++
        } catch (err) {
          errors.push(`Project ${project.$id}: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
      }
    } catch (err) {
      errors.push(`Failed to list projects: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    // Fix phase permissions
    try {
      const phasesResponse = await databases.listDocuments(
        PORTAL_DATABASE_ID,
        PROJECT_PHASES_COLLECTION_ID,
        [Query.limit(1000)]
      )

      // Get all projects to find the owner of each phase
      const projectsResponse = await databases.listDocuments(
        PORTAL_DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        [Query.limit(500)]
      )
      const projectOwners = new Map<string, string>(
        projectsResponse.documents.map((p) => [p.$id, p.userId as string])
      )

      for (const phase of phasesResponse.documents) {
        try {
          const ownerId = projectOwners.get(phase.projectId)
          if (!ownerId) {
            errors.push(`Phase ${phase.$id}: Could not find project owner`)
            continue
          }

          // Set permissions: owner can read/update
          await databases.updateDocument(
            PORTAL_DATABASE_ID,
            PROJECT_PHASES_COLLECTION_ID,
            phase.$id,
            {}, // No data changes
            [
              `read("user:${ownerId}")`,
              `update("user:${ownerId}")`,
            ]
          )
          phasesFixed++
        } catch (err) {
          errors.push(`Phase ${phase.$id}: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
      }
    } catch (err) {
      errors.push(`Failed to list phases: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }

    return NextResponse.json({
      success: errors.length === 0,
      projectsFixed,
      phasesFixed,
      errors,
    })
  } catch (error) {
    console.error('Fix permissions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fix permissions' },
      { status: 500 }
    )
  }
}
