// https://appwrite.io/docs/quick-starts/nextjs
import { Account, Client, Databases, Query, Storage } from 'appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)

export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client)
export { ID, Query } from 'appwrite'

// Legacy Database (Leads & Contacts)
export const DATABASE_ID = process.env
  .NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
export const LEADS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID as string
export const CONTACT_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID as string

// Portal Database and Collection IDs
export const PORTAL_DATABASE_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PORTAL_DATABASE_ID as string
export const USERS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID as string
export const PROJECTS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID as string
export const PROJECT_PHASES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PROJECT_PHASES_COLLECTION_ID as string
export const INVOICES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID as string
export const MESSAGES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID as string
export const MESSAGE_REPLIES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_MESSAGE_REPLIES_COLLECTION_ID as string
export const FILES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID as string
export const NOTIFICATIONS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID as string

// Storage Bucket IDs
export const PROJECT_ATTACHMENTS_BUCKET_ID = 'project-attachments'

// User roles
export type UserRole = 'client' | 'admin' | 'manager'

export interface UserProfile {
  $id: string
  userId: string
  email: string
  name: string
  role: UserRole
  company?: string
  phone?: string
  createdAt: string
}

// Auth helper functions
export const authHelpers = {
  // Get current user session
  async getCurrentUser() {
    try {
      return await account.get()
    } catch {
      return null
    }
  },

  // Get user profile from database
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const response = await databases.listDocuments(
        PORTAL_DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('userId', userId)],
      )
      return response.documents[0] as unknown as UserProfile
    } catch {
      return null
    }
  },

  // Create user profile after registration
  async createUserProfile(data: {
    userId: string
    email: string
    name: string
    role?: UserRole
    company?: string
    phone?: string
  }): Promise<UserProfile> {
    const { ID } = await import('appwrite')
    const profile = await databases.createDocument(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: data.userId,
        email: data.email,
        name: data.name,
        role: data.role || 'client',
        company: data.company || '',
        phone: data.phone || '',
      },
      [`read("user:${data.userId}")`, `update("user:${data.userId}")`],
    )
    return profile as unknown as UserProfile
  },

  // Update user profile
  async updateUserProfile(
    documentId: string,
    data: Partial<Omit<UserProfile, '$id' | 'userId' | 'createdAt'>>,
  ): Promise<UserProfile> {
    const profile = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
      data,
    )
    return profile as unknown as UserProfile
  },

  // Check if user has specific role
  hasRole(profile: UserProfile | null, roles: UserRole[]): boolean {
    if (!profile) return false
    return roles.includes(profile.role)
  },

  // Check if user is admin
  isAdmin(profile: UserProfile | null): boolean {
    return this.hasRole(profile, ['admin'])
  },

  // Check if user is manager or admin
  isManagerOrAdmin(profile: UserProfile | null): boolean {
    return this.hasRole(profile, ['admin', 'manager'])
  },
}

export default client
