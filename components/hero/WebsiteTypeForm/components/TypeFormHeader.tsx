'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

interface TypeFormHeaderProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  showPrevious: boolean
}

export function TypeFormHeader({
  currentStep,
  totalSteps,
  onPrevious,
  showPrevious,
}: TypeFormHeaderProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="mb-6">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>

      {/* Step Counter and Previous Button */}
      <div className="flex justify-between items-center">
        <AnimatePresence mode="wait">
          {showPrevious && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={onPrevious}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <FormattedMessage
                id="typeform.navigation.previous"
                defaultMessage="Previous"
              />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentStep + 1} / {totalSteps}
        </div>
      </div>
    </div>
  )
}
