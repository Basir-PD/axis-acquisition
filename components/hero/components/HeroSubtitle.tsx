import { Subheading } from '@/components/subheading'
import { FormattedMessage } from 'react-intl'

export function HeroSubtitle() {
  return (
    <Subheading className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto relative mb-6 md:mb-8 lg:mb-10 leading-relaxed font-medium px-4 md:px-6">
      <FormattedMessage
        id="hero.subtitle.description"
        defaultMessage="We're a Canadian digital agency that builds AI-powered websites, voice assistants, chatbots, and automation systems — all designed to cut costs, save time, and eliminate repetitive and manual work from your business."
      />
    </Subheading>
  )
}
