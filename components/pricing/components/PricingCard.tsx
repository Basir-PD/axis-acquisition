'use client'

import { useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { CircleCheckBig } from 'lucide-react'
import { Button } from '@/components/shared/button'
import { Tier } from '../types'
import { cn } from '@/utils/cn'
import { FormattedMessage } from 'react-intl'

interface PricingCardProps {
  tier: Tier
  onGetStarted: () => void
}

export function PricingCard({ tier, onGetStarted }: PricingCardProps) {
  const [showFeatures, setShowFeatures] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  const FEATURES_LIMIT = 10
  const hasMoreFeatures = tier.mainFeatures.length > FEATURES_LIMIT
  const visibleFeatures = showAllFeatures
    ? tier.mainFeatures
    : tier.mainFeatures.slice(0, FEATURES_LIMIT)
  const hiddenFeaturesCount = Math.max(
    0,
    tier.mainFeatures.length - FEATURES_LIMIT,
  )

  return (
    <div
      className={cn(
        tier.featured
          ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
          : 'bg-gray-200/80 dark:bg-gray-800/80 ring-1 ring-gray-900/10 dark:ring-white/10 lg:bg-transparent lg:py-6 lg:ring-0',
        'relative rounded-2xl md:h-full',
      )}
    >
      <div className="p-3 md:p-4 lg:p-5 md:h-full md:flex md:flex-col">
        <div className="md:flex-grow">
          <h3
            id={tier.id}
            className={cn(
              tier.featured ? 'text-gray-900' : 'text-gray-900 dark:text-white',
              'text-base md:text-lg lg:text-xl font-semibold leading-tight relative inline-block',
            )}
          >
            <span className="relative z-10">{tier.price}</span>
          </h3>

          <div className="mt-1 md:mt-2">
            <p
              className={cn(
                tier.featured
                  ? 'text-gray-900'
                  : 'text-gray-900 dark:text-white',
                'text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight',
              )}
            >
              {tier.name}
            </p>
          </div>

          <p
            className={cn(
              tier.featured
                ? 'text-gray-600'
                : 'text-gray-600 dark:text-gray-300',
              'mt-1 text-xs md:text-sm leading-tight',
            )}
          >
            {tier.description}
          </p>

          {/* Features Section */}
          <div className="mt-3 md:mt-4 flow-root">
            <div className="flex items-center justify-between mb-1">
              <h4
                className={cn(
                  tier.featured
                    ? 'text-gray-900'
                    : 'text-gray-900 dark:text-white',
                  'text-base md:text-lg lg:text-xl font-semibold leading-tight relative inline-block',
                )}
              >
                <span className="relative z-10">
                  <FormattedMessage
                    id="pricing.features.included"
                    defaultMessage="What is included?"
                  />
                </span>
              </h4>

              {/* Toggle button - only show on mobile */}
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className={cn(
                  'md:hidden flex items-center gap-1 text-xs font-medium',
                  tier.featured
                    ? 'text-gray-700'
                    : 'text-gray-600 dark:text-gray-400',
                )}
              >
                {showFeatures ? (
                  <FormattedMessage
                    id="pricing.features.hide"
                    defaultMessage="Hide"
                  />
                ) : (
                  <FormattedMessage
                    id="pricing.features.show"
                    defaultMessage="Show"
                  />
                )}
                {showFeatures ? (
                  <IconChevronUp className="h-3 w-3" />
                ) : (
                  <IconChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>

            {/* Features List - Always show on desktop, toggle on mobile */}
            <div className={cn('md:block', showFeatures ? 'block' : 'hidden')}>
              <div className="space-y-0">
                {/* Main Features List */}
                <ul
                  role="list"
                  className={cn(
                    tier.featured
                      ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                      : 'divide-gray-900/5 dark:divide-white/5 border-gray-900/5 dark:border-white/5 text-gray-600 dark:text-white',
                    'text-xs md:text-sm lg:text-base leading-6',
                  )}
                >
                  {visibleFeatures.map((mainFeature) => (
                    <li
                      key={mainFeature}
                      className="flex items-center gap-x-2 py-0.5 md:py-1"
                    >
                      <CircleCheckBig
                        aria-hidden="true"
                        className={cn(
                          tier.featured
                            ? 'text-primary'
                            : 'text-gray-500 dark:text-gray-400',
                          'h-4 w-4 flex-none mt-0.5',
                        )}
                      />
                      <span className="leading-relaxed">{mainFeature}</span>
                    </li>
                  ))}
                </ul>

                {/* Additional Features with smooth animation - only show when not showing all features */}
                {hasMoreFeatures && !showAllFeatures && (
                  <div
                    className={cn(
                      'transition-all duration-300 ease-in-out overflow-hidden',
                      'opacity-0 max-h-0',
                    )}
                  >
                    <ul
                      role="list"
                      className={cn(
                        tier.featured
                          ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                          : 'divide-gray-900/5 dark:divide-white/5 border-gray-900/5 dark:border-white/5 text-gray-600 dark:text-white',
                        'text-xs md:text-sm lg:text-base leading-6',
                      )}
                    >
                      {tier.mainFeatures
                        .slice(FEATURES_LIMIT)
                        .map((mainFeature) => (
                          <li
                            key={`additional-${mainFeature}`}
                            className="flex items-center gap-x-2 py-0.5 md:py-1"
                          >
                            <CircleCheckBig
                              aria-hidden="true"
                              className={cn(
                                tier.featured
                                  ? 'text-primary'
                                  : 'text-gray-500 dark:text-gray-400',
                                'h-4 w-4 flex-none mt-0.5',
                              )}
                            />
                            <span className="leading-relaxed">
                              {mainFeature}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Show More/Less Button */}
                {hasMoreFeatures && (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className={cn(
                        'flex items-center gap-1.5 text-xs md:text-sm font-medium transition-colors duration-200 hover:opacity-80',
                        tier.featured
                          ? 'text-primary'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                      )}
                    >
                      {showAllFeatures ? (
                        <>
                          <FormattedMessage
                            id="pricing.features.showLess"
                            defaultMessage="Show Less"
                          />
                          <IconChevronUp className="h-3.5 w-3.5 transition-transform duration-200" />
                        </>
                      ) : (
                        <>
                          <FormattedMessage
                            id="pricing.features.showMore"
                            defaultMessage="Show {count} More Features"
                            values={{ count: hiddenFeaturesCount }}
                          />
                          <IconChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Show features count on mobile when collapsed */}
            {!showFeatures && (
              <div className="md:hidden mt-2">
                <p
                  className={cn(
                    'text-xs',
                    tier.featured
                      ? 'text-gray-500'
                      : 'text-gray-500 dark:text-gray-400',
                  )}
                >
                  {tier.mainFeatures.length} features included
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 md:mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onGetStarted}
            className={cn(
              'w-full px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm lg:text-base font-medium',
              tier.featured
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100',
            )}
          >
            {tier.cta}
          </Button>
        </div>
      </div>
    </div>
  )
}
