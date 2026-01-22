'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useFaqData } from './constants/faqData'
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

interface FAQsProps {
  hideCTA?: boolean
}

export function FAQs({ hideCTA }: FAQsProps) {
  const faqData = useFaqData()
  const [openFAQs, setOpenFAQs] = useState<string[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id],
    )
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 bg-cream-50 dark:bg-sage-950"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-sage-700 dark:text-sage-300 bg-sage-100 dark:bg-sage-800/50 rounded-full">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-sage-900 dark:text-cream-50 leading-tight">
            Your Questions,{' '}
            <span className="text-sage-600 dark:text-sage-400">Answered</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-300">
            Everything you need to know about our integrative approach to healthcare
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  openFAQs.includes(faq.id)
                    ? 'bg-white dark:bg-sage-900/60 border-sage-200 dark:border-sage-700 shadow-md'
                    : 'bg-white/50 dark:bg-sage-900/30 border-sage-100 dark:border-sage-800 hover:border-sage-200 dark:hover:border-sage-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex items-center justify-between w-full p-5 md:p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 ${
                        openFAQs.includes(faq.id)
                          ? 'bg-sage-500 text-white'
                          : 'bg-sage-100 dark:bg-sage-800 text-sage-600 dark:text-sage-400'
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <span className="font-semibold text-sage-900 dark:text-cream-50 text-base md:text-lg pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-sage-500 flex-shrink-0 transition-transform duration-300 ${
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFAQs.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 ml-14">
                        <div className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        {!hideCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 md:mt-16 text-center"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700 dark:from-sage-700 dark:to-sage-800 shadow-xl">
              <MessageCircle className="w-12 h-12 text-sage-200 mx-auto mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3">
                Still Have Questions?
              </h3>
              <p className="text-sage-100 text-lg mb-6 max-w-lg mx-auto">
                Our team is here to help. Schedule a free discovery call or reach out directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream-50 text-sage-700 font-semibold rounded-full shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Free Consultation
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 px-6 py-4 text-white hover:text-sage-100 font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call (555) 123-4567
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
