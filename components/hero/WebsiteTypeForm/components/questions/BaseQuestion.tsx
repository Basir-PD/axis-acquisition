'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BaseQuestionProps {
  question: string
  children: ReactNode
  error?: string
}

export function BaseQuestion({ question, children, error }: BaseQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Question */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {question}
        </h2>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        {children}

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-500 text-sm flex items-center gap-2"
          >
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              !
            </span>
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
