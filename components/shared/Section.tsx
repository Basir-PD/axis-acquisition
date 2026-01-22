'use client'

import { motion } from 'framer-motion'
import useInView from '../animations/use-in-view'
import { ReactNode } from 'react'

interface ChildProps {
  children: ReactNode
}

const Section = ({ children }: ChildProps) => {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default Section
