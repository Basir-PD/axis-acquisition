'use client'

import { useState, forwardRef } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleVisibility = () => setShowPassword((prev) => !prev)

    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`
              w-full py-3 pl-12 pr-12 bg-neutral-50 dark:bg-neutral-800
              text-neutral-900 dark:text-neutral-100
              border border-neutral-200 dark:border-neutral-700
              rounded-xl transition-all duration-200
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
