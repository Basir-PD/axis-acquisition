'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUp, Check, CornerDownLeft } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
}

interface MultiStepFormProps {
  steps: Step[]
  currentStep: number
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
  canProceed: boolean
  isSubmitting?: boolean
  children: React.ReactNode
}

export default function MultiStepForm({
  steps,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  canProceed,
  isSubmitting = false,
  children,
}: MultiStepFormProps) {
  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed && !isSubmitting) {
        e.preventDefault()
        if (isLastStep) {
          onSubmit()
        } else {
          onNext()
        }
      }
    },
    [canProceed, isLastStep, isSubmitting, onNext, onSubmit],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      {/* Progress Bar - TypeForm style thin line at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-100 dark:bg-neutral-900">
        <motion.div
          className="h-full bg-neutral-900 dark:bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Back Button - Top Left */}
      <div className="fixed top-6 left-6 z-40">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={`group flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
            currentStep === 0
              ? 'opacity-0 pointer-events-none'
              : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
            <ArrowUp className="w-4 h-4" />
          </span>
        </button>
      </div>

      {/* Step Counter - Top Right */}
      <div className="fixed top-6 right-6 z-40">
        <span className="text-sm text-neutral-400 font-medium">
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Question Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    {currentStep + 1}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 dark:text-white leading-tight">
                  {steps[currentStep].title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Form Content */}
              <div className="pt-4">{children}</div>

              {/* Continue Button */}
              <div className="pt-8 flex items-center gap-4">
                {isLastStep ? (
                  <button
                    onClick={onSubmit}
                    disabled={!canProceed || isSubmitting}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium text-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-neutral-900/20 dark:shadow-black/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                        Creating Project...
                      </>
                    ) : (
                      <>
                        Create Project
                        <Check className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium text-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-neutral-900/20 dark:shadow-black/20"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}

                {/* Keyboard Hint */}
                <span className="hidden md:flex items-center gap-2 text-sm text-neutral-400">
                  press{' '}
                  <kbd className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-xs">
                    Enter <CornerDownLeft className="w-3 h-3" />
                  </kbd>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-neutral-900 dark:bg-white'
                  : index < currentStep
                    ? 'w-2 bg-neutral-400 dark:bg-neutral-500'
                    : 'w-2 bg-neutral-200 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
