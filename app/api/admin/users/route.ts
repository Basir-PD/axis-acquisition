// API route for admin to fetch all users (bypasses document permissions)

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Client, Account, Databases, Query } from 'node-appwrite'

const PORTAL_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PORTAL_DATABASE_ID as string
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
    const { isAdmin } = await verifyAdminAccess(sessionCookie)

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    // Use admin client to fetch ALL users
    const { databases } = getAdminClient()

    const usersResponse = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(500)]
    )

    return NextResponse.json({ users: usersResponse.documents })
  } catch (error) {
    console.error('Admin users API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
