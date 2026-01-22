'use client'

import { motion, useInView } from 'framer-motion'
import {
  Building2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Quote,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { cn } from '@/lib/utils'
import { Container } from '../hero/container'

interface Testimonial {
  name: string
  quote: string
  clinicName?: string
  location?: string
  results?: string
  metric?: string
  image?: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Dr. Sarah Mitchell',
    quote:
      'Before working with this team, we were struggling to get new patients. Our website was outdated and we had no digital presence. Within 6 months, we went from 15 new patients a month to over 60. They truly understand the integrative health space.',
    clinicName: 'Restore Wellness Center',
    location: 'Austin, TX',
    results: '300% increase in new patients',
    metric: '15 → 60 new patients/month',
    image: '/images/testimonial/girl1.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    quote:
      'I was skeptical about digital marketing after being burned by generic agencies. But these guys specialize in integrative medicine - they know our patients, our language, and what makes us unique. Our ROI has been incredible.',
    clinicName: 'Functional Health Institute',
    location: 'San Diego, CA',
    results: '420% return on ad spend',
    metric: '$4.20 return per $1 spent',
    image: '/images/testimonial/boy1.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Amanda Foster',
    quote:
      'The new website and booking system completely transformed our practice. Patients actually book online now instead of calling. My front desk staff can focus on patient care instead of playing phone tag.',
    clinicName: 'Vitality Integrative Medicine',
    location: 'Denver, CO',
    results: '85% online booking rate',
    metric: 'Phone calls reduced by 60%',
    image: '/images/testimonial/girl2.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Robert Kim',
    quote:
      "We went from invisible on Google to ranking #1 for 'functional medicine' in our area. The Local SEO work alone has brought us dozens of high-value patients who were actively searching for exactly what we offer.",
    clinicName: 'Optimal Health Partners',
    location: 'Seattle, WA',
    results: '#1 Google ranking achieved',
    metric: '45 organic leads/month',
    image: '/images/testimonial/boy2.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Jennifer Martinez',
    quote:
      "As a solo practitioner, I don't have time for marketing. They handle everything - the ads, the website updates, the patient follow-ups. My schedule is consistently full and I can focus on what I love: helping patients heal.",
    clinicName: 'Natural Balance Clinic',
    location: 'Portland, OR',
    results: 'Fully booked 3 weeks out',
    metric: 'From 40% to 95% capacity',
    image: '/images/testimonial/girl3.jpg',
    rating: 5,
  },
  {
    name: 'Dr. David Park',
    quote:
      "The patient acquisition campaigns are incredibly targeted. We're not getting tire-kickers - we're getting serious patients who already understand and value integrative medicine. Our average patient lifetime value has increased significantly.",
    clinicName: 'Integrative Healing Arts',
    location: 'Phoenix, AZ',
    results: '40% higher patient LTV',
    metric: 'Average LTV: $3,200 → $4,500',
    image: '/images/testimonial/boy3.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Lisa Thompson',
    quote:
      "We were throwing money at Facebook ads with no results. They restructured our entire campaign strategy, built proper funnels, and now we're getting qualified leads at half the cost. Wish we found them sooner.",
    clinicName: 'Thrive Wellness Center',
    location: 'Nashville, TN',
    results: '52% reduction in cost per lead',
    metric: '$85 → $41 per qualified lead',
    image: '/images/testimonial/girl4.jpg',
    rating: 5,
  },
  {
    name: 'Dr. James Wilson',
    quote:
      "Opening a second location was daunting, but their marketing system made it seamless. We replicated our success in the new market and hit profitability faster than our first clinic. They're true growth partners.",
    clinicName: 'Holistic Medicine Group',
    location: 'Atlanta, GA',
    results: 'Second location profitable in 4 months',
    metric: 'New location: 80+ patients/month',
    image: '/images/testimonial/boy4.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Rachel Adams',
    quote:
      "The monthly reporting is exceptional. I know exactly where every patient comes from, what our cost per acquisition is, and how our campaigns are performing. It's like having a marketing department without the overhead.",
    clinicName: 'Renew Integrative Health',
    location: 'Chicago, IL',
    results: 'Complete marketing visibility',
    metric: '100% attribution tracking',
    image: '/images/testimonial/girl5.jpg',
    rating: 5,
  },
  {
    name: 'Dr. Thomas Bradley',
    quote:
      "After 15 years in practice, I was ready to slow down. Instead, their marketing brought in so many patients that I hired two additional practitioners. Revenue is up 180% and we're helping more people than ever.",
    clinicName: 'Bradley Integrative Clinic',
    location: 'Boston, MA',
    results: '180% revenue increase',
    metric: 'Expanded from 1 to 3 practitioners',
    image: '/images/testimonial/boy5.jpg',
    rating: 5,
  },
]

