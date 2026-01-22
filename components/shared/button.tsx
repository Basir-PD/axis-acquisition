'use client'
import type React from 'react'
import { cn } from '@/lib/utils'
// import LinkTransition from 'next-view-transitions'

export const Button = ({
  href,
  as: Tag = 'button',
  children,
  className,
  variant = 'primary',
  type,
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
  type?: 'button' | 'submit' | 'reset'
} & (
  | React.ComponentPropsWithoutRef<'a'>
  | React.ComponentPropsWithoutRef<'button'>
)) => {
  // | typeof LinkTransition
  const baseStyles =
    'box-border relative z-30 inline-flex items-center justify-center w-auto px-4 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-primary rounded-md cursor-pointer group ring-offset-1 ring-1 ring-primary-300 ring-offset-primary-200 hover:ring-offset-primary-500 ease focus:outline-none'

  const variantStyles = {
    primary: '',
    secondary:
      'bg-transparent text-primary ring-primary hover:bg-primary hover:text-white',
    dark: 'bg-primary',
    gradient:
      'bg-gradient-to-r from-primary-800 to-primary-900 hover:from-primary-900 hover:to-primary',
  }

  const ButtonComponent = href ? 'a' : Tag

  return (
    <ButtonComponent
      href={href}
      type={type || (ButtonComponent === 'button' ? 'button' : undefined)}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="relative z-20 flex items-center justify-center text-center text-sm">
        {children}
      </span>
    </ButtonComponent>
  )
}
