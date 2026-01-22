'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  FolderPlus,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  UserPlus,
  Edit,
  AlertCircle,
} from 'lucide-react'

export interface Activity {
  id: string
  type:
    | 'project_created'
    | 'project_completed'
    | 'payment_received'
    | 'message_received'
    | 'client_joined'
    | 'project_updated'
    | 'status_changed'
  title: string
  description: string
  user?: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

const activityIcons = {
  project_created: FolderPlus,
  project_completed: CheckCircle2,
  payment_received: CreditCard,
  message_received: MessageSquare,
  client_joined: UserPlus,
  project_updated: Edit,
  status_changed: AlertCircle,
}

const activityColors = {
  project_created: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  project_completed: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  payment_received: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  message_received: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  client_joined: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  project_updated: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  status_changed: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatTimeAgo(timestamp: string) {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Recent Activity
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Latest updates across all projects
        </p>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-[400px] overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-neutral-500">
            No recent activity
          </div>
        ) : (
          activities.map((activity, index) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-neutral-500 mt-0.5">
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-400 whitespace-nowrap">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    {activity.user && (
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-[10px]">
                            {getInitials(activity.user)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-neutral-500">
                          {activity.user}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
      {activities.length > 0 && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button className="w-full text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            View all activity
          </button>
        </div>
      )}
    </div>
  )
}
