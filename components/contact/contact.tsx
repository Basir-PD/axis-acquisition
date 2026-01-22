'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import 'react-phone-number-input/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { HoneypotField } from '@/components/ui/honeypot'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useConvexContactForm } from '@/hooks/use-convex-contact-form'
import { cn } from '@/lib/utils'

// ============================================================================
// FORM SCHEMA & TYPES
// ============================================================================

const createFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        'Name should only contain letters, spaces, hyphens and apostrophes',
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email')
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
    message: z
      .string()
      .min(1, 'Message is required')
      .min(10, 'Message must be at least 10 characters')
      .max(1000, 'Message must be less than 1000 characters'),
  })

type ContactFormData = {
  name: string
  email: string
  phoneNumber: string
  message: string
}

// ============================================================================
// SUCCESS STATE COMPONENT
// ============================================================================

function ContactFormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center mx-auto mb-8"
      >
        <Check className="w-7 h-7 text-white dark:text-stone-900" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4"
      >
        Message sent
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-stone-500 dark:text-stone-400 mb-10 max-w-sm mx-auto leading-relaxed"
      >
        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          Send another message
        </Button>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const labelStyles = cn(
  'text-sm font-medium',
  'text-stone-500 dark:text-stone-400',
)

// ============================================================================
// MAIN CONTACT FORM COMPONENT
// ============================================================================

export function ContactForm() {
  const [honeypot, setHoneypot] = useState<string>('')

  const formSchema = createFormSchema()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  })

  const { submitForm, isSubmitting, isSuccess, error, reset } =
    useConvexContactForm({
      source: 'contact-page',
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500))
      },
    })

  async function onSubmit(data: ContactFormData) {
    if (honeypot) {
      return
    }
    await submitForm(data)
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
    <div className="w-full">
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyles}>Name</FormLabel>
                <FormControl>
                  <Input
                    variant="minimal"
                    placeholder="Your full name"
                    autoComplete="name"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyles}>Email</FormLabel>
                <FormControl>
                  <Input
                    variant="minimal"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyles}>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="CA"
                    value={field.value}
                    onChange={(value) => field.onChange(value || '')}
                    className="phone-input-shadcn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyles}>
                  Tell us about your project
                </FormLabel>
                <FormControl>
                  <Textarea
                    variant="minimal"
                    placeholder="Describe your project, goals, and timeline..."
                    className="min-h-[140px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <HoneypotField value={honeypot} onChange={setHoneypot} />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className={cn(
                'w-full sm:w-auto',
                'px-10 py-6 h-auto',
                'text-base font-medium',
                'bg-stone-900 dark:bg-stone-100',
                'text-white dark:text-stone-900',
                'hover:bg-stone-800 dark:hover:bg-stone-200',
                'rounded-full',
                'transition-all duration-300',
                'shadow-none',
                'focus-visible:ring-stone-500',
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Send message
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
