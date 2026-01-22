'use client'

import { useRef } from 'react'
import ContactFormWrapper from '@/components/contact/ContactFormWrapper'
import { FAQs } from '@/components/faq/faqs'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Leaf,
  Shield,
  Award,
  Heart,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our patient care team',
    value: '(555) 123-4567',
    href: 'tel:+15551234567',
    accent: true,
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: "We'll respond within 24 hours",
    value: 'hello@axiswellness.com',
    href: 'mailto:hello@axiswellness.com',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Our wellness center',
    value: '123 Wellness Way, Suite 100\nSan Francisco, CA 94102',
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    description: 'When we are available',
    value: 'Mon-Fri: 8am-6pm\nSat: 9am-2pm',
  },
]

const trustBadges = [
  { icon: Shield, label: 'HIPAA Compliant' },
  { icon: Award, label: 'Board Certified' },
  { icon: Heart, label: '10,000+ Patients' },
]

export default function ContactPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-sage-950">
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200/30 dark:bg-sage-800/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/20 dark:bg-sky-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-sage-700 dark:text-sage-300 bg-sage-100 dark:bg-sage-800/50 rounded-full">
              <Calendar className="w-4 h-4" />
              Schedule Your Consultation
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-sage-900 dark:text-cream-50 leading-tight mb-6">
              Start Your{' '}
              <span className="text-sage-600 dark:text-sage-400">
                Healing Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Take the first step toward optimal health. Book your free discovery call
              and learn how integrative medicine can transform your wellbeing.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-stone-600 dark:text-stone-400"
                >
                  <badge.icon className="w-5 h-5 text-sage-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <ContactFormWrapper />
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Cards */}
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    item.accent
                      ? 'bg-sage-600 dark:bg-sage-700 text-white'
                      : 'bg-white dark:bg-sage-900/40 border border-sage-100 dark:border-sage-800 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                        item.accent
                          ? 'bg-white/20'
                          : 'bg-sage-100 dark:bg-sage-800'
                      }`}
                    >
                      <item.icon
                        className={`w-6 h-6 ${
                          item.accent
                            ? 'text-white'
                            : 'text-sage-600 dark:text-sage-400'
                        }`}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3
                        className={`font-semibold text-lg mb-1 ${
                          item.accent
                            ? 'text-white'
                            : 'text-sage-900 dark:text-cream-50'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm mb-2 ${
                          item.accent
                            ? 'text-sage-100'
                            : 'text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        {item.description}
                      </p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`inline-flex items-center gap-2 font-medium group ${
                            item.accent
                              ? 'text-white hover:text-sage-100'
                              : 'text-sage-700 dark:text-sage-300 hover:text-sage-600'
                          }`}
                        >
                          <span className="whitespace-pre-line">{item.value}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <p
                          className={`whitespace-pre-line font-medium ${
                            item.accent
                              ? 'text-white'
                              : 'text-sage-900 dark:text-cream-50'
                          }`}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Doctor Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="p-6 bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/60 dark:to-sage-800/40 rounded-2xl border border-sage-200 dark:border-sage-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white dark:ring-sage-800 shadow-lg">
                    <div className="w-full h-full bg-sage-300 dark:bg-sage-700 flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-sage-600 dark:text-sage-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage-900 dark:text-cream-50">
                      Dr. Sarah Chen, ND, LAc
                    </h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      Founder & Medical Director
                    </p>
                  </div>
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  &ldquo;I believe everyone deserves to understand the root cause of
                  their health concerns. Our team is dedicated to providing
                  personalized, integrative care that addresses your whole being.&rdquo;
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="p-6 bg-white dark:bg-sage-900/40 rounded-2xl border border-sage-100 dark:border-sage-800"
              >
                <h4 className="font-semibold text-sage-900 dark:text-cream-50 mb-4">
                  Quick Links
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Our Services', href: '/#services' },
                    { label: 'Pricing', href: '/#price' },
                    { label: 'About Us', href: '/about' },
                    { label: 'FAQs', href: '/faq' },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-sage-600 dark:hover:text-sage-300 transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-sage-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-sage-900 dark:text-cream-50 mb-4">
              Visit Our Wellness Center
            </h2>
            <p className="text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
              Located in the heart of San Francisco, our center offers a peaceful
              environment for your healing journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-sage-200 dark:border-sage-800"
          >
            {/* Placeholder for map - in production, use actual Google Maps or similar */}
            <div className="absolute inset-0 bg-sage-100 dark:bg-sage-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-sage-400 dark:text-sage-600 mx-auto mb-4" />
                <p className="text-sage-600 dark:text-sage-400 font-medium">
                  123 Wellness Way, Suite 100
                </p>
                <p className="text-sage-500 dark:text-sage-500">
                  San Francisco, CA 94102
                </p>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-full transition-colors"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQs hideCTA />
    </div>
  )
}
