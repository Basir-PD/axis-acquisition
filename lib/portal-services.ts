import { Query } from 'appwrite'
import {
  databases,
  ID,
  PORTAL_DATABASE_ID,
  PROJECTS_COLLECTION_ID,
  PROJECT_PHASES_COLLECTION_ID,
  INVOICES_COLLECTION_ID,
  MESSAGES_COLLECTION_ID,
  MESSAGE_REPLIES_COLLECTION_ID,
  FILES_COLLECTION_ID,
  NOTIFICATIONS_COLLECTION_ID,
  USERS_COLLECTION_ID,
  UserProfile,
} from './appwrite'

// ============================================
// Types
// ============================================

export type ServiceType =
  | 'web-development'
  | 'mobile-development'
  | 'marketing'
  | 'ai-automation'

export type PackageTier = 'starter' | 'professional' | 'enterprise'

export type WebsiteType =
  | 'landing-page'
  | 'business-website'
  | 'e-commerce'
  | 'web-application'
  | 'portfolio'

export type ProjectStatus =
  | 'pending'
  | 'approved'
  | 'in-progress'
  | 'review'
  | 'completed'
  | 'on-hold'
  | 'cancelled'

export type PhaseStatus = 'pending' | 'in-progress' | 'completed'

export type InvoiceStatus =
  | 'draft'
  | 'pending'
  | 'paid'
  | 'overdue'
  | 'cancelled'

export type MessageType = 'inquiry' | 'support' | 'feedback' | 'general'

export type MessageStatus = 'open' | 'in-progress' | 'resolved' | 'closed'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type FileCategory = 'deliverable' | 'asset' | 'document' | 'other'

export type NotificationType =
  | 'project_update'
  | 'invoice'
  | 'message'
  | 'system'

export type BudgetRange =
  | 'under-1k'
  | '1k-5k'
  | '5k-10k'
  | '10k-25k'
  | '25k-50k'
  | '50k-plus'
  | 'not-sure'

export interface Project {
  $id: string
  $createdAt: string
  $updatedAt: string
  userId: string
  name: string
  service: ServiceType
  packageTier: PackageTier
  subType?: string // e.g., 'landing-page', 'ios-app', 'paid-ads', 'ai-chatbot'
  status: ProjectStatus
  description?: string
  budget?: string
  budgetRange?: BudgetRange
  timeline?: string
  notes?: string
  adminNotes?: string // Internal notes visible only to admin/manager
  revisions?: number
  features?: string[]
  addons?: string[]
  attachments?: string[] // Array of file IDs from storage
}

export interface ProjectPhase {
  $id: string
  $createdAt: string
  projectId: string
  name: string
  status: PhaseStatus
  progress: number
  order: number
}

export interface Invoice {
  $id: string
  $createdAt: string
  projectId: string
  userId: string
  amount: number
  status: InvoiceStatus
  dueDate: string
  paidAt?: string
  invoiceNumber: string
  description?: string
}

export interface Message {
  $id: string
  $createdAt: string
  userId: string
  projectId?: string
  subject: string
  content: string
  type: MessageType
  status: MessageStatus
  priority: Priority
}

export interface MessageReply {
  $id: string
  $createdAt: string
  messageId: string
  userId: string
  content: string
  isStaff: boolean
}

export interface FileRecord {
  $id: string
  $createdAt: string
  projectId: string
  userId: string
  name: string
  fileId: string
  mimeType: string
  size: number
  category: FileCategory
}

export interface Notification {
  $id: string
  $createdAt: string
  userId: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  link?: string
}

// ============================================
// Service configurations (for UI)
// ============================================

export const SERVICE_CONFIG: Record<
  ServiceType,
  {
    name: string
    icon: string
    description: string
    basePhases: { id: string; name: string }[]
  }
> = {
  'web-development': {
    name: 'Web Development',
    icon: 'Globe',
    description: 'Custom websites & web applications',
    basePhases: [
      { id: 'discovery', name: 'Discovery & Planning' },
      { id: 'design', name: 'Design & Wireframes' },
      { id: 'development', name: 'Development' },
      { id: 'testing', name: 'Testing & QA' },
      { id: 'launch', name: 'Launch & Deployment' },
    ],
  },
  'mobile-development': {
    name: 'Mobile Development',
    icon: 'Smartphone',
    description: 'iOS & Android mobile applications',
    basePhases: [
      { id: 'discovery', name: 'Discovery & Planning' },
      { id: 'design', name: 'UI/UX Design' },
      { id: 'development', name: 'App Development' },
      { id: 'testing', name: 'Testing & QA' },
      { id: 'deployment', name: 'App Store Deployment' },
    ],
  },
  marketing: {
    name: 'Marketing',
    icon: 'Megaphone',
    description: 'Ads, SEO & growth strategies',
    basePhases: [
      { id: 'audit', name: 'Marketing Audit' },
      { id: 'strategy', name: 'Strategy Development' },
      { id: 'execution', name: 'Campaign Execution' },
      { id: 'optimization', name: 'Optimization' },
      { id: 'reporting', name: 'Reporting & Analysis' },
    ],
  },
  'ai-automation': {
    name: 'AI Automation',
    icon: 'Bot',
    description: 'Chatbots, voice agents & AI solutions',
    basePhases: [
      { id: 'requirements', name: 'Requirements Analysis' },
      { id: 'design', name: 'Solution Design' },
      { id: 'development', name: 'Development & Training' },
      { id: 'testing', name: 'Testing & Refinement' },
      { id: 'deployment', name: 'Deployment & Integration' },
    ],
  },
}

