'use client'

import { motion } from 'framer-motion'
import { FormattedMessage } from 'react-intl'
import { CalButton } from '@/components/shared/CalButton'
import { Button } from '@/components/shared/button'
import { useState } from 'react'
import DynamicTypeForm from '@/components/hero/AIAutomationTypeForm/DynamicTypeForm'

interface CTASectionProps {
  variant?: 'discovery' | 'getStarted' | 'both'
  title?: string
  subtitle?: string
  titleKey?: string
  subtitleKey?: string
  className?: string
  background?: 'light' | 'dark' | 'transparent'
}

export function CTASection({
  variant = 'both',
  title,
  subtitle,
  titleKey,
  subtitleKey,
  className = '',
  background = 'transparent',
}: CTASectionProps) {
  const [isTypeFormOpen, setIsTypeFormOpen] = useState(false)

  const backgroundClasses = {
    light:
      'bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900',
    dark: 'bg-gray-900 dark:bg-black',
    transparent: 'bg-transparent',
  }

  return (
    <>
      <section
        className={`relative py-16 md:py-20 overflow-hidden ${backgroundClasses[background]} ${className}`}
      >
        {/* Decorative Background Elements */}
        {background === 'light' && variant === 'discovery' && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Title and Subtitle */}
          {(title || subtitle || titleKey || subtitleKey) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              {(title || titleKey) && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {titleKey ? (
                    <FormattedMessage
                      id={titleKey}
                      defaultMessage={title || 'Ready to Get Started?'}
                    />
                  ) : (
                    title
                  )}
                </h2>
              )}
              {(subtitle || subtitleKey) && (
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {subtitleKey ? (
                    <FormattedMessage
                      id={subtitleKey}
                      defaultMessage={
                        subtitle || "Let's work together to achieve your goals."
                      }
                    />
                  ) : (
                    subtitle
                  )}
                </p>
              )}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center"
          >
            {/* Get Started Button */}
            {(variant === 'getStarted' || variant === 'both') && (
              <Button
                onClick={() => setIsTypeFormOpen(true)}
                className="px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-semibold !bg-primary !hover:bg-primary-dark !text-white !opacity-100 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-lg"
              >
                <FormattedMessage
                  id="cta.getStarted"
                  defaultMessage="Start My Project"
                />
              </Button>
            )}

            {/* Discovery Call Button */}
            {(variant === 'discovery' || variant === 'both') && (
              <CalButton
                variant={variant === 'both' ? 'outline' : 'primary'}
                size="lg"
                className="px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-semibold bg-gradient-to-r from-primary via-primary to-gray-800 hover:from-gray-800 hover:to-primary shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              />
            )}
          </motion.div>

          {/* Subtle Call to Action Text */}
          {(variant === 'both' || variant === 'discovery') && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400"
            >
              <FormattedMessage
                id="cta.helpText"
                defaultMessage="Not sure which option is right for you? Book a quick call to discuss your needs."
              />
            </motion.p>
          )}
        </div>
      </section>

      {/* TypeForm Modal */}
      <DynamicTypeForm isOpen={isTypeFormOpen} setIsOpen={setIsTypeFormOpen} />
    </>
  )
}
