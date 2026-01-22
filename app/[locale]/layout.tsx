import type { Metadata } from 'next'
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/lib/utils'
// import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/context/theme-provider'
import ClientIntlProvider from '@/components/providers/ClientIntlProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProjectProvider } from '@/contexts/ProjectContext'

import '../embla.css'
import { ConditionalFooter } from '@/components/layout/ConditionalFooter'
import CookieConsent from '@/components/shared/CookieConsent'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'
import MetaPixel from '@/components/shared/MetaPixel'
import { ContactPreloader } from '@/components/shared/ContactPreloader'
import { Analytics } from '@vercel/analytics/next'
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar'
import { Toaster } from '@/components/ui/sonner'
export const metadata: Metadata = {
  title: 'Axis Acquisition',
  description:
    'Axis Acquisition is a platform that provides a wide range of AI tools and services to help you stay on top of your business. Generate images, text and everything else that you need to get your business off the ground.',
  openGraph: {
    images: [''],
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }> | { locale: string }
}>) {
  // Await params if it's a promise (Next.js 15+ behavior)
  const resolvedParams = await Promise.resolve(params)
  const locale = resolvedParams.locale || 'en'

  // Function to flatten nested messages for react-intl
  const flattenMessages = (
    nestedMessages: any,
    prefix = '',
  ): Record<string, string> => {
    const flattened: Record<string, string> = {}

    Object.keys(nestedMessages).forEach((key) => {
      const value = nestedMessages[key]
      const newKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, flattenMessages(value, newKey))
      } else {
        flattened[newKey] = value
      }
    })

    return flattened
  }

  // Load translation messages
  let messages = {}
  try {
    const rawMessages = (await import(`@/locales/${locale}.json`)).default
    messages = flattenMessages(rawMessages)
  } catch (error) {
    // Failed to load messages for locale, falling back to English
    const rawMessages = (await import('@/locales/en.json')).default
    messages = flattenMessages(rawMessages)
  }

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="prefetch" href="/contact" as="document" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="modulepreload"
          href="/_next/static/chunks/app/[locale]/(home)/contact/page.js"
        />
      </head>
      <body
        className={cn(
          GeistSans.className,
          'bg-white  dark:bg-neutral-900 antialiased h-full w-full',
        )}
      >
        <ClientIntlProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="light"
          >
            <AuthProvider>
              <ProjectProvider>
                <GoogleAnalytics />
                <MetaPixel />
                <Analytics />
                <ContactPreloader />
                <ConditionalNavbar />
                <main>{children}</main>
                <footer>
                  <ConditionalFooter />
                </footer>
                <CookieConsent />
                <Toaster position="top-center" richColors />
              </ProjectProvider>
            </AuthProvider>
          </ThemeProvider>
        </ClientIntlProvider>
      </body>
    </html>
  )
}
