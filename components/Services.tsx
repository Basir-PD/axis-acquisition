'use client'

import { motion, useInView } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Globe,
  Megaphone,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const services = [
  {
    icon: Globe,
    title: 'Conversion Website Design',
    description:
      'High-converting, HIPAA-compliant websites built specifically for integrative health clinics. Designed to turn visitors into booked appointments.',
    highlights: ['Mobile-Optimized', 'SEO-Ready', 'Booking Integration'],
    color: 'sage',
  },
  {
    icon: Megaphone,
    title: 'Paid Patient Acquisition',
    description:
      'Targeted Facebook, Instagram, and Google ad campaigns that reach health-conscious patients actively searching for integrative care in your area.',
    highlights: ['Facebook & Instagram Ads', 'Google Ads', 'Retargeting'],
    color: 'sage',
  },
  {
    icon: Search,
    title: 'Local SEO & Google Maps',
    description:
      'Dominate local search results so patients find your clinic first. Optimize your Google Business Profile and build local authority.',
    highlights: [
      'Google Business Profile',
      'Local Citations',
      'Review Generation',
    ],
    color: 'sky',
  },
  {
    icon: BarChart3,
    title: 'Marketing Analytics & Reporting',
    description:
      'Know exactly where every patient comes from and what your true cost per acquisition is. Monthly reporting with actionable insights.',
    highlights: ['ROI Tracking', 'Call Tracking', 'Monthly Reports'],
    color: 'sage',
  },
  {
    icon: Calendar,
    title: 'Appointment Funnel Systems',
    description:
      'Automated booking funnels that capture leads 24/7, nurture them with email sequences, and fill your calendar with qualified patients.',
    highlights: ['Lead Capture Forms', 'Email Nurturing', 'Booking Automation'],
    color: 'sky',
  },
  {
    icon: Users,
    title: 'Patient Retention & Referrals',
    description:
      'Turn one-time patients into lifetime advocates. Automated follow-up systems, review requests, and referral programs that grow organically.',
    highlights: [
      'Automated Follow-ups',
      'Review Campaigns',
      'Referral Systems',
    ],
    color: 'sage',
  },
]

export const Services = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 lg:py-32 bg-cream-50 dark:bg-[#0c0f0c] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sage-100/50 via-transparent to-transparent dark:from-sage-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-sage-700 dark:text-sage-300 bg-sage-100 dark:bg-sage-800/50 rounded-full">
            Our Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-sage-900 dark:text-cream-50 leading-tight">
            Everything Your Clinic Needs to{' '}
            <span className="text-sage-600 dark:text-sage-400">
              Grow Online
            </span>
          </h2>
          <p className="mt-6 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            Full-service digital marketing built exclusively for integrative
            health practices. We handle the marketing so you can focus on
            patient care.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            Ready to fill your clinic with patients who value integrative care?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-full shadow-lg shadow-sage-500/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" />
            Get Your Free Growth Strategy
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: (typeof services)[0]
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  }

  const Icon = service.icon

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white dark:bg-[#141a14] rounded-2xl p-6 md:p-8 border border-sage-100 dark:border-sage-800/40 hover:border-sage-200 dark:hover:border-sage-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-sage-500/10 cursor-pointer"
      whileHover={{ y: -5 }}
    >
      {/* Icon Container */}
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
          service.color === 'sage'
            ? 'bg-sage-100 dark:bg-sage-800/70 text-sage-600 dark:text-sage-400'
            : 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400'
        } group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-sage-900 dark:text-cream-50 mb-3">
        {service.title}
      </h3>
      <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2">
        {service.highlights.map((highlight, idx) => (
          <span
            key={idx}
            className="text-xs font-medium px-3 py-1 rounded-full bg-cream-100 dark:bg-sage-800/30 text-stone-600 dark:text-stone-400"
          >
            {highlight}
          </span>
        ))}
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="w-5 h-5 text-sage-400" />
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 L100,60 Q100,100 60,100 Z"
            fill={service.color === 'sage' ? '#e6ede5' : '#e9f2f8'}
            className="dark:opacity-20"
          />
        </svg>
      </div>
    </motion.div>
  )
}

// Export a hidden classes hack for Tailwind to pick up dynamic classes
export const HiddenClassesHack = () => {
  return (
    <div className="hidden bg-sage-100 bg-sky-100 text-sage-600 text-sky-600 dark:bg-sage-800/70 dark:bg-sky-900/50 dark:text-sage-400 dark:text-sky-400"></div>
  )
}
