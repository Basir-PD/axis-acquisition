'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import EmblaCarousel from '../Slideshow/image-slider'

const SLIDE_IMAGES = [
  '/images/projects/hero/project-1.png',
  '/images/projects/hero/project-6.png',
  '/images/projects/hero/project-2.png',
  '/images/projects/hero/project-3.jpg',
  '/images/projects/hero/project-7.png',
  '/images/projects/hero/project-4.png',
  '/images/projects/hero/project-5.png',
]

export const HeroImageSlider = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1,
      }}
      ref={ref}
      className="relative mx-auto max-w-5xl rounded-[16px] md:rounded-[32px] h-[20rem] md:h-[40rem] w-full border border-neutral-200/50 bg-neutral-100 p-1 md:p-2 lg:p-4 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-800/50 overflow-hidden"
    >
      <div className="rounded-[12px] md:rounded-[24px] h-[19.5rem] md:h-[38.5rem] lg:h-[38rem] border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black">
        <EmblaCarousel slides={SLIDE_IMAGES} />
      </div>
    </motion.div>
  )
})

HeroImageSlider.displayName = 'HeroImageSlider'
