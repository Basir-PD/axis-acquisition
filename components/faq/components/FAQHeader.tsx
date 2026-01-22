'use client'

import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'
import { Heading } from '@/components/shared/heading'

interface FAQHeaderProps {
  mounted: boolean
}

export function FAQHeader({ mounted }: FAQHeaderProps) {
  return (
    <motion.div
      className="text-center mb-8 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: mounted ? 0.6 : 0 }}
    >
      <div>
        <Heading size="main" className="mb-3 md:mb-4">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <FormattedMessage
              id="faq.title"
              defaultMessage="Frequently Asked Questions"
            />
          </span>
        </Heading>
      </div>
      <div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          <FormattedMessage
            id="faq.subtitle"
            defaultMessage="Get answers to common questions about our enterprise-grade web solutions"
          />
        </p>
      </div>
    </motion.div>
  )
}