export const PACKAGE_CONFIG: Record<
  PackageTier,
  {
    name: string
    description: string
    popular?: boolean
  }
> = {
  starter: {
    name: 'Starter',
    description: 'Perfect for small projects and startups',
  },
  professional: {
    name: 'Professional',
    description: 'Best for growing businesses',
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large-scale operations',
  },
}

// ============================================
// Projects Service
// ============================================

export const projectsService = {
  async create(
    userId: string,
    data: Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>,
  ): Promise<Project> {
    const project = await databases.createDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        ...data,
      },
      [
        // Only the project owner can access their project
        // Admins use server-side API with API key to bypass these permissions
        `read("user:${userId}")`,
        `update("user:${userId}")`,
        `delete("user:${userId}")`,
      ],
    )
    return project as unknown as Project
  },

  async getById(projectId: string): Promise<Project | null> {
    try {
      const project = await databases.getDocument(
        PORTAL_DATABASE_ID,
        PROJECTS_COLLECTION_ID,
        projectId,
      )
      return project as unknown as Project
    } catch {
      return null
    }
  },

  async listByUser(userId: string): Promise<Project[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Project[]
  },

  async listAll(queries: string[] = []): Promise<Project[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [...queries, Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Project[]
  },

  async update(
    projectId: string,
    data: Partial<
      Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>
    >,
  ): Promise<Project> {
    const project = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId,
      data,
    )
    return project as unknown as Project
  },

  async delete(projectId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId,
    )
  },
}

// ============================================
// Project Phases Service
// ============================================

export const phasesService = {
  async createForProject(
    projectId: string,
    userId: string,
    service: ServiceType,
  ): Promise<ProjectPhase[]> {
    const basePhases = SERVICE_CONFIG[service].basePhases
    const phases: ProjectPhase[] = []

    for (let i = 0; i < basePhases.length; i++) {
      const phase = await databases.createDocument(
        PORTAL_DATABASE_ID,
        PROJECT_PHASES_COLLECTION_ID,
        ID.unique(),
        {
          projectId,
          name: basePhases[i].name,
          status: i === 0 ? 'in-progress' : 'pending',
          progress: 0,
          order: i,
        },
        [
          // Only the project owner can access their phases
          // Admins use server-side API with API key to bypass these permissions
          `read("user:${userId}")`,
          `update("user:${userId}")`,
        ],
      )
      phases.push(phase as unknown as ProjectPhase)
    }

    return phases
  },

  async listByProject(projectId: string): Promise<ProjectPhase[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      [Query.equal('projectId', projectId), Query.orderAsc('order')],
    )
    return response.documents as unknown as ProjectPhase[]
  },

  async update(
    phaseId: string,
    data: Partial<Omit<ProjectPhase, '$id' | '$createdAt' | 'projectId'>>,
  ): Promise<ProjectPhase> {
    const phase = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      PROJECT_PHASES_COLLECTION_ID,
      phaseId,
      data,
    )
    return phase as unknown as ProjectPhase
  },

  async deleteByProject(projectId: string): Promise<void> {
    const phases = await this.listByProject(projectId)
    for (const phase of phases) {
      await databases.deleteDocument(
        PORTAL_DATABASE_ID,
        PROJECT_PHASES_COLLECTION_ID,
        phase.$id,
      )
    }
  },
}

// ============================================
// Invoices Service
// ============================================

export const invoicesService = {
  async create(data: Omit<Invoice, '$id' | '$createdAt'>): Promise<Invoice> {
    const invoice = await databases.createDocument(
      PORTAL_DATABASE_ID,
      INVOICES_COLLECTION_ID,
      ID.unique(),
      data,
      [`read("user:${data.userId}")`],
    )
    return invoice as unknown as Invoice
  },

  async getById(invoiceId: string): Promise<Invoice | null> {
    try {
      const invoice = await databases.getDocument(
        PORTAL_DATABASE_ID,
        INVOICES_COLLECTION_ID,
        invoiceId,
      )
      return invoice as unknown as Invoice
    } catch {
      return null
    }
  },

  async listByUser(userId: string): Promise<Invoice[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      INVOICES_COLLECTION_ID,
      [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Invoice[]
  },

  async listByProject(projectId: string): Promise<Invoice[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      INVOICES_COLLECTION_ID,
      [Query.equal('projectId', projectId), Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Invoice[]
  },

  async update(
    invoiceId: string,
    data: Partial<Omit<Invoice, '$id' | '$createdAt' | 'projectId' | 'userId'>>,
  ): Promise<Invoice> {
    const invoice = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      INVOICES_COLLECTION_ID,
      invoiceId,
      data,
    )
    return invoice as unknown as Invoice
  },

  async delete(invoiceId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      INVOICES_COLLECTION_ID,
      invoiceId,
    )
  },

  generateInvoiceNumber(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `INV-${year}${month}-${random}`
  },
}

