'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import 'react-phone-number-input/style.css'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Mail,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react'
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
import { ContactFormSuccess } from './components/ContactFormSuccess'

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
      .email('Please enter a valid email address')
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
      .min(1, 'Please tell us about your project')
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

export function ContactForm() {
  const [honeypot, setHoneypot] = useState<string>('')
  const [selectOpen, setSelectOpen] = useState(false)

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white dark:bg-sage-950/60 rounded-2xl shadow-2xl shadow-sage-900/5 dark:shadow-black/20 border border-sage-100 dark:border-sage-800/50 overflow-hidden"
    >
      {/* Form Header */}
      <div className="px-8 pt-8 pb-6 border-b border-sage-100 dark:border-sage-800/50 bg-gradient-to-b from-sage-50/50 to-transparent dark:from-sage-900/30">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-sage-900 dark:text-cream-50 mb-2">
          Start your project
        </h2>
        <p className="text-stone-500 dark:text-stone-400">
          Fill out the form and we&apos;ll respond within 24 hours
        </p>
      </div>

      <div className="p-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Contact Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-300 text-xs font-semibold">
                  1
                </span>
                <span className="text-sm font-medium text-sage-700 dark:text-sage-300 uppercase tracking-wide">
                  Contact Info
                </span>
                <div className="flex-1 h-px bg-sage-100 dark:bg-sage-800" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <User
                              className={`w-5 h-5 transition-colors ${
                                fieldState.error
                                  ? 'text-red-400'
                                  : field.value
                                    ? 'text-sage-500'
                                    : 'text-stone-300 dark:text-stone-600 group-focus-within:text-sage-500'
                              }`}
                            />
                          </div>
                          <Input
                            placeholder="Full name"
                            {...field}
                            className={`h-14 pl-12 pr-4 text-base bg-cream-50/50 dark:bg-sage-900/40 border-2 rounded-xl transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 ${
                              fieldState.error
                                ? 'border-red-300 dark:border-red-700 focus:border-red-400'
                                : 'border-sage-100 dark:border-sage-800 focus:border-sage-400 dark:focus:border-sage-600'
                            } focus:ring-0 focus:bg-white dark:focus:bg-sage-900/60`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1.5 ml-1" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Mail
                              className={`w-5 h-5 transition-colors ${
                                fieldState.error
                                  ? 'text-red-400'
                                  : field.value
                                    ? 'text-sage-500'
                                    : 'text-stone-300 dark:text-stone-600 group-focus-within:text-sage-500'
                              }`}
                            />
                          </div>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...field}
                            className={`h-14 pl-12 pr-4 text-base bg-cream-50/50 dark:bg-sage-900/40 border-2 rounded-xl transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 ${
                              fieldState.error
                                ? 'border-red-300 dark:border-red-700 focus:border-red-400'
                                : 'border-sage-100 dark:border-sage-800 focus:border-sage-400 dark:focus:border-sage-600'
                            } focus:ring-0 focus:bg-white dark:focus:bg-sage-900/60`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1.5 ml-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Field - Full Width */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                          <Phone
                            className={`w-5 h-5 transition-colors ${
                              fieldState.error
                                ? 'text-red-400'
                                : field.value
                                  ? 'text-sage-500'
                                  : 'text-stone-300 dark:text-stone-600 group-focus-within:text-sage-500'
                            }`}
                          />
                        </div>
                        <PhoneInput
                          international
                          countryCallingCodeEditable={false}
                          defaultCountry="CA"
                          value={field.value}
                          onChange={(value) => field.onChange(value || '')}
                          placeholder="Phone number"
                          className={`phone-input-custom h-14 pl-12 text-base bg-cream-50/50 dark:bg-sage-900/40 border-2 rounded-xl transition-all ${
                            fieldState.error
                              ? 'border-red-300 dark:border-red-700'
                              : 'border-sage-100 dark:border-sage-800 focus-within:border-sage-400 dark:focus-within:border-sage-600'
                          } focus-within:bg-white dark:focus-within:bg-sage-900/60`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1.5 ml-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 2: Project Details */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-300 text-xs font-semibold">
                  2
                </span>
                <span className="text-sm font-medium text-sage-700 dark:text-sage-300 uppercase tracking-wide">
                  Project Details
                </span>
                <div className="flex-1 h-px bg-sage-100 dark:bg-sage-800" />
              </div>

              {/* Service Select */}
              <FormField
                control={form.control}
                name="package"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                          <Briefcase
                            className={`w-5 h-5 transition-colors ${
                              fieldState.error
                                ? 'text-red-400'
                                : field.value
                                  ? 'text-sage-500'
                                  : 'text-stone-300 dark:text-stone-600'
                            }`}
                          />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          open={selectOpen}
                          onOpenChange={setSelectOpen}
                        >
                          <SelectTrigger
                            className={`h-14 pl-12 pr-4 text-base bg-cream-50/50 dark:bg-sage-900/40 border-2 rounded-xl transition-all ${
                              fieldState.error
                                ? 'border-red-300 dark:border-red-700'
                                : 'border-sage-100 dark:border-sage-800 focus:border-sage-400 dark:focus:border-sage-600'
                            } focus:ring-0 [&>span]:text-left`}
                          >
                            <SelectValue
                              placeholder="What do you need?"
                              className="text-stone-400"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-sage-900 border-sage-200 dark:border-sage-700 rounded-xl shadow-xl">
                            {services.map((service) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                                className="py-3 cursor-pointer focus:bg-sage-50 dark:focus:bg-sage-800"
                              >
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1.5 ml-1" />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-4 pointer-events-none">
                          <MessageSquare
                            className={`w-5 h-5 transition-colors ${
                              fieldState.error
                                ? 'text-red-400'
                                : field.value
                                  ? 'text-sage-500'
                                  : 'text-stone-300 dark:text-stone-600 group-focus-within:text-sage-500'
                            }`}
                          />
                        </div>
                        <Textarea
                          placeholder="Tell us about your project..."
                          {...field}
                          className={`min-h-[140px] pl-12 pr-4 pt-4 text-base bg-cream-50/50 dark:bg-sage-900/40 border-2 rounded-xl transition-all resize-none placeholder:text-stone-400 dark:placeholder:text-stone-500 ${
                            fieldState.error
                              ? 'border-red-300 dark:border-red-700 focus:border-red-400'
                              : 'border-sage-100 dark:border-sage-800 focus:border-sage-400 dark:focus:border-sage-600'
                          } focus:ring-0 focus:bg-white dark:focus:bg-sage-900/60`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1.5 ml-1" />
                  </FormItem>
                )}
              />
            </div>

            <HoneypotField value={honeypot} onChange={setHoneypot} />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              className="w-full h-14 bg-sage-600 hover:bg-sage-700 dark:bg-sage-600 dark:hover:bg-sage-500 text-white text-lg font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg shadow-sage-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </Form>
      </div>
    </motion.div>
  )
}
