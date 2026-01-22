'use client'

import React from 'react'
import { Heading } from './heading'
import { Subheading } from '../subheading'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
  containerClassName?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SectionHeader({
  title,
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  containerClassName = '',
  size = 'md',
}: SectionHeaderProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          title: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
          subtitle: 'text-sm md:text-base',
        }
      case 'md':
        return {
          title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
          subtitle: 'text-base md:text-lg',
        }
      case 'lg':
        return {
          title: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
          subtitle: 'text-base md:text-lg lg:text-xl',
        }
      default:
        return {
          title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
          subtitle: 'text-base md:text-lg',
        }
    }
  }

  const { title: titleSize, subtitle: subtitleSize } = getSizeClasses()

  return (
    <div className={`mb-8 md:mb-12 ${containerClassName}`}>
      <Heading
        as="h2"
        className={`${titleSize} font-black leading-[1.15] mb-4 text-gray-900 dark:text-white ${titleClassName}`}
      >
        {title}
      </Heading>
      {subtitle && (
        <Subheading
          className={`${subtitleSize} text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-3xl ${subtitleClassName}`}
        >
          {subtitle}
        </Subheading>
      )}
    </div>
  )
}
