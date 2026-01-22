/* eslint-disable */
import React, { createContext, useContext, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SelectContextProps {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined)

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  open,
  onOpenChange,
  children,
}) => {
  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, onOpenChange }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className,
}) => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('SelectTrigger must be used within a Select')
  }

  const { open, onOpenChange } = context

  return (
    <button
      type="button"
      className={`w-full flex justify-between items-center px-4 py-2 border rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-150 ${className}`}
      onClick={() => onOpenChange(!open)}
    >
      {children}
      <svg
        className={`w-4 h-4 ml-3 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
          open ? 'rotate-180' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder,
  className,
}) => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('SelectValue must be used within a Select')
  }

  const { value } = context

  return (
    <span className={`flex-1 text-left ${className}`}>
      {value ? (
        <span className="text-gray-900 dark:text-white">{value}</span>
      ) : (
        <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
      )}
    </span>
  )
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className,
}) => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('SelectContent must be used within a Select')
  }

  const { open, onOpenChange } = context

  const contentRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      if (open) {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          className={`absolute mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl backdrop-blur-sm z-50 overflow-hidden ${className}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('SelectItem must be used within a Select')
  }

  const { onValueChange, onOpenChange } = context

  const handleClick = () => {
    onValueChange(value)
    onOpenChange(false)
  }

  return (
    <div
      role="option"
      className={`cursor-pointer px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 border-l-2 border-transparent hover:border-primary/30 ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
