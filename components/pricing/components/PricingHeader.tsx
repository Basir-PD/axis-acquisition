import { FormattedMessage } from 'react-intl'
import { Heading } from '@/components/shared/heading'

export function PricingHeader() {
  return (
    <div className="relative z-10 text-center">
      <Heading as="h1" size="main">
        <FormattedMessage id="pricing.title" />
      </Heading>
      <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-tight">
        <FormattedMessage
          id="pricing.subtitle"
          values={{
            br: <br />,
          }}
        />
      </p>
    </div>
  )
}
