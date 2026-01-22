'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useCountAnimation } from '../hooks/useCountAnimation'

interface StatItem {
  label: string
  icon: LucideIcon
  numericValue: number
  suffix: string
}

interface AnimatedStatProps {
  stat: StatItem
  index: number
}

export function AnimatedStat({ stat, index }: AnimatedStatProps) {
  const { count, startAnimation } = useCountAnimation(stat.numericValue, 2)
  const statRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            startAnimation()
            setHasAnimated(true)
          }, index * 150)
        }
      },
      { threshold: 0.5 },
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => observer.disconnect()
  }, [startAnimation, hasAnimated, index])

  const formatNumber = (num: number) => {
    if (stat.suffix === '%') {
      return num.toFixed(1)
    }
    return Math.floor(num).toString()
  }

  const Icon = stat.icon

  return (
    <motion.div
      ref={statRef}
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 sm:p-6 bg-white dark:bg-[#141a14] rounded-2xl shadow-xl border border-sage-100 dark:border-sage-800/40 backdrop-blur-sm opacity-0"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-sage-100 dark:bg-sage-800/60 rounded-xl mb-3 sm:mb-4 shadow-lg">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-sage-600 dark:text-sage-400" />
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-sage-900 dark:text-cream-50 mb-1 sm:mb-2 leading-tight">
        {formatNumber(count)}
        {stat.suffix}
      </div>
      <div className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-medium leading-tight">
        {stat.label}
      </div>
    </motion.div>
  )
}
