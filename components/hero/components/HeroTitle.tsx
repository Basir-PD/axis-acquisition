'use client'

import { Heading } from '@/components/shared/heading'
import { TypingAnimation } from './TypingAnimation'
import { FormattedMessage } from 'react-intl'

const TYPING_WORDS = ['Conversions', 'Leads', 'Sales']

export function HeroTitle() {
  return (
    <Heading
      as="h1"
      size="main"
      className="!text-2xl xs:!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !font-black !leading-[1.05] sm:!leading-[1.1] mb-4 md:mb-6 lg:mb-8 text-center tracking-tight"
    >
      <span className="block text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 font-black leading-tight">
        <FormattedMessage
          id="hero.title.building"
          defaultMessage="Digital Solutions that"
        />
      </span>
      <span className="block text-center leading-tight">
        <span className="text-gray-900 dark:text-white font-black">
          <FormattedMessage
            id="hero.title.increase"
            defaultMessage="Drive More"
          />{' '}
        </span>
        <TypingAnimation words={TYPING_WORDS} />
      </span>
    </Heading>
  )
}
