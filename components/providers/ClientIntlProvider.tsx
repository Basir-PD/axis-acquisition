'use client'

import type { ReactNode } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'

interface ClientIntlProviderProps {
  children: ReactNode
  locale: string
  messages: Record<string, string>
}

export default function ClientIntlProvider({
  children,
  locale,
  messages,
}: ClientIntlProviderProps) {
  // Normalize locale to ensure it's valid
  const normalizedLocale =
    locale === 'fr' ? 'fr-FR' : locale === 'en' ? 'en-US' : locale

  return (
    <ReactIntlProvider
      locale={normalizedLocale}
      messages={messages}
      defaultLocale="en-US"
    >
      {children}
    </ReactIntlProvider>
  )
}
