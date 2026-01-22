'use client'

import { motion } from 'framer-motion'
import {
  Users,
  FolderKanban,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ElementType
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'neutral'
  index: number
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500/20',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    ring: 'ring-green-500/20',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    ring: 'ring-purple-500/20',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    icon: 'text-orange-600 dark:text-orange-400',
    ring: 'ring-orange-500/20',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    icon: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-500/20',
  },
  neutral: {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    icon: 'text-neutral-600 dark:text-neutral-400',
    ring: 'ring-neutral-500/20',
  },
}

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color,
  index,
}: StatCardProps) {
  const colors = colorClasses[color]
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : isNegative
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-neutral-500'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : isNegative ? (
              <ArrowDownRight className="w-4 h-4" />
            ) : null}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-neutral-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {title}
        </p>
        {changeLabel && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
            {changeLabel}
          </p>
        )}
      </div>
    </motion.div>
  )
}

interface StatsCardsProps {
  stats: {
    totalClients: number
    totalProjects: number
    activeProjects: number
    completedProjects: number
    pendingProjects: number
    totalRevenue: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      change: 12,
      changeLabel: 'vs last month',
      icon: Users,
      color: 'blue' as const,
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: 8,
      changeLabel: 'vs last month',
      icon: FolderKanban,
      color: 'purple' as const,
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: Clock,
      color: 'orange' as const,
    },
    {
      title: 'Completed',
      value: stats.completedProjects,
      change: 24,
      changeLabel: 'vs last month',
      icon: CheckCircle2,
      color: 'green' as const,
    },
    {
      title: 'Pending Review',
      value: stats.pendingProjects,
      icon: AlertCircle,
      color: 'red' as const,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: 18,
      changeLabel: 'vs last month',
      icon: DollarSign,
      color: 'green' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statItems.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  )
}
