'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import {
  useProjects,
  ServiceType,
  PackageTier,
  BudgetRange,
  SERVICE_CONFIG,
  PACKAGE_CONFIG,
} from '@/contexts/ProjectContext'
import { storage, ID, PROJECT_ATTACHMENTS_BUCKET_ID, UserProfile } from '@/lib/appwrite'
import { usersService } from '@/lib/portal-services'
import ProtectedRoute from '@/components/portal/ProtectedRoute'
import MultiStepForm from '@/components/portal/projects/MultiStepForm'
import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Megaphone,
  Bot,
  Check,
  Zap,
  Crown,
  Building2,
  FileText,
  ShoppingCart,
  Code,
  Layers,
  Upload,
  X,
  File,
  Image,
  FileType,
  CheckCircle2,
  ArrowRight,
  Loader2,
  MessageSquare,
  Mic,
  Workflow,
  Mail,
  Search,
  Share2,
  TrendingUp,
  Target,
  Apple,
  Play,
  User,
  Users,
} from 'lucide-react'

// Base steps for all users
const BASE_STEPS = [
  {
    id: 1,
    title: 'What would you like us to help you with?',
    description: 'Choose a service to get started',
  },
  {
    id: 2,
    title: 'Which package fits your needs?',
    description: 'Select the tier that matches your requirements',
  },
  {
    id: 3,
    title: "Let's customize your project",
    description: 'Add specific details and options',
  },
  {
    id: 4,
    title: 'Tell us about your project',
    description: 'Give your project a name and description',
  },
  {
    id: 5,
    title: 'Budget & Reference Materials',
    description: 'Share your budget and any helpful files',
  },
  {
    id: 6,
    title: 'Review your project',
    description: "Everything looks good? Let's create it!",
  },
]

// Admin-only step for selecting client
const ADMIN_CLIENT_STEP = {
  id: 0,
  title: 'Select a client',
  description: 'Choose the client this project is for',
}

// Service-specific budget ranges with appropriate descriptions
const SERVICE_BUDGET_OPTIONS: Record<
  ServiceType,
  { id: BudgetRange; label: string; description: string }[]
> = {
  'web-development': [
    { id: 'under-1k', label: 'Under $1,000', description: 'Simple landing pages' },
    { id: '1k-5k', label: '$1,000 - $5,000', description: 'Starter websites & portfolios' },
    { id: '5k-10k', label: '$5,000 - $10,000', description: 'Professional business websites' },
    { id: '10k-25k', label: '$10,000 - $25,000', description: 'E-commerce & web applications' },
    { id: '25k-50k', label: '$25,000 - $50,000', description: 'Complex platforms & SaaS' },
    { id: '50k-plus', label: '$50,000+', description: 'Enterprise solutions' },
    { id: 'not-sure', label: "I'm not sure yet", description: "We'll help you figure it out" },
  ],
  'mobile-development': [
    { id: 'under-1k', label: 'Under $5,000', description: 'Simple MVP or prototype' },
    { id: '1k-5k', label: '$5,000 - $15,000', description: 'Basic single-platform app' },
    { id: '5k-10k', label: '$15,000 - $30,000', description: 'Feature-rich app (iOS or Android)' },
    { id: '10k-25k', label: '$30,000 - $60,000', description: 'Cross-platform with integrations' },
    { id: '25k-50k', label: '$60,000 - $100,000', description: 'Complex app with backend' },
    { id: '50k-plus', label: '$100,000+', description: 'Enterprise mobile solutions' },
    { id: 'not-sure', label: "I'm not sure yet", description: "We'll help you figure it out" },
  ],
  marketing: [
    { id: 'under-1k', label: 'Under $1,000/mo', description: 'Single channel testing' },
    { id: '1k-5k', label: '$1,000 - $3,000/mo', description: 'Small business campaigns' },
    { id: '5k-10k', label: '$3,000 - $7,000/mo', description: 'Multi-channel marketing' },
    { id: '10k-25k', label: '$7,000 - $15,000/mo', description: 'Growth-focused campaigns' },
    { id: '25k-50k', label: '$15,000 - $30,000/mo', description: 'Aggressive scaling' },
    { id: '50k-plus', label: '$30,000+/mo', description: 'Enterprise marketing' },
    { id: 'not-sure', label: "I'm not sure yet", description: "We'll help you figure it out" },
  ],
  'ai-automation': [
    { id: 'under-1k', label: 'Under $2,000', description: 'Simple chatbot setup' },
    { id: '1k-5k', label: '$2,000 - $8,000', description: 'Custom AI chatbot with training' },
    { id: '5k-10k', label: '$8,000 - $20,000', description: 'AI voice agent or workflow automation' },
    { id: '10k-25k', label: '$20,000 - $50,000', description: 'Multi-channel AI with integrations' },
    { id: '25k-50k', label: '$50,000 - $100,000', description: 'Custom AI models & enterprise' },
    { id: '50k-plus', label: '$100,000+', description: 'Large-scale AI transformation' },
    { id: 'not-sure', label: "I'm not sure yet", description: "We'll help you figure it out" },
  ],
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploading?: boolean
  error?: string
}

