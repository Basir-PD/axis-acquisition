'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ProtectedRoute from '@/components/portal/ProtectedRoute'
import PortalLayout from '@/components/portal/PortalLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  StatsCards,
  ClientsTable,
  ProjectsTable,
  ProjectsKanban,
  ActivityFeed,
} from '@/components/portal/admin'
import type { Client, ProjectWithClient, Activity } from '@/components/portal/admin'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Settings,
  RefreshCw,
  Plus,
  Download,
  Kanban,
  List,
  Shield,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useProjects, type ProjectStatus } from '@/contexts/ProjectContext'

// User profile type from API
interface UserProfile {
  $id: string
  $createdAt: string
  userId: string
  email: string
  name: string
  company?: string
  phone?: string
  role: 'admin' | 'manager' | 'client'
}

// Placeholder for activities until we have real activity tracking
const mockActivities: Activity[] = []

function AdminContent() {
  const router = useRouter()
  const { projects: rawProjects, loading: projectsLoading, refreshProjects, updateProject } = useProjects()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [projectsView, setProjectsView] = useState<'kanban' | 'table'>('kanban')
  const [users, setUsers] = useState<UserProfile[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [isFixingPermissions, setIsFixingPermissions] = useState(false)
  const [permissionFixResult, setPermissionFixResult] = useState<{
    success: boolean
    projectsFixed: number
    phasesFixed: number
    errors: string[]
  } | null>(null)

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/admin/users')
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users)
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setUsersLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Create a map of userId -> user profile for quick lookup
  const userMap = useMemo(() => {
    const map = new Map<string, UserProfile>()
    users.forEach((user) => map.set(user.userId, user))
    return map
  }, [users])

  // Transform raw projects to ProjectWithClient format
  const projects: ProjectWithClient[] = useMemo(() => {
    return rawProjects.map((project) => {
      const user = userMap.get(project.userId)
      // Calculate progress from phases
      const totalPhases = project.phases?.length || 0
      const completedPhases = project.phases?.filter((p) => p.status === 'completed').length || 0
      const progress = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0
      return {
        id: project.$id,
        name: project.name,
        clientName: user?.name || 'Unknown Client',
        clientEmail: user?.email || '',
        service: project.service,
        status: project.status,
        progress,
        createdAt: project.$createdAt,
        updatedAt: project.$updatedAt,
      }
    })
  }, [rawProjects, userMap])

  // Calculate stats from real data
  const stats = useMemo(() => {
    const clientUsers = users.filter((u) => u.role === 'client')
    return {
      totalClients: clientUsers.length,
      totalProjects: projects.length,
      activeProjects: projects.filter((p) => p.status === 'in-progress').length,
      completedProjects: projects.filter((p) => p.status === 'completed').length,
      pendingProjects: projects.filter((p) => p.status === 'pending').length,
      totalRevenue: 0, // Would need invoice data for this
    }
  }, [projects, users])

  // Transform users to Client format for ClientsTable
  const clients: Client[] = useMemo(() => {
    return users
      .filter((u) => u.role === 'client')
      .map((user) => {
        const userProjects = rawProjects.filter((p) => p.userId === user.userId)
        return {
          id: user.$id,
          name: user.name,
          email: user.email,
          company: user.company || '',
          phone: user.phone || '',
          projectCount: userProjects.length,
          totalSpent: 0, // Would need invoice data
          status: 'active' as const,
          joinedAt: user.$createdAt,
        }
      })
  }, [users, rawProjects])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshProjects()
    // Re-fetch users too
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Failed to refresh users:', error)
    }
    setIsRefreshing(false)
  }

  const handleFixPermissions = async () => {
    setIsFixingPermissions(true)
    setPermissionFixResult(null)

    try {
      // Call server API to fix permissions (uses admin API key)
      const response = await fetch('/api/admin/fix-permissions', {
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fix permissions')
      }

      const result = await response.json()

      setPermissionFixResult(result)

      if (result.success) {
        toast.success('Permissions fixed successfully!', {
          description: `Fixed ${result.projectsFixed} projects and ${result.phasesFixed} phases.`,
        })
      } else {
        toast.warning('Permissions partially fixed', {
          description: `Fixed ${result.projectsFixed} projects and ${result.phasesFixed} phases with ${result.errors.length} errors.`,
        })
      }
    } catch (error) {
      console.error('Failed to fix permissions:', error)
      toast.error('Failed to fix permissions', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      })
      setPermissionFixResult({
        success: false,
        projectsFixed: 0,
        phasesFixed: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      })
    } finally {
      setIsFixingPermissions(false)
    }
  }

  const handleViewClient = (_client: Client) => {
    // TODO: Implement client detail view
    // router.push(`/portal/admin/clients/${client.id}`)
  }

  const handleViewProject = (project: ProjectWithClient) => {
    router.push(`/portal/projects/${project.id}`)
  }

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus, _newProgress: number) => {
    try {
      await updateProject(projectId, { status: newStatus })
      toast.success('Project status updated')
    } catch (error) {
      console.error('Failed to update project status:', error)
      toast.error('Failed to update project status')
    }
  }

  const isLoading = projectsLoading || usersLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage clients, projects, and monitor business metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 rounded-lg px-4"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 rounded-lg px-4"
          >
            <Users className="w-4 h-4" />
            Clients
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 rounded-lg px-4"
          >
            <FolderKanban className="w-4 h-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 rounded-lg px-4"
          >
            <CreditCard className="w-4 h-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 rounded-lg px-4"
          >
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Recent Projects
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Latest project updates
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    View all
                  </button>
                </div>
                <div className="p-6">
                  <ProjectsTable
                    projects={projects.slice(0, 4)}
                    onViewProject={handleViewProject}
                  />
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={mockActivities} />
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-4">
                Projects by Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    In Progress
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {stats.activeProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Pending
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {stats.pendingProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Completed
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {stats.completedProjects}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-4">
                Top Services
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Website
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    45
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Branding
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    32
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    SEO
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    28
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-4">
                Revenue This Month
              </h3>
              <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                $42,500
              </p>
              <p className="text-sm text-green-600 mt-2">+18% from last month</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-4">
                Pending Invoices
              </h3>
              <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                $12,800
              </p>
              <p className="text-sm text-neutral-500 mt-2">8 invoices pending</p>
            </div>
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                All Clients
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Manage your client base
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
              <Plus className="w-4 h-4" />
              Add Client
            </button>
          </div>
          <ClientsTable clients={clients} onViewClient={handleViewClient} />
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                All Projects
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Drag and drop to change project status
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => setProjectsView('kanban')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    projectsView === 'kanban'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Kanban className="w-4 h-4" />
                  Board
                </button>
                <button
                  onClick={() => setProjectsView('table')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    projectsView === 'table'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Table
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>

          {projectsView === 'kanban' ? (
            <ProjectsKanban
              projects={projects}
              onViewProject={handleViewProject}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <ProjectsTable
              projects={projects}
              onViewProject={handleViewProject}
            />
          )}
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-12 text-center">
            <CreditCard className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Invoice Management
            </h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              Invoice management features coming soon. You&apos;ll be able to
              create, send, and track invoices for all your clients.
            </p>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Fix Permissions Section */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                  Fix Project Permissions
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
                  Run this utility to fix permissions on existing projects and phases so admins can view all client projects.
                  This is a one-time fix for projects created before the permission update.
                </p>

                <button
                  onClick={handleFixPermissions}
                  disabled={isFixingPermissions}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 rounded-lg transition-colors"
                >
                  {isFixingPermissions ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fixing Permissions...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Fix All Permissions
                    </>
                  )}
                </button>

                {/* Result Display */}
                {permissionFixResult && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    permissionFixResult.success
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {permissionFixResult.success ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span className={`font-medium ${
                        permissionFixResult.success
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      }`}>
                        {permissionFixResult.success ? 'Permissions Fixed Successfully' : 'Permissions Partially Fixed'}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Fixed {permissionFixResult.projectsFixed} projects and {permissionFixResult.phasesFixed} phases.
                    </p>
                    {permissionFixResult.errors.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                          Errors ({permissionFixResult.errors.length}):
                        </p>
                        <ul className="text-xs text-red-500 dark:text-red-400 mt-1 max-h-24 overflow-y-auto">
                          {permissionFixResult.errors.slice(0, 5).map((err, i) => (
                            <li key={i}>• {err}</li>
                          ))}
                          {permissionFixResult.errors.length > 5 && (
                            <li>... and {permissionFixResult.errors.length - 5} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Other Settings Placeholder */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-12 text-center">
            <Settings className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              More Settings Coming Soon
            </h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              Additional system settings and configuration options will be available here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <PortalLayout>
        <AdminContent />
      </PortalLayout>
    </ProtectedRoute>
  )
}
