'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div className="p-[2px] w-full mr-1 rounded-lg transition duration-300 group/textarea">
        <textarea
          className={cn(
            `flex w-full border-none shadow-input rounded-md px-3 py-2 text-sm focus:outline-none transition duration-400 min-h-[80px] resize-y`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