const SERVICE_ICONS: Record<ServiceType, React.ElementType> = {
  'web-development': Globe,
  'mobile-development': Smartphone,
  marketing: Megaphone,
  'ai-automation': Bot,
}

const SERVICE_KEYS = ['A', 'B', 'C', 'D'] as const

// Sub-options for Web Development
const WEB_DEV_OPTIONS: {
  id: string
  name: string
  description: string
  icon: React.ElementType
}[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Single page to convert visitors',
    icon: FileText,
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Multi-page professional site',
    icon: Building2,
  },
  {
    id: 'e-commerce',
    name: 'E-Commerce',
    description: 'Online store with payments',
    icon: ShoppingCart,
  },
  {
    id: 'web-application',
    name: 'Web Application',
    description: 'Custom web-based software',
    icon: Code,
  },
  {
    id: 'saas-platform',
    name: 'SaaS Platform',
    description: 'Software as a service product',
    icon: Layers,
  },
]

// Sub-options for Mobile Development
const MOBILE_DEV_OPTIONS: {
  id: string
  name: string
  description: string
  icon: React.ElementType
}[] = [
  {
    id: 'ios-app',
    name: 'iOS App',
    description: 'Native iPhone & iPad app',
    icon: Apple,
  },
  {
    id: 'android-app',
    name: 'Android App',
    description: 'Native Android app',
    icon: Play,
  },
  {
    id: 'cross-platform',
    name: 'Cross-Platform',
    description: 'iOS & Android from one codebase',
    icon: Smartphone,
  },
]

// Sub-options for Marketing
const MARKETING_OPTIONS: {
  id: string
  name: string
  description: string
  icon: React.ElementType
}[] = [
  {
    id: 'paid-ads',
    name: 'Paid Advertising',
    description: 'Google, Meta & social ads',
    icon: Target,
  },
  {
    id: 'seo',
    name: 'SEO',
    description: 'Search engine optimization',
    icon: Search,
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    description: 'Grow your social presence',
    icon: Share2,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Newsletters & campaigns',
    icon: Mail,
  },
  {
    id: 'growth-strategy',
    name: 'Growth Strategy',
    description: 'Full-funnel marketing plan',
    icon: TrendingUp,
  },
]

// Sub-options for AI Automation
const AI_AUTOMATION_OPTIONS: {
  id: string
  name: string
  description: string
  icon: React.ElementType
}[] = [
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Intelligent customer support bot',
    icon: MessageSquare,
  },
  {
    id: 'ai-voice-agent',
    name: 'AI Voice Agent',
    description: 'Phone & voice assistant',
    icon: Mic,
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Automate business processes',
    icon: Workflow,
  },
  {
    id: 'custom-ai-solution',
    name: 'Custom AI Solution',
    description: 'Tailored AI for your needs',
    icon: Bot,
  },
]

// Map service types to their sub-options
const SERVICE_SUB_OPTIONS: Record<ServiceType, typeof WEB_DEV_OPTIONS> = {
  'web-development': WEB_DEV_OPTIONS,
  'mobile-development': MOBILE_DEV_OPTIONS,
  marketing: MARKETING_OPTIONS,
  'ai-automation': AI_AUTOMATION_OPTIONS,
}

const ADDON_OPTIONS: Record<
  ServiceType,
  { id: string; name: string; description: string }[]
