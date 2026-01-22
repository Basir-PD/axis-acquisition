'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  useProjects,
  SERVICE_CONFIG,
  PACKAGE_CONFIG,
} from '@/contexts/ProjectContext'
import type { ProjectPhase, ServiceType } from '@/lib/portal-services'
import { storage, PROJECT_ATTACHMENTS_BUCKET_ID } from '@/lib/appwrite'
import ProtectedRoute from '@/components/portal/ProtectedRoute'
import PortalLayout from '@/components/portal/PortalLayout'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Globe,
  Smartphone,
  Megaphone,
  Bot,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Edit3,
  Loader2,
  Download,
  ExternalLink,
  Image,
  FileType,
  File,
  Calendar,
  DollarSign,
  Layers,
  Zap,
  Paperclip,
  StickyNote,
  ChevronRight,
  ShieldCheck,
  Lock,
  MessageSquareText,
  Save,
  X,
} from 'lucide-react'
import Link from 'next/link'

// Service icons
const SERVICE_ICONS: Record<ServiceType, React.ElementType> = {
  'web-development': Globe,
  'mobile-development': Smartphone,
  marketing: Megaphone,
  'ai-automation': Bot,
}

// Sub-type labels
const SUB_TYPE_LABELS: Record<string, string> = {
  'landing-page': 'Landing Page',
  'business-website': 'Business Website',
  'e-commerce': 'E-Commerce',
  'web-application': 'Web Application',
  'saas-platform': 'SaaS Platform',
  'ios-app': 'iOS App',
  'android-app': 'Android App',
  'cross-platform': 'Cross-Platform App',
  'paid-ads': 'Paid Advertising',
  'seo': 'SEO',
  'social-media': 'Social Media Marketing',
  'email-marketing': 'Email Marketing',
  'growth-strategy': 'Growth Strategy',
  'ai-chatbot': 'AI Chatbot',
  'ai-voice-agent': 'AI Voice Agent',
  'workflow-automation': 'Workflow Automation',
  'custom-ai-solution': 'Custom AI Solution',
}

// Budget labels per service
const BUDGET_LABELS: Record<string, Record<string, string>> = {
  'web-development': {
    'under-1k': 'Under $1,000',
    '1k-5k': '$1,000 - $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-plus': '$50,000+',
    'not-sure': 'Not sure yet',
  },
  'mobile-development': {
    'under-1k': 'Under $5,000',
    '1k-5k': '$5,000 - $15,000',
    '5k-10k': '$15,000 - $30,000',
    '10k-25k': '$30,000 - $60,000',
    '25k-50k': '$60,000 - $100,000',
    '50k-plus': '$100,000+',
    'not-sure': 'Not sure yet',
  },
  marketing: {
    'under-1k': 'Under $1,000/mo',
    '1k-5k': '$1,000 - $3,000/mo',
    '5k-10k': '$3,000 - $7,000/mo',
    '10k-25k': '$7,000 - $15,000/mo',
    '25k-50k': '$15,000 - $30,000/mo',
    '50k-plus': '$30,000+/mo',
    'not-sure': 'Not sure yet',
  },
  'ai-automation': {
    'under-1k': 'Under $2,000',
    '1k-5k': '$2,000 - $8,000',
    '5k-10k': '$8,000 - $20,000',
    '10k-25k': '$20,000 - $50,000',
    '25k-50k': '$50,000 - $100,000',
    '50k-plus': '$100,000+',
    'not-sure': 'Not sure yet',
  },
}

interface FileInfo {
  $id: string
  name: string
  mimeType: string
  sizeOriginal: number
}

const STATUS_CONFIG = {
  pending: {
    label: 'Pending Approval',
    color: 'bg-amber-500',
    textColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
  },
  approved: {
    label: 'Approved',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
  },
  review: {
    label: 'In Review',
    color: 'bg-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
  },
  'on-hold': {
    label: 'On Hold',
    color: 'bg-neutral-400',
    textColor: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
  },
}

// Notion-style property row
function PropertyRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center py-2 group">
      <div className="flex items-center gap-2 w-32 flex-shrink-0">
        <Icon className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{label}</span>
      </div>
      <div className="flex-1 text-sm text-neutral-900 dark:text-white">
        {children}
      </div>
    </div>
  )
}

// Phase status options
type PhaseStatus = 'pending' | 'in-progress' | 'completed'

// Get next status in cycle
const getNextStatus = (current: string): PhaseStatus => {
  if (current === 'pending') return 'in-progress'
  if (current === 'in-progress') return 'completed'
  return 'pending'
}

