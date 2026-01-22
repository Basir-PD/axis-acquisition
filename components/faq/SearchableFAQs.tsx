'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { FAQItem } from './components/FAQItem'
import { FAQHeader } from './components/FAQHeader'
import { FAQCTA } from './components/FAQCTA'
import { useFaqData } from './constants/faqData'
import { IconSearch, IconX } from '@tabler/icons-react'

interface SearchableFAQsProps {
  hideCTA?: boolean
}

export function SearchableFAQs({ hideCTA }: SearchableFAQsProps) {
  const intl = useIntl()
  const faqData = useFaqData()
  const [openFAQs, setOpenFAQs] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFAQ = (id: string) => {
    setOpenFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id],
    )
  }

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqData
    }

    const query = searchQuery.toLowerCase()
    return faqData.filter((faq) => {
      // Search in question
      const questionMatch = faq.question.toLowerCase().includes(query)

      // Search in answer (convert JSX to string for searching)
      const answerText =
        typeof faq.answer === 'string'
          ? faq.answer.toLowerCase()
          : faq.answer?.toString().toLowerCase() || ''
      const answerMatch = answerText.includes(query)

      return questionMatch || answerMatch
    })
  }, [searchQuery, faqData])

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-cream-50 dark:bg-sage-950"
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <FAQHeader mounted={mounted} />

        {/* Simple Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={intl.formatMessage({
                id: 'faq.searchPlaceholder',
                defaultMessage: 'Search FAQs...',
              })}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <IconX className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              {...faq}
              index={index}
              isOpen={openFAQs.includes(faq.id)}
              toggleFAQ={() => toggleFAQ(faq.id)}
              mounted={mounted}
            />
          ))}
        </div>

        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              <FormattedMessage
                id="faq.noResults"
                defaultMessage="No FAQs found matching your search."
              />
            </p>
          </div>
        )}

        <FAQCTA hideCTA={hideCTA} />
      </div>
    </section>
  )
}
