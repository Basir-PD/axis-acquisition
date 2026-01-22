'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SafeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const SafeTextarea = React.forwardRef<HTMLTextAreaElement, SafeTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="p-[2px] rounded-lg transition duration-300 group/textarea border border-gray-200 dark:border-gray-700 focus-within:border-gray-400 dark:focus-within:border-gray-500">
        <textarea
          className={cn(
            `flex w-full border-none bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md px-3 py-2 text-sm
            placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-0
            disabled:cursor-not-allowed disabled:opacity-50
            min-h-[80px] resize-y transition duration-200`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

SafeTextarea.displayName = 'SafeTextarea'

export { SafeTextarea }
