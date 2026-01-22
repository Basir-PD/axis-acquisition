'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SafeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SafeInput = React.forwardRef<HTMLInputElement, SafeInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="p-[2px] rounded-lg transition duration-300 group/input border border-gray-200 dark:border-gray-700 focus-within:border-gray-400 dark:focus-within:border-gray-500">
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded-md px-3 py-2 text-sm 
             file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
             dark:placeholder-text-neutral-600 
             focus-visible:outline-none focus-visible:ring-0 
             disabled:cursor-not-allowed disabled:opacity-50 
             transition duration-200`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
SafeInput.displayName = 'SafeInput'

export { SafeInput }
