'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useProjects, SERVICE_CONFIG } from '@/contexts/ProjectContext'
import ProtectedRoute from '@/components/portal/ProtectedRoute'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles,
  Megaphone,
  MessageSquare,
  Folder,
  Activity,
  Layers,
  Settings,
  ChevronRight,
  BarChart3,
} from 'lucide-react'

const SERVICE_ICONS: Record<string, typeof Globe> = {
  'web-development': Globe,
  'mobile-development': Sparkles,
  marketing: Megaphone,
  'ai-automation': MessageSquare,
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  review: 'Review',
  completed: 'Completed',
}

function StatItem({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: React.ElementType
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
      </div>
      <span className="text-sm font-semibold text-neutral-900 dark:text-white">{value}</span>
    </div>
  )
}

function ProjectRow({
  project,
}: {
  project: ReturnType<typeof useProjects>['projects'][0]
}) {
  const Icon = SERVICE_ICONS[project.service] || Folder
  const serviceConfig = SERVICE_CONFIG[project.service]
  const completedPhases = project.phases.filter((p) => p.status === 'completed').length
  const progress = project.phases.length > 0
    ? Math.round((completedPhases / project.phases.length) * 100)
    : 0

  return (
    <Link href={`/portal/projects/${project.$id}`}>
      <div className="group flex items-center gap-3 py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 -mx-4 px-4 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {project.name}
            </p>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {statusLabels[project.status] || project.status}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {serviceConfig?.name || 'Project'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16">
            <Progress value={progress} className="h-1" />
          </div>
          <span className="text-xs font-medium text-neutral-500 w-8 text-right">{progress}%</span>
          <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
        </div>
      </div>
    </Link>
  )
}

function ActionLink({
  href,
  icon: Icon,
  label,
  primary = false,
}: {
  href: string
  icon: React.ElementType
  label: string
  primary?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
        primary
          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${primary ? '' : 'text-neutral-500 dark:text-neutral-400'}`} />
        <span className={`text-sm font-medium ${primary ? '' : 'text-neutral-700 dark:text-neutral-300'}`}>
          {label}
        </span>
      </div>
      <ArrowRight className={`w-3.5 h-3.5 ${primary ? '' : 'text-neutral-400'}`} />
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-3">
        <Layers className="w-6 h-6 text-neutral-400" />
      </div>
      <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">No projects yet</p>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
        Create your first project to get started
      </p>
      <Link
        href="/portal/projects/new"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium"
      >
        <Plus className="w-3.5 h-3.5" />
        New Project
      </Link>
    </div>
  )
}

function DashboardContent() {
  const { profile, isAdmin, isManager, user } = useAuth()
  const { projects } = useProjects()

  const userProjects = projects.filter((p) => p.userId === user?.$id)
  const activeProjects = userProjects.filter(
    (p) => p.status === 'in-progress' || p.status === 'review'
  )
  const pendingProjects = userProjects.filter((p) => p.status === 'pending')
  const completedProjects = userProjects.filter((p) => p.status === 'completed')

  const recentProjects = [...userProjects]
    .sort((a, b) => new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime())
    .slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Welcome back, {profile?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {userProjects.length === 0
              ? 'Get started by creating your first project'
              : `${activeProjects.length} active · ${pendingProjects.length} pending · ${completedProjects.length} completed`}
          </p>
        </div>
        <Link
          href="/portal/projects/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Projects</h2>
            {userProjects.length > 0 && (
              <Link
                href="/portal/projects"
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                View all
              </Link>
            )}
          </div>
          {recentProjects.length > 0 ? (
            <div>
              {recentProjects.map((project) => (
                <ProjectRow key={project.$id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Overview</h2>
            <StatItem label="Total" value={userProjects.length} icon={Layers} />
            <StatItem label="In Progress" value={activeProjects.length} icon={Activity} />
            <StatItem label="Pending" value={pendingProjects.length} icon={Clock} />
            <StatItem label="Completed" value={completedProjects.length} icon={CheckCircle2} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Actions</h2>
            <div className="space-y-1">
              <ActionLink href="/portal/projects/new" icon={Plus} label="New Project" primary />
              <ActionLink href="/portal/projects" icon={FileText} label="All Projects" />
              <ActionLink href="/portal/settings" icon={Settings} label="Settings" />
              <ActionLink href="/contact" icon={MessageSquare} label="Support" />
            </div>
          </div>

          {/* Admin Stats */}
          {(isAdmin || isManager) && projects.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-neutral-400" />
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Team</h2>
              </div>
              <StatItem label="All Projects" value={projects.length} icon={Layers} />
              <StatItem label="Active" value={projects.filter((p) => p.status === 'in-progress').length} icon={Activity} />
              <StatItem label="Completed" value={projects.filter((p) => p.status === 'completed').length} icon={CheckCircle2} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortalDashboard() {
  return (
    <ProtectedRoute>
      <PortalLayout>
        <DashboardContent />
      </PortalLayout>
    </ProtectedRoute>
  )
}
