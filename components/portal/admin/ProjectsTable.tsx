'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Search,
  Globe,
  Sparkles,
  Megaphone,
  MessageSquare,
  PlayCircle,
  PauseCircle,
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

interface ProjectsTableProps {
  projects: ProjectWithClient[]
  onViewProject?: (_project: ProjectWithClient) => void
  onEditProject?: (_project: ProjectWithClient) => void
  onDeleteProject?: (_project: ProjectWithClient) => void
  onChangeStatus?: (_project: ProjectWithClient, _status: ProjectStatus) => void
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

const statusStyles: Record<ProjectStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info'> = {
  pending: 'warning',
  approved: 'success',
  'in-progress': 'info',
  review: 'secondary',
  completed: 'success',
  'on-hold': 'warning',
  cancelled: 'destructive',
}

const statusLabels: Record<ProjectStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  'in-progress': 'In Progress',
  review: 'In Review',
  completed: 'Completed',
  'on-hold': 'On Hold',
  cancelled: 'Cancelled',
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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ProjectsTable({
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject,
  onChangeStatus,
}: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ProjectStatus | 'all')
            }
            className="px-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-800/50">
              <TableHead className="font-semibold">Project</TableHead>
              <TableHead className="font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Service</TableHead>
              <TableHead className="font-semibold">Progress</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-neutral-500"
                >
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => {
                const ServiceIcon = serviceIcons[project.service]
                return (
                  <TableRow
                    key={project.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                          <ServiceIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {project.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Created {formatDate(project.createdAt)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-xs font-medium">
                            {getInitials(project.clientName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {project.clientName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {serviceLabels[project.service]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden max-w-[100px]">
                          <div
                            className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusStyles[project.status]}>
                        {statusLabels[project.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-500">
                      {formatDate(project.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-neutral-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onViewProject?.(project)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditProject?.(project)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              onChangeStatus?.(project, 'in-progress')
                            }
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onChangeStatus?.(project, 'on-hold')}
                          >
                            <PauseCircle className="w-4 h-4 mr-2" />
                            Put On Hold
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDeleteProject?.(project)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <p>
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>
    </div>
  )
}
