'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  Eye,
  Globe,
  Sparkles,
  Megaphone,
  MessageSquare,
  GripVertical,
} from 'lucide-react'
import type { ServiceType, ProjectStatus } from '@/lib/portal-services'

export interface ProjectWithClient {
  id: string
  name: string
  clientName: string
  clientEmail: string
  service: ServiceType
  status: ProjectStatus
  progress: number
  createdAt: string
  updatedAt: string
}

type KanbanStatus = 'pending' | 'in-progress' | 'completed'

interface ProjectsKanbanProps {
  projects: ProjectWithClient[]
  onViewProject?: (_project: ProjectWithClient) => void
  onStatusChange?: (_projectId: string, _newStatus: ProjectStatus, _newProgress: number) => void
}

const serviceIcons: Record<ServiceType, React.ElementType> = {
  'web-development': Globe,
  'mobile-development': Sparkles,
  marketing: Megaphone,
  'ai-automation': MessageSquare,
}

const serviceLabels: Record<ServiceType, string> = {
  'web-development': 'Web Development',
  'mobile-development': 'Mobile Development',
  marketing: 'Marketing',
  'ai-automation': 'AI Automation',
}

const kanbanColumns: { id: KanbanStatus; title: string; color: string; bgColor: string }[] = [
  { id: 'pending', title: 'Not Started', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  { id: 'in-progress', title: 'In Progress', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'completed', title: 'Completed', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
]

// Map detailed statuses to kanban columns
function getKanbanStatus(status: ProjectStatus): KanbanStatus {
  switch (status) {
    case 'pending':
    case 'on-hold':
    case 'cancelled':
      return 'pending'
    case 'approved':
    case 'in-progress':
    case 'review':
      return 'in-progress'
    case 'completed':
      return 'completed'
    default:
      return 'pending'
  }
}

// Map kanban column to project status
function getProjectStatus(kanbanStatus: KanbanStatus): ProjectStatus {
  switch (kanbanStatus) {
    case 'pending':
      return 'pending'
    case 'in-progress':
      return 'in-progress'
    case 'completed':
      return 'completed'
    default:
      return 'pending'
  }
}

// Get progress based on kanban status
function getProgressForStatus(kanbanStatus: KanbanStatus): number {
  switch (kanbanStatus) {
    case 'pending':
      return 0
    case 'in-progress':
      return 50
    case 'completed':
      return 100
    default:
      return 0
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Sortable Project Card
function SortableProjectCard({
  project,
  onViewProject,
}: {
  project: ProjectWithClient
  onViewProject?: (_project: ProjectWithClient) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const ServiceIcon = serviceIcons[project.service]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm hover:shadow-md transition-all ${
        isDragging ? 'opacity-50 shadow-lg ring-2 ring-neutral-400' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            {...attributes}
            {...listeners}
            className="mt-1 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4 text-neutral-400" />
          </button>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-neutral-900 dark:text-white truncate">
              {project.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <ServiceIcon className="w-3 h-3 text-neutral-400" />
              <span className="text-xs text-neutral-500 truncate">
                {serviceLabels[project.service]}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
              <MoreHorizontal className="w-4 h-4 text-neutral-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onViewProject?.(project)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-neutral-500">Progress</span>
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {project.progress}%
          </span>
        </div>
        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              project.progress === 100
                ? 'bg-green-500'
                : project.progress > 0
                ? 'bg-blue-500'
                : 'bg-neutral-300 dark:bg-neutral-600'
            }`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-[10px] font-medium">
              {getInitials(project.clientName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate max-w-[100px]">
            {project.clientName}
          </span>
        </div>
        <span className="text-xs text-neutral-400">{formatDate(project.updatedAt)}</span>
      </div>
    </div>
  )
}

// Project Card for Drag Overlay
function ProjectCardOverlay({ project }: { project: ProjectWithClient }) {
  const ServiceIcon = serviceIcons[project.service]

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-xl w-[280px]">
      <div className="flex items-start gap-3">
        <div className="p-1 rounded">
          <GripVertical className="w-4 h-4 text-neutral-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-neutral-900 dark:text-white truncate">
            {project.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <ServiceIcon className="w-3 h-3 text-neutral-400" />
            <span className="text-xs text-neutral-500 truncate">
              {serviceLabels[project.service]}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Kanban Column
function KanbanColumn({
  column,
  projects,
  onViewProject,
}: {
  column: { id: KanbanStatus; title: string; color: string; bgColor: string }
  projects: ProjectWithClient[]
  onViewProject?: (_project: ProjectWithClient) => void
}) {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[320px] flex-1">
      <div className={`p-3 rounded-t-xl ${column.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${column.color}`}>{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {projects.length}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex-1 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-b-xl min-h-[400px]">
        <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {projects.map((project) => (
              <SortableProjectCard
                key={project.id}
                project={project}
                onViewProject={onViewProject}
              />
            ))}
            {projects.length === 0 && (
              <div className="text-center py-8 text-neutral-400">
                <p className="text-sm">No projects</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}

export default function ProjectsKanban({
  projects: initialProjects,
  onViewProject,
  onStatusChange,
}: ProjectsKanbanProps) {
  const [projects, setProjects] = useState<ProjectWithClient[]>(initialProjects)
  const [activeProject, setActiveProject] = useState<ProjectWithClient | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Group projects by kanban status
  const projectsByStatus = kanbanColumns.reduce((acc, column) => {
    acc[column.id] = projects.filter((p) => getKanbanStatus(p.status) === column.id)
    return acc
  }, {} as Record<KanbanStatus, ProjectWithClient[]>)

  const findProjectById = useCallback((id: string) => {
    return projects.find((p) => p.id === id)
  }, [projects])

  const findColumnByProjectId = useCallback((id: string): KanbanStatus | null => {
    const project = findProjectById(id)
    if (!project) return null
    return getKanbanStatus(project.status)
  }, [findProjectById])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const project = findProjectById(active.id as string)
    if (project) {
      setActiveProject(project)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeColumn = findColumnByProjectId(activeId)
    let overColumn: KanbanStatus | null = null

    // Check if over is a column
    if (kanbanColumns.some((c) => c.id === overId)) {
      overColumn = overId as KanbanStatus
    } else {
      overColumn = findColumnByProjectId(overId)
    }

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return
    }

    // Move project to new column
    setProjects((prev) => {
      return prev.map((p) => {
        if (p.id === activeId) {
          const newStatus = getProjectStatus(overColumn!)
          const newProgress = overColumn === 'completed' ? 100 : overColumn === 'pending' ? 0 : p.progress
          return {
            ...p,
            status: newStatus,
            progress: newProgress,
          }
        }
        return p
      })
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveProject(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeColumn = findColumnByProjectId(activeId)
    let overColumn: KanbanStatus | null = null

    // Check if over is a column
    if (kanbanColumns.some((c) => c.id === overId)) {
      overColumn = overId as KanbanStatus
    } else {
      overColumn = findColumnByProjectId(overId)
    }

    if (activeColumn && overColumn && activeColumn === overColumn) {
      // Reorder within same column
      const columnProjects = projectsByStatus[activeColumn]
      const oldIndex = columnProjects.findIndex((p) => p.id === activeId)
      const newIndex = columnProjects.findIndex((p) => p.id === overId)

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(columnProjects, oldIndex, newIndex)
        setProjects((prev) => {
          const otherProjects = prev.filter((p) => getKanbanStatus(p.status) !== activeColumn)
          return [...otherProjects, ...newOrder]
        })
      }
    }

    // Trigger callback for status change
    const project = findProjectById(activeId)
    if (project && overColumn) {
      const newStatus = getProjectStatus(overColumn)
      const newProgress = getProgressForStatus(overColumn)

      // Only call if status actually changed
      if (getKanbanStatus(initialProjects.find(p => p.id === activeId)?.status || 'pending') !== overColumn) {
        onStatusChange?.(activeId, newStatus, newProgress)
      }
    }
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              projects={projectsByStatus[column.id]}
              onViewProject={onViewProject}
            />
          ))}
        </div>

        <DragOverlay>
          {activeProject ? <ProjectCardOverlay project={activeProject} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
