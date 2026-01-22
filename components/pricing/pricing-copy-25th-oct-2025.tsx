'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FormattedMessage } from 'react-intl'
import MultiStepForm from '@/components/hero/AIAutomationTypeForm/index'
import { PricingHeader } from './components/PricingHeader'
import { PricingCard } from './components/PricingCard'
import { PricingComparison } from './components/PricingComparison'
import {
  getWebsitePricingTiers,
  getAIPricingTiers,
} from './constants/pricingData'
import { Button } from '@/components/shared/button'
import { useIntl } from 'react-intl'
import { Globe, Bot } from 'lucide-react'

export default function Pricing() {
  const [isOpen, setIsOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'websites' | 'aiBusinessSolutions'
  >('aiBusinessSolutions')
  const intl = useIntl()

  const websiteTiers = getWebsitePricingTiers(intl)
  const aiTiers = getAIPricingTiers(intl)
  const pricingTiers = activeTab === 'websites' ? websiteTiers : aiTiers

  return (
    <section
      className="isolate overflow-hidden w-full rounded px-2 sm:px-0"
      id="price"
    >
      <div className="flow-root pb-4 md:pb-6 pt-6 md:pt-8 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!showComparison ? (
              <motion.div
                key="pricing-cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PricingHeader />

                {/* Tab Switcher */}
                <div className="flex justify-center mt-8 mb-10">
                  <div className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex relative">
                      {/* Animated Background Slider */}
                      <motion.div
                        className="absolute top-1 bottom-1 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-lg shadow-md"
                        animate={{
                          left:
                            activeTab === 'aiBusinessSolutions'
                              ? '4px'
                              : 'calc(50% + 2px)',
                          width: 'calc(50% - 6px)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />

                      <button
                        onClick={() => setActiveTab('aiBusinessSolutions')}
                        className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 min-w-[180px] justify-center ${
                          activeTab === 'aiBusinessSolutions'
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Bot className="w-4 h-4" />
                        <FormattedMessage
                          id="pricing.tabs.aiBusinessSolutions"
                          defaultMessage="Business Solutions"
                        />
                      </button>

                      <button
                        onClick={() => setActiveTab('websites')}
                        className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 min-w-[180px] justify-center ${
                          activeTab === 'websites'
                            ? 'text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        <FormattedMessage
                          id="pricing.tabs.websites"
                          defaultMessage="Websites"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative mx-auto mt-3 md:mt-6 grid max-w-sm md:max-w-2xl lg:max-w-6xl grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:-mb-2 lg:grid-cols-3"
                  >
                    <div
                      aria-hidden="true"
                      className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-200/80 dark:lg:bg-gray-800/80 lg:ring-1 lg:ring-gray-900/10 dark:lg:ring-white/10"
                    />

                    {pricingTiers.map((tier) => (
                      <PricingCard
                        key={`${activeTab}-${tier.id}`}
                        tier={tier}
                        onGetStarted={() => setIsOpen(true)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Compare Plans Button - Only show for Websites */}
                {activeTab === 'websites' && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={() => setShowComparison(true)}
                      variant="secondary"
                      className="px-8 py-3"
                    >
                      <FormattedMessage
                        id="pricing.comparePlans"
                        defaultMessage="Compare All Plans"
                      />
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="comparison-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PricingComparison
                  onBackToCards={() => setShowComparison(false)}
                  onGetStarted={() => setIsOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative lg:pt-3">
          <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 py-2 md:py-3" />
        </div>
      </div>

      <MultiStepForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  )
}
