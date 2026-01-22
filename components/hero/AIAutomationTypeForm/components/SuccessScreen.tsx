'use client'

import { motion } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/shared/button'

interface SuccessScreenProps {
  onClose: () => void
}

export function SuccessScreen({ onClose }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-12 px-8"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          <FormattedMessage
            id="typeform.success.title"
            defaultMessage="Thank you"
          />
        </h3>

        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          <FormattedMessage
            id="typeform.success.message"
            defaultMessage="Your submission has been received. We'll get back to you within 24 hours with a personalized proposal."
          />
        </p>
      </motion.div>

      {/* Close Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Button
          onClick={onClose}
          className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          <X className="w-4 h-4 mr-2" />
          <FormattedMessage id="typeform.labels.close" defaultMessage="Close" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
