'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { IpadCard } from './IpadCard'

interface FeedbackPosition {
  mobile: string
  desktop: string
  description: string
}

interface Testimonial {
  name: string
  feedback: string
  image: string
  position: FeedbackPosition
}

const Feedback = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'John Doe',
      feedback: 'I want to change this part',
      image: '/images/testimonial/boy1.jpg',
      position: {
        mobile: 'top-[8%] left-[5%]',
        desktop: 'top-[10%] left-[8%]',
        description: 'Top-left corner - First feedback comment',
      },
    },
    {
      name: 'Jane Smith',
      feedback: "Let's use another image here",
      image: '/images/testimonial/boy2.jpg',
      position: {
        mobile: 'top-[20%] right-[2%] -translate-y-1/2',
        desktop: 'top-[40%] right-[5%] -translate-y-1/2',
        description: 'Middle-right - Second feedback comment',
      },
    },
    {
      name: 'Blis Doe',
      feedback: 'Looks good to me!',
      image: '/images/testimonial/boy3.jpg',
      position: {
        mobile: 'top-[35%] left-12 -translate-x-1/2',
        desktop: 'top-[75%] left-1/2 -translate-x-1/2',
        description: 'Bottom-center - Final approval comment',
      },
    },
  ]

  // Move useInView outside of the map
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow multiple triggers
    threshold: 0.1, // Trigger when at least 10% is visible
  })

  return (
    <div>
      <IpadCard>
        <div className="relative">
          <Image
            title="Feedback & Revisions"
            src="/images/projectWalkthrough/brand.png"
            alt="Feedback & Revisions"
            width={1000}
            height={600}
            className="transition-all duration-500 rounded-xl  p-0 md:p-1 overflow-hidden"
            style={{
              filter: 'grayscale(100%)',
              transform: 'scale(1.05)',
            }}
          />
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={`feedback-${index}`}
              testimonial={testimonial}
              index={index}
              inView={inView}
              ref={index === 0 ? ref : null}
            />
          ))}
        </div>
      </IpadCard>
    </div>
  )
}

// Separate component for better code organization and reusability
interface FeedbackCardProps {
  testimonial: Testimonial
  index: number
  inView: boolean
}

const FeedbackCard = React.forwardRef<HTMLDivElement, FeedbackCardProps>(
  ({ testimonial, index, inView }, ref) => {
    const getPositionClasses = () => {
      const baseClasses =
        'absolute z-20 bg-purple-100 dark:bg-purple-900/90 rounded-lg shadow-lg flex items-start space-x-2 md:space-x-4 p-2 md:p-4 max-w-[160px] md:max-w-[200px]'
      const mobilePosition = testimonial.position.mobile
      const desktopPosition = testimonial.position.desktop

      // Combine mobile and desktop classes
      const responsivePosition = `${mobilePosition} md:${desktopPosition.replace(/^(top|bottom|left|right)-/, '$1-')}`

      return `${baseClasses} ${responsivePosition}`
    }

    return (
      <motion.div
        ref={ref}
        className={getPositionClasses()}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 0.9 }
        }
        transition={{
          duration: 0.6,
          delay: index * 0.3,
          ease: 'easeOut',
        }}
        title={testimonial.position.description}
      >
        <div className="flex-shrink-0">
          <Image
            src={testimonial.image}
            alt={`${testimonial.name} avatar`}
            width={28}
            height={28}
            className="rounded-full border-2 border-white shadow-sm"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[10px] md:text-xs text-gray-800 dark:text-gray-100 mb-1">
            {testimonial.name}
          </p>
          <p className="text-gray-700 dark:text-gray-200 text-[9px] md:text-xs leading-tight">
            {testimonial.feedback}
          </p>
        </div>
      </motion.div>
    )
  },
)

FeedbackCard.displayName = 'FeedbackCard'

export default Feedback