// Phase item component
function PhaseItem({
  phase,
  index: _index,
  canEdit,
  onStatusChange,
}: {
  phase: ProjectPhase
  index: number
  canEdit?: boolean
  onStatusChange?: (_phaseId: string, _status: PhaseStatus) => void
}) {
  const handleClick = () => {
    if (canEdit && onStatusChange) {
      const nextStatus = getNextStatus(phase.status)
      onStatusChange(phase.$id, nextStatus)
    }
  }

  const StatusIcon = () => {
    if (phase.status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
    }
    if (phase.status === 'in-progress') {
      return (
        <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      )
    }
    return <Circle className="w-5 h-5 text-neutral-300 dark:text-neutral-600 flex-shrink-0" />
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all ${
        canEdit
          ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 group'
          : ''
      }`}
    >
      <StatusIcon />
      <span
        className={`text-sm flex-1 ${
          phase.status === 'completed'
            ? 'text-neutral-500 dark:text-neutral-400 line-through'
            : phase.status === 'in-progress'
            ? 'text-neutral-900 dark:text-white font-medium'
            : 'text-neutral-600 dark:text-neutral-400'
        }`}
      >
        {phase.name}
      </span>
      {phase.status === 'in-progress' && (
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          {phase.progress}%
        </span>
      )}
      {canEdit && (
        <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

// Delete confirmation modal
function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  projectName: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-sm w-full shadow-xl"
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Delete project?
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          This will permanently delete &quot;{projectName}&quot; and all its data.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function ProjectDetailContent() {
  const router = useRouter()
  const params = useParams()
  const { user, profile } = useAuth()
  const { getProject, deleteProject, updateProject, updatePhase } = useProjects()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [attachmentFiles, setAttachmentFiles] = useState<FileInfo[]>([])
  const [loadingFiles, setLoadingFiles] = useState(false)

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    timeline: '',
    notes: '',
  })

  // Admin edit state (for editing timeline, budget, admin notes)
  const [adminNotes, setAdminNotes] = useState('')
  const [isEditingAdminNotes, setIsEditingAdminNotes] = useState(false)
  const [adminEditForm, setAdminEditForm] = useState({
    timeline: '',
    budgetRange: '',
  })
  const [isEditingAdminFields, setIsEditingAdminFields] = useState(false)

  const projectId = params.id as string
  const project = getProject(projectId)

  // Initialize edit form when project loads or edit mode starts
  useEffect(() => {
    if (project && isEditing) {
      setEditForm({
        name: project.name || '',
        description: project.description || '',
        timeline: project.timeline || '',
        notes: project.notes || '',
      })
    }
  }, [project, isEditing])

  // Initialize admin notes when project loads
  useEffect(() => {
    if (project) {
      setAdminNotes(project.adminNotes || '')
      setAdminEditForm({
        timeline: project.timeline || '',
        budgetRange: project.budgetRange || '',
      })
    }
  }, [project])

  // Fetch attachments
  useEffect(() => {
    const fetchAttachments = async () => {
      if (!project?.attachments || project.attachments.length === 0) return
      setLoadingFiles(true)
      try {
        const files = await Promise.all(
          project.attachments.map(async (fileId) => {
            try {
              const file = await storage.getFile(PROJECT_ATTACHMENTS_BUCKET_ID, fileId)
              return file as FileInfo
            } catch {
              return null
            }
          })
        )
        setAttachmentFiles(files.filter((f): f is FileInfo => f !== null))
      } catch (error) {
        console.error('Failed to fetch attachments:', error)
      } finally {
        setLoadingFiles(false)
      }
    }
    fetchAttachments()
  }, [project?.attachments])

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    )
  }

  const isAdminOrManager = profile?.role === 'admin' || profile?.role === 'manager'
  if (project.userId !== user?.$id && !isAdminOrManager) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
          Project not found or no access.
        </p>
        <Link href="/portal/projects" className="text-sm text-neutral-900 dark:text-white hover:underline">
          ← Back to projects
        </Link>
      </div>
    )
  }

  // Helpers
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image
    if (mimeType.includes('pdf')) return FileType
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileDownloadUrl = (fileId: string) =>
    storage.getFileDownload(PROJECT_ATTACHMENTS_BUCKET_ID, fileId).toString()

  const getFileViewUrl = (fileId: string) =>
    storage.getFileView(PROJECT_ATTACHMENTS_BUCKET_ID, fileId).toString()

  const getBudgetLabel = (service: ServiceType, budgetRange: string) =>
    BUDGET_LABELS[service]?.[budgetRange] || budgetRange

  const Icon = SERVICE_ICONS[project.service] || Globe
  const serviceConfig = SERVICE_CONFIG[project.service]
  const packageConfig = PACKAGE_CONFIG[project.packageTier]
  const status = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending

  const completedPhases = project.phases.filter((p) => p.status === 'completed').length
  const progress = project.phases.length > 0
    ? Math.round((completedPhases / project.phases.length) * 100)
    : 0

  const handleDelete = async () => {
    await deleteProject(project.$id)
    router.push('/portal/projects')
  }

  const handleStartEdit = () => {
    setEditForm({
      name: project.name || '',
      description: project.description || '',
      timeline: project.timeline || '',
      notes: project.notes || '',
    })
    setIsEditing(true)
    setShowMenu(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      name: '',
      description: '',
      timeline: '',
      notes: '',
    })
  }

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return

    setIsSaving(true)
    try {
      await updateProject(project.$id, {
        name: editForm.name.trim(),
        description: editForm.description.trim() || undefined,
        timeline: editForm.timeline || undefined,
        notes: editForm.notes.trim() || undefined,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update project:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '2-weeks', label: '2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: '2-months', label: '2 months' },
    { value: 'flexible', label: 'Flexible' },
  ]

  const budgetOptions = [
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-plus', label: '$50,000+' },
    { value: 'not-sure', label: 'Not sure yet' },
  ]

  // Check if project can be edited (not approved yet)
  const canEdit = project.status === 'pending'

  // Check if admin can approve
  const canApprove = isAdminOrManager && project.status === 'pending'

  const handleApprove = async () => {
    setIsSaving(true)
    try {
      await updateProject(project.$id, { status: 'approved' })
      setShowMenu(false)
    } catch (error) {
      console.error('Failed to approve project:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle phase status change (admin only)
  const handlePhaseStatusChange = async (phaseId: string, newStatus: PhaseStatus) => {
    try {
      await updatePhase(phaseId, {
        status: newStatus,
        progress: newStatus === 'completed' ? 100 : newStatus === 'in-progress' ? 50 : 0
      })
    } catch (error) {
      console.error('Failed to update phase:', error)
    }
  }

  // Admin can edit phases
  const canEditPhases = isAdminOrManager

  // Handle admin notes save
  const handleSaveAdminNotes = async () => {
    setIsSaving(true)
    try {
      await updateProject(project.$id, { adminNotes: adminNotes.trim() || undefined })
      setIsEditingAdminNotes(false)
    } catch (error) {
      console.error('Failed to save admin notes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle admin field updates (timeline, budget)
  const handleSaveAdminFields = async () => {
    setIsSaving(true)
    try {
      await updateProject(project.$id, {
        timeline: adminEditForm.timeline || undefined,
        budgetRange: adminEditForm.budgetRange as typeof project.budgetRange || undefined,
      })
      setIsEditingAdminFields(false)
    } catch (error) {
      console.error('Failed to update admin fields:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Projects
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-2xl font-semibold text-neutral-900 dark:text-white bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-neutral-900 dark:focus:border-white outline-none w-full pb-1"
                  placeholder="Project name"
                  autoFocus
                />
              ) : (
                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  {project.name}
                </h1>
              )}
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {serviceConfig?.name} · {packageConfig?.name}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving || !editForm.name.trim()}
                  className="px-3 py-1.5 text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  Save
                </button>
              </>
            ) : (
              <>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                  {status.label}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-neutral-500" />
                  </button>

                  <AnimatePresence>
                    {showMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute right-0 mt-1 w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50"
                        >
                          {/* Approve button - only for admin/manager when pending */}
                          {canApprove && (
                            <button
                              onClick={handleApprove}
                              disabled={isSaving}
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 disabled:opacity-50"
                            >
                              <ShieldCheck className="w-4 h-4" />
                              {isSaving ? 'Approving...' : 'Approve Project'}
                            </button>
                          )}

                          {/* Edit button - only when project is pending */}
                          {canEdit ? (
                            <button
                              onClick={handleStartEdit}
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-neutral-400 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              Edit (Locked)
                            </div>
                          )}

                          {/* Delete - only when pending */}
                          {canEdit ? (
                            <button
                              onClick={() => {
                                setShowMenu(false)
                                setShowDeleteModal(true)
                              }}
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-neutral-400 cursor-not-allowed">
                              <Trash2 className="w-4 h-4" />
                              Delete (Locked)
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {isEditing ? (
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="mt-4 w-full text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 resize-none focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
            placeholder="Add a description..."
            rows={3}
          />
        ) : project.description ? (
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            {project.description}
          </p>
        ) : null}
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Progress</span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{progress}%</span>
        </div>
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-neutral-900 dark:bg-white rounded-full"
          />
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
          {completedPhases} of {project.phases.length} phases completed
        </p>
      </div>

      {/* Main Content - Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Properties */}
        <div className="space-y-6">
          {/* Properties Section */}
          <div>
            <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Details
            </h2>
            <div className="space-y-1 divide-y divide-neutral-100 dark:divide-neutral-800">
              <PropertyRow icon={Calendar} label="Created">
                {new Date(project.$createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </PropertyRow>

              {project.subType && (
                <PropertyRow icon={Layers} label="Type">
                  {SUB_TYPE_LABELS[project.subType] || project.subType}
                </PropertyRow>
              )}

              <PropertyRow icon={Clock} label="Timeline">
                {isEditingAdminFields && isAdminOrManager ? (
                  <select
                    value={adminEditForm.timeline}
                    onChange={(e) => setAdminEditForm({ ...adminEditForm, timeline: e.target.value })}
                    className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : isEditing ? (
                  <select
                    value={editForm.timeline}
                    onChange={(e) => setEditForm({ ...editForm, timeline: e.target.value })}
                    className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="capitalize">{project.timeline?.replace('-', ' ') || 'Not set'}</span>
                )}
              </PropertyRow>

              <PropertyRow icon={DollarSign} label="Budget">
                {isEditingAdminFields && isAdminOrManager ? (
                  <select
                    value={adminEditForm.budgetRange}
                    onChange={(e) => setAdminEditForm({ ...adminEditForm, budgetRange: e.target.value })}
                    className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
                  >
                    <option value="">Select budget</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{project.budgetRange ? getBudgetLabel(project.service, project.budgetRange) : 'Not set'}</span>
                )}
              </PropertyRow>

              {project.revisions && (
                <PropertyRow icon={Zap} label="Revisions">
                  {project.revisions}
                </PropertyRow>
              )}
            </div>

            {/* Admin Edit Controls for Timeline/Budget */}
            {isAdminOrManager && (
              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {isEditingAdminFields ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsEditingAdminFields(false)
                        setAdminEditForm({
                          timeline: project.timeline || '',
                          budgetRange: project.budgetRange || '',
                        })
                      }}
                      className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAdminFields}
                      disabled={isSaving}
                      className="px-3 py-1.5 text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingAdminFields(true)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit timeline & budget
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Add-ons */}
          {project.addons && project.addons.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                Add-ons
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {project.addons.map((addon) => (
                  <span
                    key={addon}
                    className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    {addon.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Attachments & Notes */}
        <div className="space-y-6">
          {/* Attachments */}
          {project.attachments && project.attachments.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5" />
                Attachments
              </h2>
              {loadingFiles ? (
                <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
              ) : (
                <div className="space-y-1">
                  {attachmentFiles.map((file) => {
                    const FileIcon = getFileIcon(file.mimeType)
                    const isImage = file.mimeType.startsWith('image/')

                    return (
                      <div
                        key={file.$id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 group transition-colors"
                      >
                        <FileIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate flex-1">
                          {file.name}
                        </span>
                        <span className="text-xs text-neutral-400 flex-shrink-0">
                          {formatFileSize(file.sizeOriginal)}
                        </span>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isImage && (
                            <a
                              href={getFileViewUrl(file.$id)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                            </a>
                          )}
                          <a
                            href={getFileDownloadUrl(file.$id)}
                            download
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                          >
                            <Download className="w-3.5 h-3.5 text-neutral-500" />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Client Notes */}
          {(project.notes || isEditing) && (
            <div>
              <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <StickyNote className="w-3.5 h-3.5" />
                Client Notes
              </h2>
              {isEditing ? (
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 resize-none focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
                  placeholder="Add notes..."
                  rows={4}
                />
              ) : (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap leading-relaxed">
                  {project.notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Admin Notes Section - Visible to everyone, editable by admin only */}
      {(project.adminNotes || isAdminOrManager) && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5" />
              Notes from Team
            </h2>
            {isAdminOrManager && !isEditingAdminNotes && (
              <button
                onClick={() => setIsEditingAdminNotes(true)}
                className="text-xs text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                {project.adminNotes ? 'Edit' : 'Add note'}
              </button>
            )}
          </div>
          {isEditingAdminNotes && isAdminOrManager ? (
            <div className="space-y-3">
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full text-sm text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-blue-200 dark:border-blue-700 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-400 dark:focus:border-blue-500"
                placeholder="Add notes for the client about this project..."
                rows={4}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEditingAdminNotes(false)
                    setAdminNotes(project.adminNotes || '')
                  }}
                  className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdminNotes}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-wrap leading-relaxed">
              {project.adminNotes || 'No notes from the team yet.'}
            </p>
          )}
        </div>
      )}

      {/* Project Phases - Full Width at Bottom */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Project Phases
          </h2>
          {canEditPhases && (
            <span className="text-xs text-neutral-400">
              Click to update status
            </span>
          )}
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {project.phases.map((phase, index) => (
              <PhaseItem
                key={phase.$id}
                phase={phase}
                index={index}
                canEdit={canEditPhases}
                onStatusChange={handlePhaseStatusChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        projectName={project.name}
      />
    </div>
  )
}

export default function ProjectDetailPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <ProjectDetailContent />
      </PortalLayout>
    </ProtectedRoute>
  )
}
