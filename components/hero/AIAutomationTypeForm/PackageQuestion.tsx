'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { useController } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { cn } from '@/utils/cn'
import { getPackages, PricingPackage } from '@/lib/pricing-packages'

interface PackageQuestionProps {
  question: any
  control: any
  handleNext: () => void
  isLastStep: boolean
  trigger: (_name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
}

const OkayButton: React.FC<{
  onClick?: () => void
  isSubmit?: boolean
  disabled?: boolean
  isSubmitting?: boolean
}> = ({
  onClick,
  isSubmit = false,
  disabled = false,
  isSubmitting = false,
}) => (
  <div className="flex items-center w-full justify-between mt-4 md:mt-6">
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={isSubmit ? undefined : onClick}
      className={`bg-black text-white hover:bg-gray-800 transition-all duration-200 ease-out rounded-sm px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium touch-manipulation min-h-[40px] md:min-h-[44px] flex items-center ${
        disabled || isSubmitting
          ? 'opacity-50 cursor-not-allowed hover:bg-black'
          : ''
      }`}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <FormattedMessage
            id="typeform.submitting"
            defaultMessage="Submitting..."
          />
        </>
      ) : (
        <>
          {isSubmit ? (
            <FormattedMessage
              id="typeform.navigation.submit"
              defaultMessage="Submit"
            />
          ) : (
            <FormattedMessage id="typeform.labels.ok" defaultMessage="OK" />
          )}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </>
      )}
    </button>
    <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-gray-500">
      <FormattedMessage id="typeform.pressEnter" defaultMessage="press" />
      <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono">
        Enter ↵
      </kbd>
    </div>
  </div>
)

const PackageCard: React.FC<{
  pkg: PricingPackage
  isSelected: boolean
  onSelect: () => void
  onViewDetails: () => void
}> = ({ pkg, isSelected, onSelect, onViewDetails }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const displayFeatures = showAllFeatures
    ? pkg.features
    : pkg.features.slice(0, 3)
  const hasMoreFeatures = pkg.features.length > 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative h-full"
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'w-full h-full text-left p-4 lg:p-5 rounded-xl border-2 transition-all duration-200 relative flex flex-col',
          isSelected
            ? 'border-black bg-gray-50 shadow-lg scale-[1.02]'
            : 'border-gray-200 hover:border-gray-400 hover:shadow-md bg-white',
          pkg.featured && !isSelected && 'border-blue-200 bg-blue-50/30',
        )}
      >
        {/* Featured Badge */}
        {pkg.featured && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span>RECOMMENDED</span>
            </div>
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 left-3">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
        )}

        {/* Package Content */}
        <div className={cn('flex flex-col h-full', isSelected && 'ml-6')}>
          {/* Price and Name - Fixed Height Section */}
          <div className="flex-shrink-0 mb-3">
            <p className="text-xl md:text-2xl font-bold text-black mb-1">
              {pkg.price}
            </p>
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {pkg.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
              {pkg.description}
            </p>
          </div>

          {/* Key Info - Fixed Height Section */}
          <div className="flex-shrink-0 space-y-1.5 mb-3 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{pkg.pages}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{pkg.timeToMarket}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{pkg.postLaunchSupport}</span>
            </div>
          </div>

          {/* Features List - Scrollable if needed */}
          <div className="flex-grow min-h-0 overflow-hidden mb-3">
            <div className="space-y-1">
              {displayFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span className="text-gray-600 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            {hasMoreFeatures && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAllFeatures(!showAllFeatures)
                }}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {showAllFeatures ? (
                  <>
                    Show less
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    +{pkg.features.length - 3} more features
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Bottom Actions - Fixed at bottom */}
          <div className="flex-shrink-0 space-y-2 mt-auto">
            {/* View Details Link */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails()
              }}
              className="w-full text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 py-1"
            >
              <Info className="w-3 h-3" />
              View all details
            </button>

            {/* Select Button */}
            <div
              className={cn(
                'w-full px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors text-center',
                isSelected
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700',
              )}
            >
              {isSelected ? 'Selected' : 'Select Package'}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export const PackageQuestion: React.FC<PackageQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  trigger,
  focusTrigger,
  isSubmitting,
}) => {
  const intl = useIntl()
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedDetails, setSelectedDetails] = useState<PricingPackage | null>(
    null,
  )

  const {
    field: { value, onChange },
    fieldState,
  } = useController({
    name: question.id,
    control,
    defaultValue: '',
    rules: { required: question.isRequired },
  })

  // Get packages from single source of truth
  const packages = getPackages(intl)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [focusTrigger])

  const handlePackageSelect = (packageId: string) => {
    const selectedPackage = packages.find((p) => p.id === packageId)
    if (selectedPackage) {
      // Store both the package ID and name with price for better form submission
      onChange(`${selectedPackage.name} - ${selectedPackage.price}`)
      trigger(question.id)
    }
  }

  const isPackageSelected = (packageId: string) => {
    const selectedPackage = packages.find((p) => p.id === packageId)
    return selectedPackage
      ? value === `${selectedPackage.name} - ${selectedPackage.price}`
      : false
  }

  return (
    <>
      <div className="space-y-4" ref={containerRef} tabIndex={-1}>
        {/* Package Cards Grid - Optimized for laptop screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {packages.map((pkg) => (
            <div key={pkg.id} className="h-full min-h-[280px] md:min-h-[320px]">
              <PackageCard
                pkg={pkg}
                isSelected={isPackageSelected(pkg.id)}
                onSelect={() => handlePackageSelect(pkg.id)}
                onViewDetails={() => setSelectedDetails(pkg)}
              />
            </div>
          ))}
        </div>

        {/* Validation Error */}
        {fieldState.error && (
          <div className="flex items-center gap-2 text-red-500">
            <span className="text-xs md:text-sm">
              <FormattedMessage
                id="typeform.validation.selectPackage"
                defaultMessage="Please select a package"
              />
            </span>
          </div>
        )}

        {/* OK Button */}
        <OkayButton
          onClick={handleNext}
          isSubmit={isLastStep}
          disabled={!value || fieldState.invalid}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100000] flex items-center justify-center p-4"
            onClick={() => setSelectedDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedDetails.name} Package
                  </h2>
                  <p className="text-3xl font-bold text-black mt-2">
                    {selectedDetails.price}
                  </p>
                </div>

                <p className="text-gray-600">{selectedDetails.description}</p>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Package Details:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{selectedDetails.pages}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{selectedDetails.timeToMarket}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{selectedDetails.postLaunchSupport}</span>
                    </li>
                    {selectedDetails.revisions && (
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{selectedDetails.revisions}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">All Features:</h3>
                  <ul className="space-y-2">
                    {selectedDetails.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handlePackageSelect(selectedDetails.id)
                      setSelectedDetails(null)
                    }}
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Select This Package
                  </button>
                  <button
                    onClick={() => setSelectedDetails(null)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
