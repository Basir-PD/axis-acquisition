'use client'

import { motion } from 'framer-motion'
import { Check, X, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Feature {
  name: string
  description?: string
  standard: boolean | string
  premium: boolean | string
  enterprise: boolean | string
}

const features: Feature[] = [
  {
    name: 'Custom Design',
    description: 'Unique design tailored to your brand',
    standard: true,
    premium: true,
    enterprise: true,
  },
  {
    name: 'Responsive Layout',
    description: 'Works perfectly on all devices',
    standard: true,
    premium: true,
    enterprise: true,
  },
  {
    name: 'SEO Optimization',
    description: 'Search engine optimized for better rankings',
    standard: 'Basic',
    premium: 'Advanced',
    enterprise: 'Enterprise',
  },
  {
    name: 'Number of Pages',
    standard: 'Up to 5',
    premium: 'Up to 10',
    enterprise: 'Up to 50',
  },
  {
    name: 'AI Chatbot',
    description: 'Interactive AI-powered customer support',
    standard: false,
    premium: true,
    enterprise: true,
  },
  {
    name: 'Custom Integrations',
    description: 'CRM, APIs, and third-party services',
    standard: false,
    premium: 'Limited',
    enterprise: 'Unlimited',
  },
  {
    name: 'E-commerce',
    description: 'Full online store functionality',
    standard: false,
    premium: false,
    enterprise: true,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Track visitor behavior and conversions',
    standard: 'Basic',
    premium: 'Advanced',
    enterprise: 'Custom',
  },
  {
    name: 'Content Management',
    description: 'Easy-to-use CMS for content updates',
    standard: true,
    premium: true,
    enterprise: true,
  },
  {
    name: 'Performance Optimization',
    description: 'Lightning-fast load times',
    standard: true,
    premium: true,
    enterprise: true,
  },
  {
    name: 'SSL Certificate',
    description: 'Secure HTTPS connection',
    standard: true,
    premium: true,
    enterprise: true,
  },
  {
    name: 'Hosting',
    standard: '1 year',
    premium: '2 years',
    enterprise: 'Lifetime',
  },
  {
    name: 'Support',
    standard: 'Email',
    premium: 'Priority',
    enterprise: 'Dedicated',
  },
  {
    name: 'Revisions',
    standard: '3',
    premium: '10',
    enterprise: 'Unlimited',
  },
  {
    name: 'Delivery Time',
    standard: '14 days',
    premium: '10 days',
    enterprise: 'Custom',
  },
]

export function PackageComparison() {
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
          Detailed Package Comparison
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the perfect package for your business needs
        </p>
      </motion.div>

      <div className="overflow-x-auto">
        <TooltipProvider>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 font-semibold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
                  Features
                </th>
                <th className="text-center p-4 font-semibold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">Standard</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      $3,000 - $5,000
                    </span>
                  </div>
                </th>
                <th className="text-center p-4 font-semibold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">Premium</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      $8,000 - $15,000
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 mt-1 font-normal">
                      Most Popular
                    </span>
                  </div>
                </th>
                <th className="text-center p-4 font-semibold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">Enterprise</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      $50,000+
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-black dark:text-white">
                        {feature.name}
                      </span>
                      {feature.description && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {renderFeatureValue(feature.standard)}
                  </td>
                  <td className="p-4 text-center bg-blue-50/50 dark:bg-blue-900/10">
                    {renderFeatureValue(feature.premium)}
                  </td>
                  <td className="p-4 text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </TooltipProvider>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
          Not sure which package is right for you?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our team will help you choose the perfect solution for your business
          needs and budget.
        </p>
        <a
          href="/contact-form"
          className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Get a Custom Quote
        </a>
      </motion.div>
    </div>
  )
}

function renderFeatureValue(value: boolean | string) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-gray-400 mx-auto" />
    )
  }
  return (
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {value}
    </span>
  )
}
