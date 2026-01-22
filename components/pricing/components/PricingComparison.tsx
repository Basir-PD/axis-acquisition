'use client'

import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/shared/button'

interface ComparisonFeature {
  name: string
  premium: boolean | string
  standard: boolean | string
  enterprise: boolean | string
}

interface PricingComparisonProps {
  onBackToCards: () => void
  onGetStarted: () => void
}

export function PricingComparison({
  onBackToCards,
  onGetStarted,
}: PricingComparisonProps) {
  const comparisonFeatures: ComparisonFeature[] = [
    {
      name: 'Number of Pages',
      premium: 'Up to 10',
      standard: 'Up to 5',
      enterprise: 'Up to 50',
    },
    {
      name: 'Mobile & SEO Optimization',
      premium: true,
      standard: true,
      enterprise: true,
    },
    { name: 'Contact Form', premium: true, standard: true, enterprise: true },
    {
      name: 'SSL Certificate',
      premium: true,
      standard: true,
      enterprise: true,
    },
    { name: 'Logo Design', premium: true, standard: true, enterprise: true },
    {
      name: 'Content Management System',
      premium: true,
      standard: true,
      enterprise: true,
    },
    {
      name: 'Calendar Integration',
      premium: true,
      standard: true,
      enterprise: true,
    },
    {
      name: 'AI-powered Chatbot',
      premium: true,
      standard: true,
      enterprise: true,
    },
    {
      name: 'Revisions',
      premium: '10',
      standard: '3',
      enterprise: 'Unlimited',
    },
    {
      name: 'Post-launch Support',
      premium: '1 month',
      standard: '2 weeks',
      enterprise: '2 months',
    },
    {
      name: 'Time to Market',
      premium: '15-25 days',
      standard: '6-10 days',
      enterprise: 'Custom',
    },
    {
      name: 'Priority Support',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Conversion Rate Optimization',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Advanced Animations & Interactions',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Professional Copywriting',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Newsletter Signup Integration',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Custom Integrations (CRM, APIs)',
      premium: true,
      standard: false,
      enterprise: true,
    },
    {
      name: 'E-commerce Integration',
      premium: false,
      standard: false,
      enterprise: true,
    },
    { name: 'UI/UX Design', premium: false, standard: false, enterprise: true },
    {
      name: 'AI-enhanced Marketing Sequences',
      premium: false,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Dynamic Content Personalization',
      premium: false,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Custom AI Agent Implementation',
      premium: false,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Custom LLM Fine-tuning',
      premium: false,
      standard: false,
      enterprise: true,
    },
    {
      name: 'Hosting',
      premium: '$50/month',
      standard: '6mo free, then $20/mo',
      enterprise: 'Custom',
    },
  ]

  const renderFeatureCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      )
    }
    return (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {value}
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          <FormattedMessage
            id="pricing.comparison.title"
            defaultMessage="Compare Plans"
          />
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <FormattedMessage
            id="pricing.comparison.subtitle"
            defaultMessage="See exactly what's included in each plan"
          />
        </p>
        <Button onClick={onBackToCards} variant="secondary" className="mb-6">
          <FormattedMessage
            id="pricing.comparison.backToPlans"
            defaultMessage="← Back to Plans"
          />
        </Button>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  <FormattedMessage
                    id="pricing.comparison.features"
                    defaultMessage="Features"
                  />
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-lg font-bold">Standard</span>
                    <span className="text-2xl font-bold text-blue-600">
                      $1,500
                    </span>
                    <Button
                      onClick={onGetStarted}
                      className="px-4 py-2 text-xs"
                    >
                      Get Started
                    </Button>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <span className="text-lg font-bold">Premium</span>
                      <div className="absolute -top-2 -right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      $4,500
                    </span>
                    <Button
                      onClick={onGetStarted}
                      className="px-4 py-2 text-xs"
                    >
                      Get Started
                    </Button>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-lg font-bold">Enterprise</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Custom
                    </span>
                    <Button
                      onClick={onGetStarted}
                      className="px-4 py-2 text-xs"
                    >
                      Contact Us
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comparisonFeatures.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureCell(feature.standard)}
                  </td>
                  <td className="px-6 py-4 text-center bg-blue-50 dark:bg-blue-900/20">
                    {renderFeatureCell(feature.premium)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureCell(feature.enterprise)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <FormattedMessage
            id="pricing.comparison.bottomCta"
            defaultMessage="Ready to get started? Choose the plan that's right for you."
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onGetStarted} className="px-8 py-3">
            <FormattedMessage
              id="pricing.comparison.startProject"
              defaultMessage="Start My Project"
            />
          </Button>
          <Button
            onClick={onBackToCards}
            variant="secondary"
            className="px-8 py-3"
          >
            <FormattedMessage
              id="pricing.comparison.backToPlans"
              defaultMessage="Back to Plans"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
