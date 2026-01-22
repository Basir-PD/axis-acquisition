/* eslint-disable */

'use client'
import React from 'react'
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
  variant?: any
  type?: 'button' | 'submit' | 'reset'
} & (
  | React.ComponentPropsWithoutRef<'a'>
  | React.ComponentPropsWithoutRef<'button'>
  | any
)) => {
  const baseStyles =
    'box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none'

  const variantStyles = {
    primary: '',
    secondary: 'bg-transparent text-indigo-600 ring-indigo-600',
    dark: 'bg-black',
    gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
  }

  const ButtonComponent = href ? 'a' : Tag

  return (
    <ButtonComponent
      href={href}
      type={type || (ButtonComponent === 'button' ? 'button' : undefined)}
      className={cn(
        baseStyles,
        variantStyles[variant as keyof typeof variantStyles],
        className,
      )}
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
