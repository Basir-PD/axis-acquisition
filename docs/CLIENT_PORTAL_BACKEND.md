# Client Portal Backend - Appwrite Integration

## Overview

This document describes the complete backend implementation for the Axis Acquisition Client Portal using Appwrite as the database and authentication provider.

## Database Structure

### Database Information

| Property | Value |
|----------|-------|
| **Database Name** | users |
| **Database ID** | `692b262d003cd0a87f08` |
| **Endpoint** | `https://fra.cloud.appwrite.io/v1` |
| **Project ID** | `66ef79d30011a3e4e669` |

---

## Collections

### 1. Users (`userid`)

Stores user profile information linked to Appwrite Authentication.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string(36) | Yes | Links to Appwrite Auth user ID |
| `email` | string(320) | Yes | User email address |
| `name` | string(325) | Yes | Full name |
| `role` | enum | Yes | `client`, `admin`, `manager` |
| `company` | string(255) | No | Company name |
| `phone` | string(50) | No | Phone number |

**Indexes:** `userId_index`, `email_index`, `role_index`

---

### 2. Projects (`projects`)

Main project records for client work.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string(36) | Yes | Project owner ID |
| `name` | string(255) | Yes | Project name |
| `service` | enum | Yes | `website`, `logo`, `branding`, `marketing`, `chatbot`, `ai-voice`, `seo`, `social-media` |
| `packageTier` | enum | Yes | `starter`, `professional`, `enterprise` |
| `websiteType` | enum | No | `landing-page`, `business-website`, `e-commerce`, `web-application`, `portfolio` |
| `status` | enum | Yes | `pending`, `in-progress`, `review`, `completed`, `on-hold`, `cancelled` |
| `description` | string(2000) | No | Project description |
| `budget` | string(100) | No | Budget range |
| `timeline` | string(100) | No | Expected timeline |
| `notes` | string(5000) | No | Additional notes |
| `pages` | integer | No | Number of pages (for websites) |
| `revisions` | integer | No | Number of revisions included |
| `features` | string[] | No | List of features |
| `addons` | string[] | No | List of add-ons |

**Indexes:** `userId_index`, `status_index`, `service_index`

---

### 3. Project Phases (`project_phases`)

Tracks progress through project phases.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string(36) | Yes | Parent project ID |
| `name` | string(255) | Yes | Phase name |
| `status` | enum | Yes | `pending`, `in-progress`, `completed` |
| `progress` | integer(0-100) | Yes | Completion percentage |
| `order` | integer | Yes | Phase order number |

**Indexes:** `projectId_index`

---

### 4. Invoices (`invoices`)

Billing and payment tracking.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string(36) | Yes | Related project ID |
| `userId` | string(36) | Yes | Client user ID |
| `amount` | float | Yes | Invoice amount |
| `status` | enum | Yes | `draft`, `pending`, `paid`, `overdue`, `cancelled` |
| `dueDate` | datetime | Yes | Payment due date |
| `paidAt` | datetime | No | Date paid |
| `invoiceNumber` | string(50) | Yes | Unique invoice number |
| `description` | string(1000) | No | Invoice description |

**Indexes:** `userId_index`, `projectId_index`, `status_index`

---

### 5. Messages (`messages`)

Support tickets and client communication.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string(36) | Yes | Message author ID |
| `projectId` | string(36) | No | Related project (optional) |
| `subject` | string(255) | Yes | Message subject |
| `content` | string(10000) | Yes | Message content |
| `type` | enum | Yes | `inquiry`, `support`, `feedback`, `general` |
| `status` | enum | Yes | `open`, `in-progress`, `resolved`, `closed` |
| `priority` | enum | Yes | `low`, `medium`, `high`, `urgent` |

**Indexes:** `userId_index`, `status_index`

---

### 6. Message Replies (`message_replies`)

Threaded replies to messages.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | string(36) | Yes | Parent message ID |
| `userId` | string(36) | Yes | Reply author ID |
| `content` | string(10000) | Yes | Reply content |
| `isStaff` | boolean | Yes | Whether author is staff |

**Indexes:** `messageId_index`

---

### 7. Files (`files`)

File attachments for projects.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string(36) | Yes | Parent project ID |
| `userId` | string(36) | Yes | Uploader user ID |
| `name` | string(255) | Yes | File name |
| `fileId` | string(36) | Yes | Appwrite Storage file ID |
| `mimeType` | string(100) | Yes | File MIME type |
| `size` | integer | Yes | File size in bytes |
| `category` | enum | Yes | `deliverable`, `asset`, `document`, `other` |

**Indexes:** `projectId_index`

---

### 8. Notifications (`notifications`)

User notification system.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string(36) | Yes | Recipient user ID |
| `title` | string(255) | Yes | Notification title |
| `message` | string(1000) | Yes | Notification message |
| `type` | enum | Yes | `project_update`, `invoice`, `message`, `system` |
| `read` | boolean | Yes | Read status |
| `link` | string(500) | No | Action link |

**Indexes:** `userId_index`, `read_index`

---

## Frontend Integration

### Environment Variables

Add these to your `.env.local` file:

```env
# Portal Database
NEXT_PUBLIC_APPWRITE_PORTAL_DATABASE_ID=692b262d003cd0a87f08
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=userid
NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID=projects
NEXT_PUBLIC_APPWRITE_PROJECT_PHASES_COLLECTION_ID=project_phases
NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=invoices
NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID=messages
NEXT_PUBLIC_APPWRITE_MESSAGE_REPLIES_COLLECTION_ID=message_replies
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID=files
NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID=notifications
```

