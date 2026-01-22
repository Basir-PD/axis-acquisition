'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import ContactFormWrapper from '@/components/contact/ContactFormWrapper'
import { FAQs } from '@/components/faq/faqs'

const contactMethods = [
  {
    icon: Phone,
    value: '+1 514 775 6790',
    href: 'tel:+15147756790',
  },
  {
    icon: Mail,
    value: 'info@axisacquisition.com',
    href: 'mailto:info@axisacquisition.com',
  },
]

export default function ContactPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-50px' })

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-[#0a0d0a]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-sage-900 dark:text-cream-50 leading-[1.1] tracking-tight mb-6"
          >
            Let&apos;s build{' '}
            <span className="relative inline-block">
              <span className="relative z-10">something</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isHeroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-sage-200 dark:bg-sage-800 -z-0 origin-left"
              />
            </span>{' '}
            <span className="text-sage-500 dark:text-sage-400">
              remarkable.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-xl mx-auto mb-8"
          >
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </motion.p>

          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {contactMethods.map((method) => (
              <Link
                key={method.value}
                href={method.href}
                className="group inline-flex items-center gap-3 px-5 py-3 bg-white dark:bg-sage-950/50 rounded-full border border-sage-100 dark:border-sage-800/50 hover:border-sage-300 dark:hover:border-sage-700 transition-all"
              >
                <method.icon className="w-4 h-4 text-sage-500" />
                <span className="text-sage-900 dark:text-cream-50 font-medium">
                  {method.value}
                </span>
                <ArrowUpRight className="w-4 h-4 text-sage-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <ContactFormWrapper />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQs hideCTA />
    </div>
  )
}
