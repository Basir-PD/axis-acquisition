'use client'
import { useScroll, useTransform, motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'
import { Stethoscope, Globe, Megaphone, TrendingUp } from 'lucide-react'

interface TimelineEntry {
  title: string
  content: React.ReactNode
  stepLabel?: string
  icon?: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
  headerTitle?: string
  headerSubtitle?: string
  size?: 'sm' | 'md' | 'lg'
}

const stepIcons = [
  <Stethoscope key="audit" className="w-5 h-5" />,
  <Globe key="website" className="w-5 h-5" />,
  <Megaphone key="launch" className="w-5 h-5" />,
  <TrendingUp key="scale" className="w-5 h-5" />,
]

const stepLabels = ['Audit', 'Build', 'Launch', 'Scale']

function TimelineStep({
  item,
  index,
  totalSteps,
}: {
  item: TimelineEntry
  index: number
  totalSteps: number
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(stepRef, { once: true, margin: '-100px' })
  const isFirst = index === 0
  const isLast = index === totalSteps - 1

  return (
    <motion.div
      ref={stepRef}
      className="relative grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 lg:gap-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Left content - Number (hidden on mobile, shown on md+) */}
      <div className="hidden md:flex items-start justify-end pt-4">
        <motion.span
          className="text-[120px] lg:text-[160px] font-serif font-bold leading-none select-none text-sage-100 dark:text-sage-900/40"
          style={{ fontFeatureSettings: '"tnum"' }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Center - Timeline connector */}
      <div className="relative flex flex-col items-center">
        {/* Continuous vertical line - positioned absolutely behind the icon */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-sage-200 dark:bg-sage-800 ${
            isFirst ? 'top-[28px] md:top-[32px]' : 'top-0'
          } ${
            isLast ? 'bottom-[calc(100%-28px)] md:bottom-[calc(100%-32px)]' : 'bottom-0'
          }`}
        />

        {/* Node/Icon - with padding to create space */}
        <div className={`relative z-10 ${!isFirst ? 'mt-0' : ''}`}>
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-[#141a14] border-2 border-sage-200 dark:border-sage-700/60 flex items-center justify-center text-sage-600 dark:text-sage-400 shadow-lg shadow-sage-200/50 dark:shadow-sage-950/50"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: 0.3,
            }}
          >
            {stepIcons[index]}
          </motion.div>
        </div>
      </div>

      {/* Right content - Card */}
      <div className="pb-16 md:pb-20 pt-0">
        {/* Mobile number */}
        <motion.span
          className="md:hidden text-5xl font-serif font-bold text-sage-200 dark:text-sage-800 mb-2 block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        <motion.div
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Card */}
          <div className="relative bg-white dark:bg-[#141a14] rounded-2xl p-6 md:p-8 border border-sage-100 dark:border-sage-800/40 shadow-sm hover:shadow-xl hover:shadow-sage-200/30 dark:hover:shadow-sage-950/50 transition-all duration-500 hover:border-sage-200 dark:hover:border-sage-700/60 overflow-hidden">
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-50/0 to-sage-100/0 group-hover:from-sage-50/50 group-hover:to-sage-100/30 dark:group-hover:from-sage-800/20 dark:group-hover:to-sage-900/10 transition-all duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative">
              {/* Step label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex px-3 py-1.5 rounded-full bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-300 text-xs font-semibold uppercase tracking-wider">
                  Step {index + 1} — {stepLabels[index]}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-sage-900 dark:text-cream-50 mb-4 leading-tight">
                {item.title}
              </h3>

              {/* Content */}
              <div className="text-sage-600 dark:text-sage-300 text-base md:text-lg leading-relaxed">
                {item.content}
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-sage-100 dark:bg-sage-800/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export const Timeline = ({ data }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-cream-50 via-white to-cream-50 dark:from-[#0c0f0c] dark:via-[#0e110e] dark:to-[#0c0f0c]"
    >
      {/* Subtle background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </motion.div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sage-200/30 dark:bg-sage-800/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cream-200/40 dark:bg-sage-900/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          {/* Process Badge */}
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="px-4 py-2 rounded-full bg-sage-100 dark:bg-sage-800/50 border border-sage-200 dark:border-sage-700 text-sage-700 dark:text-sage-300 text-sm font-medium">
              Our Process
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 dark:text-cream-50 mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How We Fill Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-sage-600 dark:text-sage-400">Clinic</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-3 bg-sage-200/60 dark:bg-sage-700/40 -z-0"
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </span>{' '}
            With Patients
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sage-600 dark:text-sage-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A proven 4-step system designed specifically for integrative health practices.
            We handle the marketing so you can focus on patient care.
          </motion.p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {data.map((item, index) => (
            <TimelineStep
              key={index}
              item={item}
              index={index}
              totalSteps={data.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
