'use client'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'minimal'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    const radius = 100
    const [visible, setVisible] = React.useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    // Minimal variant - simple input without wrapper effects
    if (variant === 'minimal') {
      return (
        <input
          type={type}
          className={cn(
            'flex h-10 w-full bg-transparent text-neutral-900 dark:text-neutral-100',
            'border-0 border-b border-stone-200 dark:border-stone-800 rounded-none px-0 py-2 text-sm',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            'focus-visible:outline-none focus-visible:ring-0',
            'focus:border-stone-900 dark:focus:border-stone-100',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

    // Default variant - with gradient hover effect
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-input rounded-md px-3 py-2 text-sm
             file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
             dark:placeholder:text-neutral-500
             focus-visible:outline-none focus-visible:ring-0
             disabled:cursor-not-allowed disabled:opacity-50
             dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
             group-hover/input:shadow-none transition duration-400`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
