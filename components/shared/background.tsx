'use client'
import { motion } from 'framer-motion'
import { useId } from 'react'
import { cn } from '@/lib/utils'

export const Background = () => {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
      <div className="absolute inset-0 h-full w-full light:bg-gray-50  dark:bg-glass-dark  pointer-events-none " />
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex" key={`grid-column${index}`}>
          {Array.from({ length: 10 }).map((_, index) => (
            <GridBlock key={`grid-row${index}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

const GridBlock = () => {
  return (
    <div className="flex flex-col items-start justify-center  w-60">
      <div className="flex items-center justify-center">
        <Dot />
        <SVG />
        {/* <Dot /> */}
      </div>
      <SVGVertical className="ml-3" />
    </div>
  )
}

const Dot = () => {
  return (
    <div className="h-6 w-6 bg-white/30 dark:bg-neutral-900/30 flex items-center justify-center rounded-full">
      <div className="h-2 w-2 bg-neutral-200/50 dark:bg-neutral-700/50 rounded-full" />
    </div>
  )
}

const SVGVertical = ({ className }: { className?: string }) => {
  const width = 1
  const height = 140

  const id = useId()
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-neutral-50/30 dark:text-neutral-800/30', className)}
    >
      <path d="M0.5 0.5V479" stroke="currentColor" strokeWidth={2} />
      <motion.path
        d="M0.5 0.5V479"
        stroke={`url(#gradient-${id})`}
        strokeWidth={2}
      />

      <defs>
        <motion.linearGradient
          id={`gradient-${id}`}
          initial={{ x1: 2, y1: -200, x2: 2, y2: -100 }}
          animate={{ x1: 2, y1: 400, x2: 2, y2: 600 }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 2 + 1,
            delay: Math.floor(Math.random() * 6) + 5,
          }}
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop offset="0%" stopColor="transparent" />
          <motion.stop offset="50%" stopColor="var(--neutral-200)" />
          <motion.stop offset="100%" stopColor="transparent" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  )
}

const SVG = ({ className }: { className?: string }) => {
  const width = 300
  const height = 1

  const id = useId()
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-neutral-100/30 dark:text-neutral-800/30', className)}
    >
      <path d="M0.5 0.5H479" stroke="currentColor" />
      <motion.path
        d="M0.5 0.5H479"
        stroke={`url(#gradient-${id})`}
        strokeWidth={1}
      />

      <defs>
        <motion.linearGradient
          id={`gradient-${id}`}
          initial={{ x1: -200, y1: 0, x2: -100, y2: 0 }}
          animate={{ x1: 400, y1: 0, x2: 600, y2: 0 }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 2 + 1,
            delay: Math.floor(Math.random() * 6) + 5,
          }}
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop offset="0%" stopColor="transparent" />
          <motion.stop offset="50%" stopColor="var(--neutral-200)" />
          <motion.stop offset="100%" stopColor="transparent" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  )
}

// Use the below rect to debug linear gradient
{
  /* <motion.rect width={width} height={width} fill={`url(#gradient-${id})`} /> */
}
