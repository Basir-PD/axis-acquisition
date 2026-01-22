'use client'

import { motion } from 'framer-motion'
import {
  FolderKanban,
  FileCheck,
  CreditCard,
  MessageCircle,
  Bell,
  Clock,
  Shield,
  LucideIcon,
} from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const BENEFITS: Benefit[] = [
  {
    icon: FolderKanban,
    title: 'Track Project Progress',
    description: 'Real-time updates on every phase',
  },
  {
    icon: FileCheck,
    title: 'Access Deliverables',
    description: 'Download files anytime',
  },
  {
    icon: CreditCard,
    title: 'Manage Invoices',
    description: 'View and download invoices',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Message our team instantly',
  },
  {
    icon: Bell,
    title: 'Get Notified',
    description: 'Updates on milestones',
  },
  {
    icon: Clock,
    title: '24/7 Access',
    description: 'Always available for you',
  },
]

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const Icon = benefit.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{benefit.title}</h3>
        <p className="text-sm text-neutral-400">{benefit.description}</p>
      </div>
    </motion.div>
  )
}

export default function BenefitsSidebar() {
  return (
    <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] bg-neutral-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">
              Client Portal
            </span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Your projects,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
              simplified.
            </span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-sm">
            One place to track progress, access files, and stay connected with
            your team.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-3">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Secure & Private</p>
            <p className="text-xs text-neutral-500">
              Your data is encrypted and protected
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
