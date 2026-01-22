'use client'

import { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
  optional?: boolean
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, error, optional, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {optional && (
            <span className="ml-1 text-neutral-400 font-normal">
              (optional)
            </span>
          )}
          {props.required && !optional && (
            <span className="ml-0.5 text-red-500">*</span>
          )}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
          )}
          <input
            ref={ref}
            className={`
              w-full py-3 bg-neutral-50 dark:bg-neutral-800
              text-neutral-900 dark:text-neutral-100
              border border-neutral-200 dark:border-neutral-700
              rounded-xl transition-all duration-200
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${Icon ? 'pl-12 pr-4' : 'px-4'}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'

export default FormInput
