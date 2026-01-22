// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <motion.div className="p-[2px] transition border-0 border-b-2 border-blue-200 duration-300 group/input">
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none
         
           `,
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
