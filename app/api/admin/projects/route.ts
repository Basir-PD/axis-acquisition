// API route for admin to fetch all projects (bypasses document permissions)

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Client, Account, Databases, Query, Models } from 'node-appwrite'

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
    databases: new Databases(client),
  }
}

// Verify user is admin or manager
async function verifyAdminAccess(sessionCookie: string): Promise<{ isAdmin: boolean; userId: string | null }> {
  try {
    const { account } = await getSessionClient(sessionCookie)
    const user = await account.get()

    // Get user profile to check role
    const { databases } = getAdminClient()
    const profiles = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('userId', user.$id)]
    )

    if (profiles.documents.length === 0) {
      return { isAdmin: false, userId: null }
    }

    const profile = profiles.documents[0]
    const isAdmin = profile.role === 'admin' || profile.role === 'manager'

    return { isAdmin, userId: user.$id }
  } catch {
    return { isAdmin: false, userId: null }
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Get session from cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin access
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { isAdmin, userId: _userId } = await verifyAdminAccess(sessionCookie)

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Use admin client to fetch ALL projects
    const { databases } = getAdminClient()

    const projectsResponse = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(500)]
    )

    // Fetch phases for each project
    const projectsWithPhases = await Promise.all(
      projectsResponse.documents.map(async (project: Models.Document) => {
        const phasesResponse = await databases.listDocuments(
          PORTAL_DATABASE_ID,
          PROJECT_PHASES_COLLECTION_ID,
          [Query.equal('projectId', project.$id), Query.orderAsc('order')]
        )
        return {
          ...project,
          phases: phasesResponse.documents,
        }
      })
    )

    return NextResponse.json({ projects: projectsWithPhases })
  } catch (error) {
    console.error('Admin projects API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
