'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import type { FAQItemProps } from '../types'

export function FAQItem({
  question,
  answer,
  id,
  isOpen,
  toggleFAQ,
  icon,
  index,
  mounted,
}: FAQItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: mounted ? index * 0.1 : 0 }}
    >
      <div
        className={`accordion transition-all duration-500 ${
          isOpen
            ? 'bg-white dark:bg-neutral-800/50 shadow-2xl scale-[1.01] border-2 border-gray-900/20 dark:border-gray-100/20'
            : 'bg-white/80 dark:bg-neutral-800/30 hover:bg-white dark:hover:bg-neutral-800/40 shadow-md hover:shadow-lg border border-neutral-200/50 dark:border-neutral-700/50'
        } backdrop-blur-sm rounded-2xl p-0 overflow-hidden`}
        id={`basic-heading-${id}`}
      >
        <button
          className={`accordion-toggle group flex items-center justify-between w-full transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-8 ${
            isOpen
              ? 'text-gray-900 dark:text-white bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/20'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-controls={`basic-collapse-${id}`}
          onClick={toggleFAQ}
        >
          <div className="flex items-center flex-1 min-w-0">
            <div
              className={`mr-3 sm:mr-4 md:mr-5 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 ${
                isOpen
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 text-white dark:text-gray-900 shadow-lg scale-110'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/50 group-hover:text-gray-800 dark:group-hover:text-gray-200'
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                {icon}
              </div>
            </div>
            <h5
              className={`text-left text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-all duration-300 flex-1 min-w-0 pr-2 ${
                isOpen
                  ? 'translate-x-0 sm:text-lg md:text-xl lg:text-2xl'
                  : 'group-hover:translate-x-1 sm:group-hover:translate-x-2'
              }`}
            >
              {question}
            </h5>
          </div>
          <motion.div
            className={`flex-shrink-0 ml-2 sm:ml-3 md:ml-4 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? 'bg-gray-900 dark:bg-gray-100 shadow-lg'
                : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/50'
            }`}
          >
            {isOpen ? (
              // Minus icon for open state
              <motion.svg
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ${
                  isOpen
                    ? 'text-white dark:text-gray-900'
                    : 'text-neutral-600 dark:text-neutral-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
            ) : (
              // Plus icon for closed state
              <motion.svg
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 ${
                  isOpen
                    ? 'text-white dark:text-gray-900'
                    : 'text-neutral-600 dark:text-neutral-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              id={`basic-collapse-${id}`}
              className="accordion-content w-full overflow-hidden"
              aria-labelledby={`basic-heading-${id}`}
            >
              <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