> = {
  'web-development': [
    {
      id: 'cms',
      name: 'Content Management System',
      description: 'Easy content updates',
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      description: 'Detailed visitor insights',
    },
    {
      id: 'multilingual',
      name: 'Multi-language Support',
      description: 'Reach global audience',
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Built-in search optimization',
    },
    {
      id: 'chat-integration',
      name: 'Chat Integration',
      description: 'Live chat or chatbot',
    },
  ],
  'mobile-development': [
    {
      id: 'push-notifications',
      name: 'Push Notifications',
      description: 'Engage users with alerts',
    },
    {
      id: 'offline-mode',
      name: 'Offline Mode',
      description: 'Works without internet',
    },
    {
      id: 'analytics',
      name: 'App Analytics',
      description: 'Track user behavior',
    },
    {
      id: 'in-app-purchases',
      name: 'In-App Purchases',
      description: 'Monetize your app',
    },
    {
      id: 'social-login',
      name: 'Social Login',
      description: 'Login with Google, Apple, etc.',
    },
  ],
  marketing: [
    {
      id: 'landing-pages',
      name: 'Landing Pages',
      description: 'Custom campaign pages',
    },
    {
      id: 'analytics-setup',
      name: 'Analytics Setup',
      description: 'Tracking & attribution',
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      description: 'Ad creatives & copy',
    },
    {
      id: 'monthly-reporting',
      name: 'Monthly Reporting',
      description: 'Performance reports',
    },
  ],
  'ai-automation': [
    {
      id: 'multilingual',
      name: 'Multi-language Support',
      description: 'Support multiple languages',
    },
    {
      id: 'crm-integration',
      name: 'CRM Integration',
      description: 'Connect to your CRM',
    },
    {
      id: 'analytics',
      name: 'Conversation Analytics',
      description: 'Insights & reporting',
    },
    {
      id: 'custom-training',
      name: 'Custom AI Training',
      description: 'Train on your data',
    },
  ],
}

