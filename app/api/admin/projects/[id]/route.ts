// API route for admin to update/delete individual projects (bypasses document permissions)

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

// Verify user is admin or manager
async function verifyAdminAccess(sessionCookie: string): Promise<{ isAdmin: boolean; userId: string | null }> {
  try {
    const { account } = await getSessionClient(sessionCookie)
    const user = await account.get()

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

// PATCH - Update a project
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params

    // Get session from cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin access
    const { isAdmin } = await verifyAdminAccess(sessionCookie)

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Get update data from request body
    const updateData = await request.json()

    // Use admin client to update the project
    const { databases } = getAdminClient()

    const updatedProject = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId,
      updateData
    )

    return NextResponse.json({ project: updatedProject })
  } catch (error) {
    console.error('Admin project update API error:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a project and its phases
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params

    // Get session from cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin access
    const { isAdmin } = await verifyAdminAccess(sessionCookie)

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { databases } = getAdminClient()

    // First, delete all phases for this project
    const phasesResponse = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      [Query.equal('projectId', projectId)]
    )

    for (const phase of phasesResponse.documents) {
      await databases.deleteDocument(
        PORTAL_DATABASE_ID,
        PROJECT_PHASES_COLLECTION_ID,
        phase.$id
      )
    }

    // Then delete the project
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin project delete API error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
