'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface IpadCardProps {
  children: ReactNode
}

export function IpadCard({ children }: IpadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1,
      }}
      className="relative mx-auto max-w-7xl rounded-[32px] h-[20rem] md:h-[25rem] lg:h-[30rem] w-full border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg dark:border-neutral-500 dark:bg-neutral-800/50 md:p-4 overflow-hidden"
    >
      <div className="rounded-[24px] h-[19rem] md:h-[23rem] lg:h-[28rem] border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}
