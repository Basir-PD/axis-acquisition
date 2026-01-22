'use client'

import ProtectedRoute from '@/components/portal/ProtectedRoute'
import PortalLayout from '@/components/portal/PortalLayout'
import { Users, Mail, Phone, MoreVertical, Plus, Search } from 'lucide-react'

// Sample team data
const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@webapplica.com',
    role: 'manager',
    phone: '+1 (555) 123-4567',
    avatar: 'S',
    projects: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@webapplica.com',
    role: 'client',
    phone: '+1 (555) 234-5678',
    avatar: 'M',
    projects: 3,
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@webapplica.com',
    role: 'client',
    phone: '+1 (555) 345-6789',
    avatar: 'E',
    projects: 2,
  },
]

function TeamMemberCard({ member }: { member: (typeof teamMembers)[0] }) {
  const roleColors = {
    admin: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    manager: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    client:
      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
              {member.avatar}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {member.name}
            </h3>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full capitalize ${roleColors[member.role as keyof typeof roleColors]}`}
            >
              {member.role}
            </span>
          </div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
          <Mail className="w-4 h-4" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
          <Phone className="w-4 h-4" />
          <span>{member.phone}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {member.projects} active projects
        </span>
      </div>
    </div>
  )
}

function TeamContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Team
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage team members and their roles
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 text-neutral-900 dark:text-white placeholder:text-neutral-400"
        />
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {teamMembers.length}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Total Members
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {teamMembers.filter((m) => m.role === 'client').length}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Clients
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {
                  teamMembers.filter(
                    (m) => m.role === 'manager' || m.role === 'admin',
                  ).length
                }
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Staff
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <ProtectedRoute allowedRoles={['manager', 'admin']}>
      <PortalLayout>
        <TeamContent />
      </PortalLayout>
    </ProtectedRoute>
  )
}