// ============================================
// Messages Service
// ============================================

export const messagesService = {
  async create(data: Omit<Message, '$id' | '$createdAt'>): Promise<Message> {
    const message = await databases.createDocument(
      PORTAL_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      data,
      [`read("user:${data.userId}")`, `update("user:${data.userId}")`],
    )
    return message as unknown as Message
  },

  async getById(messageId: string): Promise<Message | null> {
    try {
      const message = await databases.getDocument(
        PORTAL_DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        messageId,
      )
      return message as unknown as Message
    } catch {
      return null
    }
  },

  async listByUser(userId: string): Promise<Message[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Message[]
  },

  async listAll(queries: string[] = []): Promise<Message[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [...queries, Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as Message[]
  },

  async update(
    messageId: string,
    data: Partial<Omit<Message, '$id' | '$createdAt' | 'userId'>>,
  ): Promise<Message> {
    const message = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      messageId,
      data,
    )
    return message as unknown as Message
  },

  async delete(messageId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      messageId,
    )
  },
}

// ============================================
// Message Replies Service
// ============================================

export const messageRepliesService = {
  async create(
    data: Omit<MessageReply, '$id' | '$createdAt'>,
  ): Promise<MessageReply> {
    const reply = await databases.createDocument(
      PORTAL_DATABASE_ID,
      MESSAGE_REPLIES_COLLECTION_ID,
      ID.unique(),
      data,
      [`read("user:${data.userId}")`],
    )
    return reply as unknown as MessageReply
  },

  async listByMessage(messageId: string): Promise<MessageReply[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      MESSAGE_REPLIES_COLLECTION_ID,
      [Query.equal('messageId', messageId), Query.orderAsc('$createdAt')],
    )
    return response.documents as unknown as MessageReply[]
  },

  async delete(replyId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      MESSAGE_REPLIES_COLLECTION_ID,
      replyId,
    )
  },
}

// ============================================
// Files Service
// ============================================

export const filesService = {
  async create(
    data: Omit<FileRecord, '$id' | '$createdAt'>,
  ): Promise<FileRecord> {
    const file = await databases.createDocument(
      PORTAL_DATABASE_ID,
      FILES_COLLECTION_ID,
      ID.unique(),
      data,
      [`read("user:${data.userId}")`, `delete("user:${data.userId}")`],
    )
    return file as unknown as FileRecord
  },

  async listByProject(projectId: string): Promise<FileRecord[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      FILES_COLLECTION_ID,
      [Query.equal('projectId', projectId), Query.orderDesc('$createdAt')],
    )
    return response.documents as unknown as FileRecord[]
  },

  async delete(fileRecordId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      FILES_COLLECTION_ID,
      fileRecordId,
    )
  },
}

// ============================================
// Notifications Service
// ============================================

export const notificationsService = {
  async create(
    data: Omit<Notification, '$id' | '$createdAt'>,
  ): Promise<Notification> {
    const notification = await databases.createDocument(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      ID.unique(),
      data,
      [
        `read("user:${data.userId}")`,
        `update("user:${data.userId}")`,
        `delete("user:${data.userId}")`,
      ],
    )
    return notification as unknown as Notification
  },

  async listByUser(userId: string, limit = 50): Promise<Notification[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ],
    )
    return response.documents as unknown as Notification[]
  },

  async getUnreadCount(userId: string): Promise<number> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      [Query.equal('userId', userId), Query.equal('read', false)],
    )
    return response.total
  },

  async markAsRead(notificationId: string): Promise<Notification> {
    const notification = await databases.updateDocument(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      notificationId,
      { read: true },
    )
    return notification as unknown as Notification
  },

  async markAllAsRead(userId: string): Promise<void> {
    const unread = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      [Query.equal('userId', userId), Query.equal('read', false)],
    )

    for (const notification of unread.documents) {
      await databases.updateDocument(
        PORTAL_DATABASE_ID,
        NOTIFICATIONS_COLLECTION_ID,
        notification.$id,
        { read: true },
      )
    }
  },

  async delete(notificationId: string): Promise<void> {
    await databases.deleteDocument(
      PORTAL_DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      notificationId,
    )
  },
}

// ============================================
// Users Service (for admin to list clients)
// ============================================

export const usersService = {
  async listClients(): Promise<UserProfile[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('role', 'client'), Query.orderAsc('name')],
    )
    return response.documents as unknown as UserProfile[]
  },

  async listAll(): Promise<UserProfile[]> {
    const response = await databases.listDocuments(
      PORTAL_DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.orderAsc('name')],
    )
    return response.documents as unknown as UserProfile[]
  },

  async getById(userId: string): Promise<UserProfile | null> {
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
}
