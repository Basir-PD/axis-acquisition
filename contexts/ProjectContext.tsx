'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useAuth } from './AuthContext'
import {
  projectsService,
  phasesService,
  Project,
  ProjectPhase,
  ServiceType,
  PackageTier,
  ProjectStatus,
  BudgetRange,
  SERVICE_CONFIG,
  PACKAGE_CONFIG,
} from '@/lib/portal-services'

// Re-export types and configs for convenience
export type {
  ServiceType,
  PackageTier,
  ProjectStatus,
  BudgetRange,
  Project,
  ProjectPhase,
}
export { SERVICE_CONFIG, PACKAGE_CONFIG }

interface ProjectWithPhases extends Project {
  phases: ProjectPhase[]
}

interface ProjectContextType {
  projects: ProjectWithPhases[]
  loading: boolean
  error: string | null
  addProject: (
    project: Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>,
    forUserId?: string, // Optional: admin can create project for a specific user
  ) => Promise<ProjectWithPhases>
  updateProject: (
    id: string,
    updates: Partial<
      Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>
    >,
  ) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  getProject: (id: string) => ProjectWithPhases | undefined
  refreshProjects: () => Promise<void>
  updatePhase: (
    phaseId: string,
    updates: Partial<Omit<ProjectPhase, '$id' | '$createdAt' | 'projectId'>>,
  ) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth()
  const [projects, setProjects] = useState<ProjectWithPhases[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      let projectsWithPhases: ProjectWithPhases[]

      if (profile?.role === 'admin' || profile?.role === 'manager') {
        // Admins and managers use server API to fetch ALL projects (bypasses permissions)
        const response = await fetch('/api/admin/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        projectsWithPhases = data.projects as ProjectWithPhases[]
      } else {
        // Clients fetch only their own projects using client-side SDK
        const projectList = await projectsService.listByUser(user.$id)

        // Fetch phases for each project
        projectsWithPhases = await Promise.all(
          projectList.map(async (project) => {
            const phases = await phasesService.listByProject(project.$id)
            return { ...project, phases }
          }),
        )
      }

      setProjects(projectsWithPhases)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [user, profile?.role])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addProject = async (
    projectData: Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>,
    forUserId?: string, // Optional: admin can create project for a specific user
  ): Promise<ProjectWithPhases> => {
    if (!user) throw new Error('User not authenticated')

    // Use the specified userId (for admin) or fall back to current user
    const targetUserId = forUserId || user.$id

    try {
      setError(null)

      // Create the project
      const newProject = await projectsService.create(targetUserId, projectData)

      // Create phases for the project
      const phases = await phasesService.createForProject(
        newProject.$id,
        targetUserId,
        projectData.service,
      )

      const projectWithPhases: ProjectWithPhases = { ...newProject, phases }

      setProjects((prev) => [projectWithPhases, ...prev])
      return projectWithPhases
    } catch (err) {
      console.error('Failed to create project:', err)
      setError('Failed to create project')
      throw err
    }
  }

  const updateProject = async (
    id: string,
    updates: Partial<
      Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'userId'>
    >,
  ) => {
    try {
      setError(null)

      // Use server API for admins/managers to bypass document permissions
      if (profile?.role === 'admin' || profile?.role === 'manager') {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update project')
        }
      } else {
        // Clients use client-side SDK (respects document permissions)
        await projectsService.update(id, updates)
      }

      setProjects((prev) =>
        prev.map((p) =>
          p.$id === id
            ? { ...p, ...updates, $updatedAt: new Date().toISOString() }
            : p,
        ),
      )
    } catch (err) {
      console.error('Failed to update project:', err)
      setError('Failed to update project')
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      setError(null)

      // Use server API for admins/managers to bypass document permissions
      if (profile?.role === 'admin' || profile?.role === 'manager') {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to delete project')
        }
      } else {
        // Clients use client-side SDK (respects document permissions)
        // Delete phases first
        await phasesService.deleteByProject(id)
        // Delete the project
        await projectsService.delete(id)
      }

      setProjects((prev) => prev.filter((p) => p.$id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
      setError('Failed to delete project')
      throw err
    }
  }

  const getProject = (id: string): ProjectWithPhases | undefined => {
    return projects.find((p) => p.$id === id)
  }

  const refreshProjects = async () => {
    await fetchProjects()
  }

  const updatePhase = async (
    phaseId: string,
    updates: Partial<Omit<ProjectPhase, '$id' | '$createdAt' | 'projectId'>>,
  ) => {
    try {
      setError(null)

      let updatedPhase: ProjectPhase

      // Use server API for admins/managers to bypass document permissions
      if (profile?.role === 'admin' || profile?.role === 'manager') {
        const response = await fetch(`/api/admin/phases/${phaseId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update phase')
        }
        const data = await response.json()
        updatedPhase = data.phase as ProjectPhase
      } else {
        // Clients use client-side SDK (respects document permissions)
        updatedPhase = await phasesService.update(phaseId, updates)
      }

      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          phases: project.phases.map((phase) =>
            phase.$id === phaseId ? { ...phase, ...updatedPhase } : phase,
          ),
        })),
      )
    } catch (err) {
      console.error('Failed to update phase:', err)
      setError('Failed to update phase')
      throw err
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        refreshProjects,
        updatePhase,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
