'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  Megaphone,
  BarChart3,
  Calendar,
  MessageSquare,
  Zap,
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
} from 'lucide-react'

const includedServices = [
  {
    icon: Globe,
    title: 'Custom Website',
    description: 'High-converting site built for integrative health',
  },
  {
    icon: Megaphone,
    title: 'Paid Advertising',
    description: 'Google & Meta ads targeting your ideal patients',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Know exactly where every patient comes from',
  },
  {
    icon: Calendar,
    title: 'Booking Funnels',
    description: 'Automated systems that fill your calendar',
  },
  {
    icon: MessageSquare,
    title: 'Lead Nurturing',
    description: 'Email sequences that convert leads to patients',
  },
  {
    icon: Zap,
    title: 'Ongoing Optimization',
    description: 'Continuous improvement for better ROI',
  },
]

const results = [
  { value: '3-5x', label: 'Average ROI', icon: TrendingUp },
  { value: '47%', label: 'More Patients', icon: Users },
  { value: '30', label: 'Days to Results', icon: Target },
]

const testimonial = {
  quote: "We went from struggling to fill appointments to having a 3-week waitlist. Axis didn't just run ads — they built us a complete patient acquisition system.",
  author: 'Dr. Sarah Chen',
  role: 'Integrative Wellness Center',
  result: '312% increase in new patients',
}

export default function Pricing() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="price"
      className="relative py-20 md:py-32 overflow-hidden bg-sage-900 dark:bg-[#0a0c0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sage-800/50 dark:bg-sage-800/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sage-700/30 dark:bg-sage-900/30 rounded-full blur-[100px] translate-y-1/2" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={containerRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-sage-300 bg-sage-800/50 rounded-full border border-sage-700/50">
            Your Growth System
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
            Everything you need to{' '}
            <span className="text-sage-400">fill your clinic</span>
          </h2>
          <p className="text-lg md:text-xl text-sage-300 leading-relaxed">
            A complete patient acquisition system tailored to your clinic.
            No cookie-cutter packages — just results.
          </p>
        </motion.div>

        {/* Results Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {results.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-sage-800/50 border border-sage-700/50">
                <stat.icon className="w-6 h-6 text-sage-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-sage-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* What's Included Grid */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-center text-lg font-medium text-sage-400 mb-8">
            What&apos;s included in your custom growth plan
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {includedServices.map((service, idx) => (
              <motion.div
                key={idx}
                className="group relative p-6 rounded-2xl bg-sage-800/30 border border-sage-700/30 hover:bg-sage-800/50 hover:border-sage-600/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-700/50 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-sage-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{service.title}</h4>
                    <p className="text-sm text-sage-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-4 -left-4 text-6xl text-sage-700/50 font-serif">&ldquo;</div>
            <div className="relative bg-sage-800/20 border border-sage-700/30 rounded-3xl p-8 md:p-10">
              <p className="text-lg md:text-xl text-sage-200 leading-relaxed mb-6 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sage-700/50" />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-sage-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sage-700/30 border border-sage-600/30">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{testimonial.result}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to fill your clinic with patients?
            </h3>
            <p className="text-sage-300">
              Book a free strategy call. We&apos;ll analyze your clinic, your competition,
              and show you exactly how we&apos;d grow your practice.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-sage-900 bg-white hover:bg-sage-50 rounded-full transition-all duration-300 shadow-lg shadow-black/20 hover:-translate-y-0.5"
            >
              Get Your Custom Growth Plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-sage-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              Free 30-min strategy call
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              No obligation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              Custom proposal
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
