// Server-side Appwrite client with API key for admin operations
// This bypasses document-level permissions

import { Client, Databases, Query } from 'node-appwrite'

// Initialize server client with API key
const serverClient = new Client()

serverClient
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setKey(process.env.APPWRITE_API_KEY as string) // Server-side API key

export const serverDatabases = new Databases(serverClient)

export const PORTAL_DATABASE_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PORTAL_DATABASE_ID as string
export const PROJECTS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID as string
export const PROJECT_PHASES_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_PROJECT_PHASES_COLLECTION_ID as string
export const USERS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID as string

export { Query }

// Server-side project operations (bypasses permissions)
export const serverProjectsService = {
  async listAll(): Promise<unknown[]> {
    const response = await serverDatabases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(500)],
    )
    return response.documents
  },

  async update(
    projectId: string,
    data: Record<string, unknown>,
    permissions?: string[],
  ): Promise<unknown> {
    return await serverDatabases.updateDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId,
      data,
      permissions,
    )
  },
}

// Server-side phase operations (bypasses permissions)
export const serverPhasesService = {
  async listByProject(projectId: string): Promise<unknown[]> {
    const response = await serverDatabases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      [Query.equal('projectId', projectId), Query.orderAsc('order')],
    )
    return response.documents
  },

  async listAll(): Promise<unknown[]> {
    const response = await serverDatabases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      [Query.limit(1000)],
    )
    return response.documents
  },

  async update(
    phaseId: string,
    data: Record<string, unknown>,
    permissions?: string[],
  ): Promise<unknown> {
    return await serverDatabases.updateDocument(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      phaseId,
      data,
      permissions,
    )
  },
}

// Server-side users operations
export const serverUsersService = {
  async listClients(): Promise<unknown[]> {
    const response = await serverDatabases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('role', 'client'), Query.orderAsc('name')],
    )
    return response.documents
  },

  async getByUserId(userId: string): Promise<unknown | null> {
    try {
      const response = await serverDatabases.listDocuments(
        PORTAL_DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('userId', userId)],
      )
      return response.documents[0] || null
    } catch {
      return null
    }
  },
}