### Key Files

| File | Description |
|------|-------------|
| `lib/appwrite.ts` | Appwrite client setup and collection IDs |
| `lib/portal-services.ts` | CRUD operations for all collections |
| `contexts/AuthContext.tsx` | Authentication state management |
| `contexts/ProjectContext.tsx` | Project state management |

---

## Service Functions

### Projects

```typescript
import { projectsService } from '@/lib/portal-services'

// Create a project
const project = await projectsService.create(userId, {
  name: 'My Project',
  service: 'website',
  packageTier: 'professional',
  status: 'pending',
})

// List user's projects
const projects = await projectsService.listByUser(userId)

// Update a project
await projectsService.update(projectId, { status: 'in-progress' })

// Delete a project
await projectsService.delete(projectId)
```

### Invoices

```typescript
import { invoicesService } from '@/lib/portal-services'

// Create an invoice
const invoice = await invoicesService.create({
  projectId: 'proj_123',
  userId: 'user_456',
  amount: 1500.00,
  status: 'pending',
  dueDate: '2024-12-31T00:00:00.000Z',
  invoiceNumber: invoicesService.generateInvoiceNumber(),
})

// List user's invoices
const invoices = await invoicesService.listByUser(userId)
```

### Messages

```typescript
import { messagesService, messageRepliesService } from '@/lib/portal-services'

// Create a support ticket
const message = await messagesService.create({
  userId: 'user_123',
  subject: 'Help needed',
  content: 'I have a question...',
  type: 'support',
  status: 'open',
  priority: 'medium',
})

// Add a reply
await messageRepliesService.create({
  messageId: message.$id,
  userId: 'staff_456',
  content: 'Hi! I can help with that.',
  isStaff: true,
})
```

### Notifications

```typescript
import { notificationsService } from '@/lib/portal-services'

// Create a notification
await notificationsService.create({
  userId: 'user_123',
  title: 'Project Update',
  message: 'Your project has moved to the next phase!',
  type: 'project_update',
  read: false,
  link: '/portal/projects/proj_123',
})

// Get unread count
const unreadCount = await notificationsService.getUnreadCount(userId)

// Mark all as read
await notificationsService.markAllAsRead(userId)
```

---

## Permissions Model

### Document-Level Security

All collections use document-level security (`documentSecurity: true`) which means:

1. **Collection-level permissions** allow users to create/read documents in the collection
2. **Document-level permissions** control access to individual documents

### Permission Structure

When creating documents, permissions are set like this:

```typescript
// User can read, update, delete their own documents
[
  `read("user:${userId}")`,
  `update("user:${userId}")`,
  `delete("user:${userId}")`,
]
```

### Role-Based Access

| Role | Access Level |
|------|-------------|
| `client` | Own projects and data only |
| `manager` | All projects (read), own team's projects (write) |
| `admin` | Full access to all data |

---

## Service Types & Phases

Each service type has predefined phases:

| Service | Phases |
|---------|--------|
| Website | Discovery & Planning, Design & Wireframes, Development, Testing & QA, Launch & Deployment |
| Logo | Creative Brief, Initial Concepts, Refinement, Finalization, File Delivery |
| Branding | Brand Research, Brand Strategy, Visual Identity, Brand Guidelines, Asset Delivery |
| Marketing | Marketing Audit, Strategy Development, Campaign Execution, Optimization, Reporting & Analysis |
| Chatbot | Requirements Gathering, Conversation Design, Bot Development, AI Training, Deployment & Integration |
| AI Voice | Requirements Analysis, Voice & Persona Design, Development, Voice Training, Integration & Launch |
| SEO | SEO Audit, Keyword Research, On-Page Optimization, Off-Page Strategy, Monitoring & Reporting |
| Social Media | Social Audit, Content Strategy, Content Creation, Community Management, Analytics & Growth |

---

## Usage Examples

### Creating a New Project (Frontend)

```tsx
const { addProject } = useProjects()

await addProject({
  name: 'E-commerce Website',
  service: 'website',
  packageTier: 'professional',
  websiteType: 'e-commerce',
  status: 'pending',
  description: 'Online store for my business',
  pages: 10,
  revisions: 3,
  addons: ['seo-basic', 'analytics'],
})
```

### Displaying Projects

```tsx
const { projects, loading } = useProjects()

if (loading) return <Spinner />

return (
  <div>
    {projects.map(project => (
      <ProjectCard key={project.$id} project={project} />
    ))}
  </div>
)
```

---

## Troubleshooting

### Common Issues

1. **"Collection not found"** - Ensure environment variables are set correctly
2. **"Permission denied"** - Check document-level permissions are set on create
3. **"Attribute not found"** - Verify attribute status is "available" in Appwrite console

### Debugging

Enable Appwrite debug mode:

```typescript
import { Client } from 'appwrite'
const client = new Client()
// Check browser console for Appwrite errors
```

---

## Future Enhancements

- [ ] Real-time updates with Appwrite Realtime
- [ ] File storage integration for deliverables
- [ ] Email notifications via Appwrite Functions
- [ ] Payment integration (Stripe)
- [ ] Activity timeline for projects
- [ ] Team collaboration features
