'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'

const benefits = [
  'Done-for-you patient acquisition',
  'Exclusive to integrative health',
  'Results in 30 days or less',
]

const trustedLogos = [
  'Functional Medicine',
  'Naturopathic',
  'Holistic Health',
  'Integrative Care',
  'Wellness Centers',
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-50 via-white to-cream-50 dark:from-[#0c0f0c] dark:via-[#0e110e] dark:to-[#0c0f0c]" />

      {/* Subtle accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sage-100/50 dark:bg-sage-900/20 rounded-full blur-[120px] -translate-y-1/2" />

      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28"
      >
        {/* Main Content - Centered */}
        <div className="text-center max-w-4xl mx-auto">

          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-sage-900/50 rounded-full border border-sage-200 dark:border-sage-800/50 shadow-sm"
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-sage-700 dark:text-sage-300">
              Trusted by 50+ integrative clinics
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-sage-900 dark:text-cream-50 leading-[1.1] tracking-tight"
          >
            Get more patients.
            <br />
            <span className="text-sage-600 dark:text-sage-400">Guaranteed.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed"
          >
            The only marketing agency built exclusively for functional medicine
            and integrative health practices. We fill your calendar — you focus on healing.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-5 h-5 text-sage-500 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-full transition-all duration-300 shadow-lg shadow-sage-600/20 hover:shadow-xl hover:shadow-sage-600/30 hover:-translate-y-0.5"
            >
              Get Your Free Growth Plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-sage-700 dark:text-sage-300 hover:text-sage-800 dark:hover:text-sage-200 transition-colors"
            >
              See how it works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-sm text-stone-500 dark:text-stone-500"
          >
            Free strategy session · No contracts · Cancel anytime
          </motion.p>
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-sage-200/50 dark:border-sage-800/30"
        >
          <p className="text-center text-sm font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-8">
            Trusted by clinics specializing in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
            {trustedLogos.map((logo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                className="text-stone-400 dark:text-stone-600 font-medium text-sm md:text-base"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'Clinics Scaled' },
            { value: '3x', label: 'Avg. Patient Growth' },
            { value: '30 Days', label: 'To See Results' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-sage-700 dark:text-sage-400">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-stone-500 dark:text-stone-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-sage-300 dark:border-sage-700 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-sage-400 dark:bg-sage-600"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