const stats = [
  { value: '50+', label: 'Clinics Scaled', icon: Building2 },
  { value: '3x', label: 'Avg. Patient Increase', icon: Users },
  { value: '$2.4M', label: 'Revenue Generated', icon: TrendingUp },
  { value: '312%', label: 'Avg. Marketing ROI', icon: Star },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-4 h-4',
            i < rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-stone-300 dark:text-stone-600',
          )}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-sage-900/40 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl border border-sage-100 dark:border-sage-800 transition-all duration-300 h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-2 w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center shadow-md">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Clinic Badge */}
      {testimonial.clinicName && (
        <div className="mb-4 mt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-sage-100 dark:bg-sage-800/60 text-sage-700 dark:text-sage-300 rounded-full">
            <Building2 className="w-3 h-3" />
            {testimonial.clinicName}
          </span>
        </div>
      )}

      {/* Quote */}
      <blockquote className="flex-grow">
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Results Badge */}
      {testimonial.results && (
        <div className="mt-4 p-3 bg-gradient-to-r from-sage-50 to-sage-100 dark:from-sage-800/40 dark:to-sage-800/60 rounded-lg border border-sage-200 dark:border-sage-700">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            <span className="text-sm font-semibold text-sage-700 dark:text-sage-300">
              {testimonial.results}
            </span>
          </div>
          {testimonial.metric && (
            <p className="text-xs text-stone-500 dark:text-stone-400 ml-6">
              {testimonial.metric}
            </p>
          )}
        </div>
      )}

      {/* Author */}
      <div className="mt-6 pt-4 border-t border-sage-100 dark:border-sage-800 flex items-center gap-4">
        {testimonial.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-sage-200 dark:ring-sage-700">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-grow">
          <h4 className="font-semibold text-sage-900 dark:text-cream-50">
            {testimonial.name}
          </h4>
          {testimonial.location && (
            <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {testimonial.location}
            </p>
          )}
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </motion.figure>
  )
}

function FeaturedTestimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const featured = testimonials[0]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-sage-600 to-sage-700 dark:from-sage-700 dark:to-sage-800 rounded-3xl p-8 md:p-12 shadow-2xl mb-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="testimonial-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
          <rect fill="url(#testimonial-pattern)" width="100%" height="100%" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-xl">
            <Image
              src={featured.image || '/images/testimonial/girl1.jpg'}
              alt={featured.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow text-center lg:text-left">
          <Quote className="w-10 h-10 text-sage-200 mb-4 mx-auto lg:mx-0" />
          <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div>
              <h4 className="font-bold text-white text-lg">{featured.name}</h4>
              <p className="text-sage-200">
                {featured.clinicName} • {featured.location}
              </p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-sage-500" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Result Badge */}
          {featured.results && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <TrendingUp className="w-5 h-5 text-sage-200" />
              <span className="text-white font-semibold">
                {featured.results}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TestimonialGrid() {
  const [showAll, setShowAll] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  // Skip first testimonial since it's featured
  const remainingTestimonials = testimonials.slice(1)
  const displayedTestimonials = showAll
    ? remainingTestimonials
    : remainingTestimonials.slice(0, isMobile ? 3 : 6)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowAll(!showAll)

    if (showAll && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full">
      <div
        ref={gridRef}
        className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {displayedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>

      {remainingTestimonials.length > (isMobile ? 3 : 6) && (
        <div className="mt-10 text-center">
          <button
            onClick={handleToggle}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-sage-800 text-sage-700 dark:text-sage-200 font-semibold rounded-full shadow-lg hover:shadow-xl border border-sage-200 dark:border-sage-700 transition-all duration-300 group"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                Read More Success Stories
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="text-center p-6 bg-white dark:bg-sage-900/40 rounded-2xl shadow-md border border-sage-100 dark:border-sage-800"
        >
          <stat.icon className="w-8 h-8 text-sage-500 mx-auto mb-3" />
          <div className="text-3xl md:text-4xl font-bold text-sage-700 dark:text-sage-300 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-stone-600 dark:text-stone-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 bg-cream-50 dark:bg-sage-950 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sage-200/30 dark:bg-sage-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/20 dark:bg-sky-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-sage-700 dark:text-sage-300 bg-sage-100 dark:bg-sage-800/50 rounded-full">
            <Building2 className="w-4 h-4" />
            Client Success Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-sage-900 dark:text-cream-50 leading-tight mb-4">
            Clinics We&apos;ve Helped{' '}
            <span className="text-sage-600 dark:text-sage-400">Grow</span>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            Hear from integrative health practitioners who transformed their
            practices with our marketing systems
          </p>
        </motion.div>

        {/* Stats Bar */}
        <StatsBar />

        {/* Featured Testimonial */}
        <FeaturedTestimonial />

        {/* Testimonial Grid */}
        <TestimonialGrid />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white dark:bg-sage-900/60 rounded-2xl shadow-lg border border-sage-200 dark:border-sage-800">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-sage-900"
                >
                  <Image
                    src={t.image || '/images/testimonial/girl1.jpg'}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
                <span className="ml-1 text-sm font-semibold text-sage-700 dark:text-sage-300">
                  5.0/5
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Trusted by 50+ integrative health clinics nationwide
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
