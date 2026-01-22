import type { Metadata } from 'next'
import { SearchableFAQs } from '@/components/faq/SearchableFAQs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Axis Acquisition',
  description:
    'Find answers to common questions about our enterprise-grade web solutions and services.',
  openGraph: {
    images: ['https://webapplica.com'],
  },
}

// Main FAQ Page Component
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <SearchableFAQs hideCTA />
    </div>
  )
}
