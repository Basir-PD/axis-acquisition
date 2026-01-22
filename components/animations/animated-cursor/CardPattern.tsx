import { useMotionTemplate, motion, MotionValue } from 'framer-motion'
import React from 'react'

type CardPatternProps = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  [key: string]: any
}

export function CardPattern({ mouseX, mouseY }: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-indigo-500 via-teal-500 opacity-0 transition duration-300 group-hover:opacity-10"
        style={style}
      />
    </div>
  )
}
