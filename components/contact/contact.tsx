'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Form } from '@/components/ui/form'
import { motion } from 'framer-motion'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { HoneypotField } from '@/components/ui/honeypot'
import { NameEmailFields } from './components/NameEmailFields'
import { PhonePackageFields } from './components/PhonePackageFields'
import { MessageField } from './components/MessageField'
import { SubmitButton } from './components/SubmitButton'
import { ContactFormSuccess } from './components/ContactFormSuccess'
import { Shield, Clock, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react'

const createFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(1, 'Please enter your name')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        'Name should only contain letters, spaces, hyphens and apostrophes',
      ),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address (e.g., john@example.com)')
      .toLowerCase()
      .trim(),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine((val) => {
        if (!val) return false
        try {
          return isValidPhoneNumber(val)
        } catch {
          return false
        }
      }, 'Please enter a valid phone number'),
    package: z
      .string()
      .min(1, 'Please select a service to help us understand your needs'),
    message: z
      .string()
      .min(1, 'Please tell us about your clinic and growth goals')
      .min(10, 'Message must be at least 10 characters')
      .max(1000, 'Message must be less than 1000 characters'),
  })

type ContactFormData = {
  name: string
  email: string
  phoneNumber: string
  package: string
  message: string
}

const trustIndicators = [
  { icon: Shield, text: 'HIPAA Compliant Marketing' },
  { icon: Clock, text: 'Response within 24 hrs' },
  { icon: TrendingUp, text: '312% Avg. ROI' },
]

const benefits = [
  'Free 30-minute growth strategy call',
  'Clinic marketing audit included',
  'Custom patient acquisition roadmap',
  'No obligation, no pressure',
]

export function ContactForm() {
  const [turnstileToken] = useState<string>('dummy-token')
  const [honeypot, setHoneypot] = useState<string>('')
  const [packageDropdownOpen, setPackageDropdownOpen] = useState<boolean>(false)

  const formSchema = createFormSchema()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      package: '',
      message: '',
    },
  })

  const { submitForm, isSubmitting, isSuccess, error, reset } =
    useFormSubmission({
      formType: 'contact',
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500))
      },
    })

  async function onSubmit(data: ContactFormData) {
    if (honeypot) {
      return
    }

    await submitForm({
      ...data,
      turnstileToken,
    })
  }

  const handleReset = () => {
    form.reset()
    reset()
    setHoneypot('')
  }

  if (isSuccess) {
    return <ContactFormSuccess onReset={handleReset} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white dark:bg-sage-900/40 rounded-3xl p-8 lg:p-12 shadow-xl border border-sage-100 dark:border-sage-800"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-sage-600 dark:text-sage-400" />
          <span className="text-sm font-medium text-sage-600 dark:text-sage-400 uppercase tracking-wide">
            Free Strategy Session
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-900 dark:text-cream-50 mb-3">
          Let&apos;s Grow Your Clinic
        </h2>
        <p className="text-lg text-stone-600 dark:text-stone-300">
          Tell us about your practice and we&apos;ll show you how to attract more ideal patients.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-sage-100 dark:border-sage-800">
        {trustIndicators.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400"
          >
            <item.icon className="w-4 h-4 text-sage-500" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <NameEmailFields
            control={form.control}
            errors={form.formState.errors}
          />

          <PhonePackageFields
            control={form.control}
            packageDropdownOpen={packageDropdownOpen}
            setPackageDropdownOpen={setPackageDropdownOpen}
          />

          <MessageField control={form.control} />

          <HoneypotField value={honeypot} onChange={setHoneypot} />

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>

      {/* What to Expect */}
      <div className="mt-8 pt-8 border-t border-sage-100 dark:border-sage-800">
        <h4 className="font-semibold text-sage-900 dark:text-cream-50 mb-4">
          What You&apos;ll Get
        </h4>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
              <span className="text-stone-600 dark:text-stone-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