// TypeForm-style option card component
function OptionCard({
  shortcut,
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}: {
  shortcut: string
  icon: React.ElementType
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`group w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        isSelected
          ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white'
          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600'
      }`}
    >
      {/* Shortcut Key */}
      <span
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
          isSelected
            ? 'border-white/30 dark:border-neutral-900/30 text-white dark:text-neutral-900'
            : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-neutral-400'
        }`}
      >
        {shortcut}
      </span>

      {/* Icon */}
      <Icon
        className={`flex-shrink-0 w-6 h-6 transition-colors ${
          isSelected
            ? 'text-white dark:text-neutral-900'
            : 'text-neutral-400 dark:text-neutral-500'
        }`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium transition-colors ${
            isSelected
              ? 'text-white dark:text-neutral-900'
              : 'text-neutral-900 dark:text-white'
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm truncate transition-colors ${
            isSelected
              ? 'text-white/70 dark:text-neutral-900/70'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Check mark */}
      {isSelected && (
        <Check className="flex-shrink-0 w-5 h-5 text-white dark:text-neutral-900" />
      )}
    </motion.button>
  )
}

// TypeForm-style checkbox card
function CheckboxCard({
  shortcut,
  title,
  description,
  isSelected,
  onClick,
}: {
  shortcut: string
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        isSelected
          ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-900'
          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600'
      }`}
    >
      {/* Checkbox */}
      <span
        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all ${
          isSelected
            ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white'
            : 'border-neutral-300 dark:border-neutral-700'
        }`}
      >
        {isSelected && (
          <Check className="w-4 h-4 text-white dark:text-neutral-900" />
        )}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>

      {/* Shortcut hint */}
      <span className="hidden md:flex flex-shrink-0 text-xs text-neutral-400 font-mono">
        {shortcut}
      </span>
    </motion.button>
  )
}

// TypeForm-style text input (kept for potential future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function _TypeFormInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  autoFocus = false,
}: {
  value: string
  onChange: (_value: string) => void
  placeholder: string
  multiline?: boolean
  autoFocus?: boolean
}) {
  const baseClasses =
    'w-full bg-transparent border-0 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:ring-0 focus:outline-none text-2xl md:text-3xl text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-600 py-4 transition-colors'

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={3}
        className={`${baseClasses} resize-none`}
      />
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={baseClasses}
    />
  )
}

// TypeForm-style select (kept for potential future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function _TypeFormSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (_value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-0 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white focus:ring-0 focus:outline-none text-2xl md:text-3xl text-neutral-900 dark:text-white py-4 cursor-pointer appearance-none transition-colors"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0 center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
      }}
    >
      <option value="" className="text-base">
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-base">
          {opt.label}
        </option>
      ))}
    </select>
  )
}

// Number stepper component (kept for potential future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function _NumberStepper({
  value,
  onChange,
  min = 1,
  label,
}: {
  value: number
  onChange: (_value: number) => void
  min?: number
  label: string
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 dark:border-neutral-800">
      <span className="text-lg text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors text-xl font-medium"
        >
          -
        </button>
        <span className="w-12 text-center text-2xl font-semibold text-neutral-900 dark:text-white">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors text-xl font-medium"
        >
          +
        </button>
      </div>
    </div>
  )
}

function NewProjectContent() {
  const router = useRouter()
  const { user, isAdmin, isManager } = useAuth()
  const { addProject } = useProjects()

  const isAdminOrManager = isAdmin || isManager

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdProjectName, setCreatedProjectName] = useState('')

  // Admin-only state for client selection
  const [clients, setClients] = useState<UserProfile[]>([])
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null)
  const [loadingClients, setLoadingClients] = useState(false)

  // Form state
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  )
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(
    null,
  )
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null)
  // eslint-disable-next-line no-unused-vars
const [revisions, _setRevisions] = useState(3)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [timeline, setTimeline] = useState('')
  const [notes, setNotes] = useState('')
  const [budgetRange, setBudgetRange] = useState<BudgetRange | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Determine steps based on user role
  const STEPS = isAdminOrManager ? [ADMIN_CLIENT_STEP, ...BASE_STEPS] : BASE_STEPS

  const serviceKeys = Object.keys(SERVICE_CONFIG) as ServiceType[]
  const packageKeys = Object.keys(PACKAGE_CONFIG) as PackageTier[]

  // Fetch clients for admin users
  useEffect(() => {
    if (isAdminOrManager) {
      setLoadingClients(true)
      usersService.listClients()
        .then(setClients)
        .catch(console.error)
        .finally(() => setLoadingClients(false))
    }
  }, [isAdminOrManager])

  // Keyboard shortcuts for selection
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      if (currentStep === 0) {
        // Service selection
        const index = SERVICE_KEYS.indexOf(key as (typeof SERVICE_KEYS)[number])
        if (index !== -1 && index < serviceKeys.length) {
          setSelectedService(serviceKeys[index])
        }
      } else if (currentStep === 1) {
        // Package selection
        const packageShortcuts = ['1', '2', '3']
        const index = packageShortcuts.indexOf(e.key)
        if (index !== -1 && index < packageKeys.length) {
          setSelectedPackage(packageKeys[index])
        }
      }
    },
    [currentStep, serviceKeys, packageKeys],
  )

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [handleKeyPress])

  const canProceed = () => {
    // For admin/manager, step indices are offset by 1 due to client selection step
    const stepOffset = isAdminOrManager ? 1 : 0
    const adjustedStep = currentStep - stepOffset

    // Client selection step (admin only, step 0)
    if (isAdminOrManager && currentStep === 0) {
      return selectedClient !== null
    }

    switch (adjustedStep) {
      case 0: // Service selection
        return selectedService !== null
      case 1: // Package selection
        return selectedPackage !== null
      case 2: // Customization
        // Must select a sub-option for the chosen service
        return selectedSubOption !== null
      case 3: // Project details
        return projectName.trim().length > 0
      case 4: // Budget step - budget is optional but step is always passable
        return true
      case 5: // Review
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!user || !selectedService || !selectedPackage) return
    // For admin creating project for client, selectedClient must be set
    if (isAdminOrManager && !selectedClient) return

    setIsSubmitting(true)

    try {
      // Pass the client's userId if admin is creating for a client
      const targetUserId = isAdminOrManager && selectedClient ? selectedClient.userId : undefined

      await addProject({
        name: projectName,
        service: selectedService,
        packageTier: selectedPackage,
        subType: selectedSubOption || undefined,
        status: 'pending',
        description: projectDescription || undefined,
        timeline: timeline || undefined,
        revisions: revisions || undefined,
        addons: selectedAddons.length > 0 ? selectedAddons : undefined,
        notes: notes || undefined,
        budgetRange: budgetRange || undefined,
        attachments: uploadedFiles.length > 0
          ? uploadedFiles.filter(f => !f.error && !f.uploading).map(f => f.id)
          : undefined,
      }, targetUserId)

      // Show success state
      setCreatedProjectName(projectName)
      setIsSuccess(true)
      toast.success('Project created successfully!', {
        description: 'Your project request has been submitted.',
      })

      // Redirect after a short delay to show success
      setTimeout(() => {
        router.push('/portal/projects')
      }, 2500)
    } catch (error) {
      console.error('Failed to create project:', error)
      toast.error('Failed to create project', {
        description: 'Something went wrong. Please try again.',
      })
      setIsSubmitting(false)
    }
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    )
  }

  // File upload handlers
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !user) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed',
    ]

    const maxSize = 30 * 1024 * 1024 // 30MB

    for (const file of Array.from(files)) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setUploadedFiles((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            error: 'File type not supported',
          },
        ])
        continue
      }

      // Validate file size
      if (file.size > maxSize) {
        setUploadedFiles((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            error: 'File too large (max 30MB)',
          },
        ])
        continue
      }

      const tempId = `temp-${Date.now()}-${file.name}`

      // Add file with uploading state
      setUploadedFiles((prev) => [
        ...prev,
        {
          id: tempId,
          name: file.name,
          size: file.size,
          type: file.type,
          uploading: true,
        },
      ])

      try {
        const response = await storage.createFile(
          PROJECT_ATTACHMENTS_BUCKET_ID,
          ID.unique(),
          file,
          [`read("user:${user.$id}")`, `delete("user:${user.$id}")`]
        )

        // Update with real file ID
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === tempId
              ? { ...f, id: response.$id, uploading: false }
              : f
          )
        )
      } catch (error) {
        console.error('Failed to upload file:', error)
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === tempId
              ? { ...f, uploading: false, error: 'Upload failed' }
              : f
          )
        )
      }
    }
  }

  const handleRemoveFile = async (fileId: string) => {
    const file = uploadedFiles.find((f) => f.id === fileId)
    if (!file) return

    // If it's a real uploaded file (not temp/error), delete from storage
    if (!file.error && !fileId.startsWith('temp-') && !fileId.startsWith('error-')) {
      try {
        await storage.deleteFile(PROJECT_ATTACHMENTS_BUCKET_ID, fileId)
      } catch (error) {
        console.error('Failed to delete file:', error)
      }
    }

    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image
    if (type.includes('pdf')) return FileType
    return File
  }

  // Step 0 (Admin only): Client Selection
  const renderClientSelectionStep = () => {
    if (loadingClients) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </div>
      )
    }

    if (clients.length === 0) {
      return (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">
            No clients found. Clients need to sign up first.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {clients.map((client, index) => {
          const isSelected = selectedClient?.userId === client.userId
          const shortcuts = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

          return (
            <motion.button
              key={client.userId}
              onClick={() => setSelectedClient(client)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`group w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600'
              }`}
            >
              {/* Shortcut Key */}
              <span
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'border-white/30 dark:border-neutral-900/30 text-white dark:text-neutral-900'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-neutral-400'
                }`}
              >
                {shortcuts[index] || String(index + 1)}
              </span>

              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-white/20 dark:bg-neutral-900/20'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                <User
                  className={`w-5 h-5 transition-colors ${
                    isSelected
                      ? 'text-white dark:text-neutral-900'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium transition-colors ${
                    isSelected
                      ? 'text-white dark:text-neutral-900'
                      : 'text-neutral-900 dark:text-white'
                  }`}
                >
                  {client.name}
                </h3>
                <p
                  className={`text-sm truncate transition-colors ${
                    isSelected
                      ? 'text-white/70 dark:text-neutral-900/70'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {client.email}
                  {client.company && ` · ${client.company}`}
                </p>
              </div>

              {/* Check mark */}
              {isSelected && (
                <Check className="flex-shrink-0 w-5 h-5 text-white dark:text-neutral-900" />
              )}
            </motion.button>
          )
        })}
      </div>
    )
  }

  // Step 1: Service Selection
  const handleServiceSelect = (serviceKey: ServiceType) => {
    setSelectedService(serviceKey)
    // Reset sub-option and addons when service changes
    setSelectedSubOption(null)
    setSelectedAddons([])
  }

  const renderServiceStep = () => (
    <div className="space-y-3">
      {serviceKeys.map((serviceKey, index) => {
        const service = SERVICE_CONFIG[serviceKey]
        const Icon = SERVICE_ICONS[serviceKey]
        const isSelected = selectedService === serviceKey
        const shortcut = SERVICE_KEYS[index]

        return (
          <OptionCard
            key={serviceKey}
            shortcut={shortcut}
            icon={Icon}
            title={service.name}
            description={service.description}
            isSelected={isSelected}
            onClick={() => handleServiceSelect(serviceKey)}
          />
        )
      })}
    </div>
  )

  // Step 2: Package Selection
  const renderPackageStep = () => {
    const packageIcons = {
      starter: Zap,
      professional: Crown,
      enterprise: Building2,
    }

    return (
      <div className="space-y-3">
        {packageKeys.map((tierKey, index) => {
          const pkg = PACKAGE_CONFIG[tierKey]
          const isSelected = selectedPackage === tierKey
          const Icon = packageIcons[tierKey]

          return (
            <div key={tierKey} className="relative">
              {pkg.popular && (
                <div className="absolute -top-2 right-4 z-10">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <OptionCard
                shortcut={String(index + 1)}
                icon={Icon}
                title={pkg.name}
                description={pkg.description}
                isSelected={isSelected}
                onClick={() => setSelectedPackage(tierKey)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  // Step 3: Customization - Service-specific options
  const renderCustomizationStep = () => {
    const subOptions = selectedService ? SERVICE_SUB_OPTIONS[selectedService] : []
    const shortcuts = ['A', 'B', 'C', 'D', 'E']

    // Get the question text based on service
    const getQuestionText = () => {
      switch (selectedService) {
        case 'web-development':
          return 'What type of web project do you need?'
        case 'mobile-development':
          return 'What type of mobile app do you need?'
        case 'marketing':
          return 'What type of marketing service do you need?'
        case 'ai-automation':
          return 'What type of AI solution do you need?'
        default:
          return 'Select an option'
      }
    }

    return (
      <div className="space-y-10">
        {/* Service Sub-Options */}
        <div className="space-y-4">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {getQuestionText()}
          </p>
          <div className="space-y-3">
            {subOptions.map((option, index) => {
              const isSelected = selectedSubOption === option.id

              return (
                <OptionCard
                  key={option.id}
                  shortcut={shortcuts[index] || String(index + 1)}
                  icon={option.icon}
                  title={option.name}
                  description={option.description}
                  isSelected={isSelected}
                  onClick={() => setSelectedSubOption(option.id)}
                />
              )
            })}
          </div>
        </div>

        {/* Addons */}
        {selectedService && ADDON_OPTIONS[selectedService] && (
          <div className="space-y-4">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Would you like any add-ons?{' '}
              <span className="text-neutral-400 dark:text-neutral-500">
                (optional)
              </span>
            </p>
            <div className="space-y-3">
              {ADDON_OPTIONS[selectedService].map((addon, index) => {
                const isSelected = selectedAddons.includes(addon.id)
                const addonShortcuts = ['1', '2', '3', '4', '5']

                return (
                  <CheckboxCard
                    key={addon.id}
                    shortcut={addonShortcuts[index]}
                    title={addon.name}
                    description={addon.description}
                    isSelected={isSelected}
                    onClick={() => toggleAddon(addon.id)}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Step 4: Project Details
  const renderDetailsStep = () => {
    const timelineOptions = [
      { value: 'asap', label: 'ASAP', description: 'As soon as possible' },
      { value: '2-weeks', label: '2 weeks', description: 'Quick turnaround' },
      { value: '1-month', label: '1 month', description: 'Standard' },
      { value: '2-months', label: '2 months', description: 'Extended' },
      { value: 'flexible', label: 'Flexible', description: 'No rush' },
    ]

    return (
      <div className="space-y-8">
        {/* Project Name */}
        <div className="space-y-3">
          <label className="block text-base font-medium text-neutral-700 dark:text-neutral-300">
            Project name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Company Website Redesign"
              autoFocus
              className="w-full px-4 py-3.5 text-base bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:bg-white dark:focus:bg-neutral-900 focus:border-neutral-900 dark:focus:border-white focus:ring-0 focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-3">
          <label className="block text-base font-medium text-neutral-700 dark:text-neutral-300">
            Project description
            <span className="ml-1.5 text-sm font-normal text-neutral-400">
              (optional)
            </span>
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Briefly describe what you're looking to build and any specific requirements..."
            rows={3}
            className="w-full px-4 py-3.5 text-base bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:bg-white dark:focus:bg-neutral-900 focus:border-neutral-900 dark:focus:border-white focus:ring-0 focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none transition-all"
          />
        </div>

        {/* Timeline Selection */}
        <div className="space-y-3">
          <label className="block text-base font-medium text-neutral-700 dark:text-neutral-300">
            Preferred timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {timelineOptions.map((option) => {
              const isSelected = timeline === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => setTimeline(isSelected ? '' : option.value)}
                  className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                    isSelected
                      ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-3">
          <label className="block text-base font-medium text-neutral-700 dark:text-neutral-300">
            Additional notes
            <span className="ml-1.5 text-sm font-normal text-neutral-400">
              (optional)
            </span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any references, inspiration links, or other details that might help..."
            rows={2}
            className="w-full px-4 py-3.5 text-base bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:bg-white dark:focus:bg-neutral-900 focus:border-neutral-900 dark:focus:border-white focus:ring-0 focus:outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none transition-all"
          />
        </div>
      </div>
    )
  }

  // Step 5: Budget & Attachments
  const renderBudgetStep = () => {
    // Get service-specific budget options
    const budgetOptions = selectedService
      ? SERVICE_BUDGET_OPTIONS[selectedService]
      : SERVICE_BUDGET_OPTIONS['web-development']

    // Get budget question text based on service
    const getBudgetQuestionText = () => {
      switch (selectedService) {
        case 'marketing':
          return "What's your monthly marketing budget?"
        default:
          return "What's your budget range?"
      }
    }

    return (
      <div className="space-y-10">
        {/* Budget Range Selection */}
        <div className="space-y-4">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {getBudgetQuestionText()}{' '}
            <span className="text-neutral-400 dark:text-neutral-500">
              (optional)
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {budgetOptions.map((option, index) => {
              const isSelected = budgetRange === option.id
              const shortcuts = ['1', '2', '3', '4', '5', '6', '7']

              return (
                <motion.button
                  key={option.id}
                  onClick={() => setBudgetRange(isSelected ? null : option.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  {/* Shortcut Key */}
                  <span
                    className={`hidden sm:flex flex-shrink-0 w-7 h-7 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'border-white/30 dark:border-neutral-900/30 text-white dark:text-neutral-900'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {shortcuts[index]}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium transition-colors ${
                        isSelected
                          ? 'text-white dark:text-neutral-900'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {option.label}
                    </h3>
                    <p
                      className={`text-sm truncate transition-colors ${
                        isSelected
                          ? 'text-white/70 dark:text-neutral-900/70'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {option.description}
                    </p>
                  </div>

                  {/* Check mark */}
                  {isSelected && (
                    <Check className="flex-shrink-0 w-5 h-5 text-white dark:text-neutral-900" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Reference materials{' '}
            <span className="text-neutral-400 dark:text-neutral-500">
              (optional)
            </span>
          </p>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
            Screenshots, PDFs, design files, or any helpful references
          </p>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
          }`}
        >
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
          />

          <div className="space-y-3">
            <div
              className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isDragging
                  ? 'bg-neutral-900 dark:bg-white'
                  : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              <Upload
                className={`w-6 h-6 transition-colors ${
                  isDragging
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              />
            </div>

            <div>
              <p className="font-medium text-neutral-900 dark:text-white">
                {isDragging ? 'Drop files here' : 'Drag & drop files here'}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                or{' '}
                <span className="text-neutral-900 dark:text-white underline">
                  browse
                </span>{' '}
                to upload
              </p>
            </div>

            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              JPG, PNG, PDF, DOC, XLS, PPT, ZIP up to 30MB each
            </p>
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            {uploadedFiles.map((file) => {
              const FileIcon = getFileIcon(file.type)

              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    file.error
                      ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                  }`}
                >
                  {/* File Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.error
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  >
                    <FileIcon
                      className={`w-5 h-5 ${
                        file.error
                          ? 'text-red-500'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium truncate text-sm ${
                        file.error
                          ? 'text-red-700 dark:text-red-400'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {file.name}
                    </p>
                    <p
                      className={`text-xs ${
                        file.error
                          ? 'text-red-500 dark:text-red-400'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {file.error || formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Status/Actions */}
                  {file.uploading ? (
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
                  ) : (
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
    )
  }

  // Step 6: Review
  const renderReviewStep = () => {
    const selectedServiceConfig = selectedService
      ? SERVICE_CONFIG[selectedService]
      : null
    const selectedPackageConfig = selectedPackage
      ? PACKAGE_CONFIG[selectedPackage]
      : null

    return (
      <div className="space-y-6">
        {/* Project Name */}
        <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white">
            {projectName || 'Your Project'}
          </h2>
          {projectDescription && (
            <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
              {projectDescription}
            </p>
          )}
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          {/* Client (admin only) */}
          {isAdminOrManager && selectedClient && (
            <div className="flex items-center justify-between py-3">
              <span className="text-neutral-500 dark:text-neutral-400">
                Client
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {selectedClient.name}
                {selectedClient.company && (
                  <span className="text-neutral-400 dark:text-neutral-500 ml-1.5 font-normal">
                    ({selectedClient.company})
                  </span>
                )}
              </span>
            </div>
          )}

          <div className={`flex items-center justify-between py-3 ${isAdminOrManager && selectedClient ? 'border-t border-neutral-100 dark:border-neutral-800' : ''}`}>
            <span className="text-neutral-500 dark:text-neutral-400">
              Service
            </span>
            <span className="font-medium text-neutral-900 dark:text-white">
              {selectedServiceConfig?.name || '-'}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-neutral-500 dark:text-neutral-400">
              Package
            </span>
            <span className="font-medium text-neutral-900 dark:text-white">
              {selectedPackageConfig?.name || '-'}
            </span>
          </div>

          {selectedSubOption && selectedService && (
            <div className="flex items-center justify-between py-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400">
                Type
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {SERVICE_SUB_OPTIONS[selectedService]?.find((o) => o.id === selectedSubOption)?.name || '-'}
              </span>
            </div>
          )}

          {selectedAddons.length > 0 && (
            <div className="py-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400 block mb-3">
                Add-ons
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedAddons.map((addonId) => {
                  const addon = selectedService
                    ? ADDON_OPTIONS[selectedService].find(
                        (a) => a.id === addonId,
                      )
                    : null
                  return addon ? (
                    <span
                      key={addonId}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {addon.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}

          {timeline && (
            <div className="flex items-center justify-between py-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400">
                Timeline
              </span>
              <span className="font-medium text-neutral-900 dark:text-white capitalize">
                {timeline.replace('-', ' ')}
              </span>
            </div>
          )}

          {budgetRange && selectedService && (
            <div className="flex items-center justify-between py-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400">
                Budget {selectedService === 'marketing' ? '(Monthly)' : 'Range'}
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {SERVICE_BUDGET_OPTIONS[selectedService]?.find((b) => b.id === budgetRange)?.label || '-'}
              </span>
            </div>
          )}

          {uploadedFiles.filter(f => !f.error && !f.uploading).length > 0 && (
            <div className="py-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-500 dark:text-neutral-400 block mb-3">
                Attachments
              </span>
              <div className="space-y-2">
                {uploadedFiles
                  .filter((f) => !f.error && !f.uploading)
                  .map((file) => {
                    const FileIcon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <FileIcon className="w-4 h-4 text-neutral-400" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-neutral-400 text-xs">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    // For admin/manager, step indices are offset by 1 due to client selection step
    const stepOffset = isAdminOrManager ? 1 : 0

    // Client selection step (admin only, step 0)
    if (isAdminOrManager && currentStep === 0) {
      return renderClientSelectionStep()
    }

    const adjustedStep = currentStep - stepOffset

    switch (adjustedStep) {
      case 0:
        return renderServiceStep()
      case 1:
        return renderPackageStep()
      case 2:
        return renderCustomizationStep()
      case 3:
        return renderDetailsStep()
      case 4:
        return renderBudgetStep()
      case 5:
        return renderReviewStep()
      default:
        return null
    }
  }

  // Success Screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-3"
          >
            Project Created!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-neutral-500 dark:text-neutral-400 mb-2"
          >
            <span className="font-medium text-neutral-900 dark:text-white">
              {createdProjectName}
            </span>{' '}
            has been submitted successfully.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-400 dark:text-neutral-500 mb-8"
          >
            Our team will review your request and get back to you soon.
          </motion.p>

          {/* Redirect indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-sm text-neutral-400"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to your projects...</span>
          </motion.div>

          {/* Manual redirect button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => router.push('/portal/projects')}
            className="mt-6 inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Go to projects
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <MultiStepForm
      steps={STEPS}
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      canProceed={canProceed()}
      isSubmitting={isSubmitting}
    >
      {renderCurrentStep()}
    </MultiStepForm>
  )
}

export default function NewProjectPage() {
  return (
    <ProtectedRoute>
      <NewProjectContent />
    </ProtectedRoute>
  )
}
