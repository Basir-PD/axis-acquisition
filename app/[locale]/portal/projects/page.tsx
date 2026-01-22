'use client'

import { useAuth } from '@/contexts/AuthContext'
import {
  useProjects,
  SERVICE_CONFIG,
  PACKAGE_CONFIG,
} from '@/contexts/ProjectContext'
import ProtectedRoute from '@/components/portal/ProtectedRoute'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Globe,
  Sparkles,
  Megaphone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pause,
  ArrowRight,
  Folder,
  X,
} from 'lucide-react'

const SERVICE_ICONS: Record<string, typeof Globe> = {
  'web-development': Globe,
  'mobile-development': Sparkles,
  marketing: Megaphone,
  'ai-automation': MessageSquare,
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: {
    label: 'Pending',
    color:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    color:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    icon: CheckCircle2,
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    icon: AlertCircle,
  },
  review: {
    label: 'In Review',
    color:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    icon: AlertCircle,
  },
  completed: {
    label: 'Completed',
    color:
      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    icon: CheckCircle2,
  },
  'on-hold': {
    label: 'On Hold',
    color:
      'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
    icon: Pause,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    icon: X,
  },
}

function ProjectCard({
  project,
}: {
  project: ReturnType<typeof useProjects>['projects'][0]
}) {
  const Icon = SERVICE_ICONS[project.service] || Folder
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.pending
  const StatusIcon = status.icon
  const serviceConfig = SERVICE_CONFIG[project.service]

  // Calculate overall progress
  const completedPhases = project.phases.filter(
    (p) => p.status === 'completed',
  ).length
  const progress =
    project.phases.length > 0
      ? Math.round((completedPhases / project.phases.length) * 100)
      : 0

  return (
    <Link href={`/portal/projects/${project.$id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center group-hover:bg-neutral-900 group-hover:dark:bg-white transition-colors">
              <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-white group-hover:dark:text-neutral-900 transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {serviceConfig.name}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${status.color}`}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </span>
        </div>

        {project.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-500 dark:text-neutral-400">
              Progress
            </span>
            <span className="font-medium text-neutral-900 dark:text-white">
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-neutral-900 dark:bg-white rounded-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400">
              {PACKAGE_CONFIG[project.packageTier].name}
            </span>
          </div>
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Folder className="w-10 h-10 text-neutral-400" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
        No projects yet
      </h3>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
        Start your first project and bring your ideas to life. We&apos;re here
        to help you every step of the way.
      </p>
      <Link
        href="/portal/projects/new"
        className="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Your First Project
      </Link>
    </div>
  )
}

function ProjectsContent() {
  const { user } = useAuth()
  const { projects } = useProjects()

  // Filter projects for current user
  const userProjects = projects.filter((p) => p.userId === user?.$id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Projects
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage and track all your projects
          </p>
        </div>
        <Link
          href="/portal/projects/new"
          className="inline-flex items-center px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-lg shadow-neutral-900/10 dark:shadow-white/10"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </Link>
      </div>

      {/* Filters (only show if there are projects) */}
      {userProjects.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 text-neutral-900 dark:text-white placeholder:text-neutral-400"
            />
          </div>
          <button className="inline-flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      )}

      {/* Projects Grid or Empty State */}
      {userProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.$id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <ProjectsContent />
      </PortalLayout>
    </ProtectedRoute>
  )
}
