import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ContactFormSuccessProps {
  onReset: () => void
}

export const ContactFormSuccess: React.FC<ContactFormSuccessProps> = ({
  onReset,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white dark:bg-sage-900/40 rounded-3xl p-8 lg:p-12 shadow-xl border border-sage-100 dark:border-sage-800 text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sage-500/30"
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </motion.div>

      {/* Title */}
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-900 dark:text-cream-50 mb-4">
        Request Received!
      </h2>

      {/* Message */}
      <p className="text-lg text-stone-600 dark:text-stone-300 mb-6 max-w-lg mx-auto">
        Thank you for reaching out. Our team will contact you within
        24 hours to schedule your free growth strategy call.
      </p>

      {/* What&apos;s Next Box */}
      <div className="bg-sage-50 dark:bg-sage-800/40 rounded-2xl p-6 mb-8 max-w-md mx-auto">
        <h3 className="font-semibold text-sage-900 dark:text-cream-50 mb-4">
          What Happens Next?
        </h3>
        <ul className="space-y-3 text-left">
          {[
            'We review your clinic information',
            "We'll call to schedule your strategy session",
            'You receive a custom growth plan (30 min, free)',
            'Decide if we are the right fit for your clinic',
          ].map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-sage-500 text-white text-sm font-semibold rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-stone-600 dark:text-stone-300 text-sm">
                {step}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Contact */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <Link
          href="tel:+15551234567"
          className="inline-flex items-center gap-2 text-sage-700 dark:text-sage-300 hover:text-sage-600 dark:hover:text-sage-200 font-medium transition-colors"
        >
          <Phone className="w-4 h-4" />
          Can&apos;t wait? Call (555) 123-4567
        </Link>
      </div>

      {/* Send Another */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-sage-600 dark:hover:text-sage-300 font-medium transition-colors group"
      >
        Send another message
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  )
}
