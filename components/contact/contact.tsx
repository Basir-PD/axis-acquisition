'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import 'react-phone-number-input/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { HoneypotField } from '@/components/ui/honeypot'
import { SafeInput as Input } from '@/components/ui/safe-input'
import { SafeTextarea as Textarea } from '@/components/ui/safe-textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useConvexContactForm } from '@/hooks/use-convex-contact-form'

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
    package: z.string().min(1, 'Please select a service'),
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
  package: string
  message: string
}

const services = [
  { value: 'website', label: 'Website Development' },
  { value: 'ai-chatbot', label: 'AI Chatbot' },
  { value: 'voice-agent', label: 'Voice Agent' },
  { value: 'automation', label: 'Automation' },
  { value: 'full-package', label: 'Full Package' },
  { value: 'other', label: 'Other' },
]

function ContactFormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 text-center"
    >
      {/* Success indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-14 h-14 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center mx-auto mb-8"
      >
        <Check className="w-6 h-6 text-white dark:text-stone-900" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 mb-4"
      >
        Message sent
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-stone-500 dark:text-stone-400 mb-8 max-w-sm mx-auto"
      >
        Thank you for reaching out. We'll get back to you within 24 hours.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onReset}
        type="button"
        className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
      >
        Send another message
      </motion.button>
    </motion.div>
  )
}

export function ContactForm() {
  const [honeypot, setHoneypot] = useState<string>('')
  const [selectOpen, setSelectOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  const inputBaseStyles =
    'w-full bg-transparent border-0 border-b border-stone-200 dark:border-stone-800 rounded-none px-0 py-4 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:ring-0 focus:border-stone-900 dark:focus:border-stone-100 transition-colors'

  return (
    <div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        focusedField === 'name' || field.value
                          ? '-top-2 text-xs text-stone-400 dark:text-stone-500'
                          : 'top-4 text-base text-stone-400 dark:text-stone-600'
                      }`}
                    >
                      Name
                    </label>
                    <Input
                      {...field}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBaseStyles} ${
                        fieldState.error
                          ? 'border-red-400 dark:border-red-600'
                          : ''
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-2" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        focusedField === 'email' || field.value
                          ? '-top-2 text-xs text-stone-400 dark:text-stone-500'
                          : 'top-4 text-base text-stone-400 dark:text-stone-600'
                      }`}
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      {...field}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBaseStyles} ${
                        fieldState.error
                          ? 'border-red-400 dark:border-red-600'
                          : ''
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-2" />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <div className="relative">
                    <label className="absolute left-0 -top-2 text-xs text-stone-400 dark:text-stone-500 pointer-events-none">
                      Phone
                    </label>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="CA"
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      className={`phone-input-minimal ${
                        fieldState.error
                          ? 'border-red-400 dark:border-red-600'
                          : ''
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-2" />
              </FormItem>
            )}
          />

          {/* Service Select */}
          <FormField
            control={form.control}
            name="package"
            render={({ field, fieldState }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <div className="relative">
                    <label className="absolute left-0 -top-2 text-xs text-stone-400 dark:text-stone-500 pointer-events-none z-10">
                      Service
                    </label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      open={selectOpen}
                      onOpenChange={setSelectOpen}
                    >
                      <SelectTrigger
                        className={`w-full bg-transparent border-0 border-b rounded-none px-0 py-4 text-base h-auto focus:ring-0 transition-colors ${
                          fieldState.error
                            ? 'border-red-400 dark:border-red-600'
                            : 'border-stone-200 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-100'
                        } ${field.value ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-lg">
                        {services.map((service) => (
                          <SelectItem
                            key={service.value}
                            value={service.value}
                            className="py-3 cursor-pointer text-stone-700 dark:text-stone-300 focus:bg-stone-50 dark:focus:bg-stone-800 focus:text-stone-900 dark:focus:text-stone-100"
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-2" />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-200 pointer-events-none ${
                        focusedField === 'message' || field.value
                          ? '-top-2 text-xs text-stone-400 dark:text-stone-500'
                          : 'top-4 text-base text-stone-400 dark:text-stone-600'
                      }`}
                    >
                      Tell us about your project
                    </label>
                    <Textarea
                      {...field}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-transparent border-0 border-b rounded-none px-0 py-4 text-base text-stone-900 dark:text-stone-100 focus:ring-0 transition-colors resize-none min-h-[120px] ${
                        fieldState.error
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-stone-200 dark:border-stone-800 focus:border-stone-900 dark:focus:border-stone-100'
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-2" />
              </FormItem>
            )}
          />

          <HoneypotField value={honeypot} onChange={setHoneypot} />

          {/* Submit Button */}
          <div className="pt-12">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ x: isSubmitting ? 0 : 4 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="group inline-flex items-center gap-3 text-base font-medium text-stone-900 dark:text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-stone-300 dark:border-stone-600 border-t-stone-900 dark:border-t-stone-100 rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </Form>
    </div>
  )
}
