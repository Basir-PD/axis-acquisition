'use client'

import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'

interface FAQCTAProps {
  hideCTA?: boolean
}

export function FAQCTA({ hideCTA }: FAQCTAProps) {
  if (hideCTA) return null

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-5 md:mb-6">
        <FormattedMessage
          id="faq.cta.description"
          defaultMessage="Still have questions? We're here to help."
        />
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <a
          href="/contact"
          className="inline-flex items-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-semibold text-sm sm:text-base rounded-full hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <FormattedMessage id="faq.cta.button" defaultMessage="Get in Touch" />
          <svg
            className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}
