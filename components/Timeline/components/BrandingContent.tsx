'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { IpadCard } from './IpadCard'

export function BrandingContent() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <IpadCard>
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, y: 0 }}
        animate={
          inView ? { scale: 1.1, y: [0, '-90%', 0] } : { scale: 1.1, y: 0 }
        }
        transition={{
          duration: 20,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <Image
          alt="Branding & Content"
          src="/images/projectWalkthrough/Homepage.jpg"
          width={800}
          height={800}
          className="rounded-lg w-full"
        />
      </motion.div>
    </IpadCard>
  )
}
