'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, MessageSquare, Send, Loader2 } from 'lucide-react'
import { useIntl, FormattedMessage } from 'react-intl'
import { useFormSubmission } from '@/hooks/use-form-submission'
// import {
//   TurnstileWrapper,
//   TurnstileWrapperRef,
// } from '@/components/ui/turnstile'
import { HoneypotField } from '@/components/ui/honeypot'

interface ContactPopupProps {
  show: boolean
  onClose: () => void
}

export function ContactPopup({ show, onClose }: ContactPopupProps) {
  const intl = useIntl()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: intl.formatMessage({
      id: 'contact.form.quickContact',
      defaultMessage: 'Quick Contact',
    }),
  })
  // const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [turnstileToken] = useState<string>('dummy-token') // Temporarily bypassing Turnstile
  const [honeypot, setHoneypot] = useState<string>('')
  const [showCaptchaHint, setShowCaptchaHint] = useState(false)
  // const turnstileRef = useRef<TurnstileWrapperRef>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { submitForm, isSubmitting, isSuccess, error } = useFormSubmission({
    formType: 'quick-contact',
    onSuccess: () => {
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    },
  })

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      company: intl.formatMessage({
        id: 'contact.form.quickContact',
        defaultMessage: 'Quick Contact',
      }),
    })
    // setTurnstileToken('')
    setHoneypot('')
    // turnstileRef.current?.reset()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check spam protection - commented out for now
    // if (!turnstileToken) {
    //   setShowCaptchaHint(true)
    //   // Scroll to captcha if needed
    //   const captchaElement = formRef.current?.querySelector(
    //     '.turnstile-container',
    //   )
    //   captchaElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    //   return
    // }

    if (honeypot) {
      // Honeypot was filled - likely spam
      return
    }

    await submitForm({
      ...formData,
      turnstileToken,
    })
  }

  // Auto-hide captcha hint after token is received
  useEffect(() => {
    if (turnstileToken && showCaptchaHint) {
      setShowCaptchaHint(false)
    }
  }, [turnstileToken, showCaptchaHint])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-contact-popup
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 100 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-sage-900 rounded-2xl shadow-2xl border border-sage-200 dark:border-sage-800"
        >
          <div className="relative">
            {/* Clean header */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 p-5 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold">
                      <FormattedMessage
                        id="contact.form.quickContact"
                        defaultMessage="Quick Contact"
                      />
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                      <FormattedMessage
                        id="contact.responseTime"
                        defaultMessage="We typically respond within 2 hours"
                      />
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            <div className="p-5">
              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-neutral-900 dark:text-neutral-100" />
                  </div>
                  <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    <FormattedMessage
                      id="contact.success.title"
                      defaultMessage="Message sent successfully!"
                    />
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    <FormattedMessage
                      id="contact.success.message"
                      defaultMessage="We'll get back to you shortly."
                    />
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Form */}
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder={intl.formatMessage({
                        id: 'contact.form.namePlaceholder',
                        defaultMessage: 'Your name',
                      })}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder={intl.formatMessage({
                        id: 'contact.form.emailPlaceholder',
                        defaultMessage: 'your@email.com',
                      })}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    <textarea
                      name="message"
                      placeholder={intl.formatMessage({
                        id: 'contact.form.messagePlaceholder',
                        defaultMessage: 'Tell us about your project...',
                      })}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={3}
                      className="w-full px-4 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    {/* Honeypot field - hidden from users */}
                    <HoneypotField value={honeypot} onChange={setHoneypot} />

                    {/* Turnstile CAPTCHA with hint - commented out
                    <div className="relative">
                      {showCaptchaHint && !turnstileToken && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 left-0 right-0 z-10"
                        >
                          <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 border border-neutral-200 dark:border-neutral-700">
                            <span className="font-medium">
                              Please complete the verification below
                            </span>
                          </div>
                        </motion.div>
                      )}
                      <TurnstileWrapper
                        ref={turnstileRef}
                        onVerify={(token) => {
                          setTurnstileToken(token)
                          setShowCaptchaHint(false)
                        }}
                        onError={() => {
                          setTurnstileToken('')
                        }}
                        onExpire={() => {
                          setTurnstileToken('')
                        }}
                        size="compact"
                      />
                    </div>
                    */}

                    {error && (
                      <p className="text-xs text-red-500 text-center">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                      w-full py-3 px-4 text-sm font-medium rounded-xl transition-all
                      flex items-center justify-center gap-2 group
                      ${
                        isSubmitting
                          ? 'bg-sage-400 dark:bg-sage-600 text-white cursor-not-allowed'
                          : 'bg-sage-700 dark:bg-sage-600 text-white dark:text-white hover:bg-sage-800 dark:hover:bg-sage-500 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                      }
                    `}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <FormattedMessage
                            id="contact.form.submitting"
                            defaultMessage="Sending..."
                          />
                        </>
                      ) : (
                        <>
                          <FormattedMessage
                            id="contact.form.submit"
                            defaultMessage="Send message"
                          />
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Security check message - commented out
                    {!turnstileToken &&
                      formData.name &&
                      formData.email &&
                      formData.message && (
                        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 animate-pulse">
                          Complete the security check above to send
                        </p>
                      )}
                    */}
                  </form>

                  {/* Trust indicators */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-full animate-pulse"></span>
                        Online now
                      </span>
                      <span>•</span>
                      {/* <span>Secured by Cloudflare</span> */}
                      <span>Secure connection</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
