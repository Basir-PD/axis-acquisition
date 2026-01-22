'use client'
import { IconCheck } from '@tabler/icons-react'
import { tiers } from '@/constants/tier'

export function PricingTable() {
  const CheckIcon = () => {
    return <IconCheck className="h-5 w-5 flex-shrink-0 text-green-500" />
  }

  const features = [
    'Create APIs',
    'Access to Dashboard',
    'Share functionality',
    'Playground Editor',
    'Marketplace access',
    'On call support',
    'Developer Program',
    'Advanced Analytics',
    'Long running APIs',
    'Zero Downtime Guarantee',
    'Custom Analytics',
    'Single Sign On',
    'Security certificate',
    'Retweets from us',
    'We send you flowers',
  ]

  return (
    <div className="mx-auto w-full relative z-20 px-4 py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden
                ${index === 1 ? 'md:scale-105 md:-mt-4 md:mb-4 z-10 dark:bg-red-500' : ''}
              `}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {tier.name}
                </h2>
                <p className="text-4xl font-bold text-center mb-6">
                  {/* ${tier?.price} */}
                  <span className="text-lg font-normal">/mo</span>
                </p>
                <ul className="space-y-3">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {featureIndex < 7 ||
                      (index > 0 && featureIndex < 11) ||
                      index === 2 ? (
                        <>
                          <CheckIcon />
                          <span className="ml-3 text-neutral-600 dark:text-neutral-300">
                            {feature}
                          </span>
                        </>
                      ) : (
                        <span className="ml-8 text-neutral-400 dark:text-neutral-500 line-through">
                          {feature}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-neutral-50 dark:bg-neutral-700">
                <button
                  className={`w-full py-2 px-4 rounded-md font-semibold
                  ${index === 1 ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-600 dark:text-white dark:hover:bg-neutral-500'}
                `}
                >
                  Choose {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
