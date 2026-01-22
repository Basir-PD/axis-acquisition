'use client'

import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

declare global {
  interface Window {
    fbq: (..._args: any[]) => void
    _fbq: any
  }
}

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1870838450504762'

const MetaPixel = () => {
  const { canUseAnalytics, loading } = useCookieConsent()

  // Listen for consent changes to clear cookies immediately
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleConsentChange = () => {
      // If consent was withdrawn, revoke Meta Pixel consent
      if (!canUseAnalytics && !loading) {
        clearMetaPixelCookies()
        // Revoke consent in Meta Pixel
        if (window.fbq) {
          window.fbq('consent', 'revoke')
        }
      }
    }

    window.addEventListener('cookieConsentUpdate', handleConsentChange)
    window.addEventListener('cookieConsentCleared', handleConsentChange)

    return () => {
      window.removeEventListener('cookieConsentUpdate', handleConsentChange)
      window.removeEventListener('cookieConsentCleared', handleConsentChange)
    }
  }, [canUseAnalytics, loading])

  const clearMetaPixelCookies = () => {
    if (typeof window === 'undefined') return

    // Clear Meta/Facebook cookies
    const cookiesToClear = ['_fbp', '_fbc', 'fr', 'sb', 'datr', 'c_user', 'xs']
    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.facebook.com`
    })
  }

  useEffect(() => {
    // Don't load anything while consent is loading
    if (loading) return

    // If analytics is not consented, don't initialize Meta Pixel
    if (!canUseAnalytics) {
      // Clear any existing Meta Pixel cookies when consent is denied
      clearMetaPixelCookies()
      return
    }

    // If analytics is consented, enable Meta Pixel
    if (typeof window !== 'undefined') {
      // Initialize Meta Pixel
      if (!window.fbq) {
        const f = window
        const b = document
        const e = 'script'
        const v = 'https://connect.facebook.net/en_US/fbevents.js'

        const n: any = (f.fbq = function (...args: any[]) {
          n.callMethod ? n.callMethod(...args) : n.queue.push(args)
        })

        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = true
        n.version = '2.0'
        n.queue = []

        const t = b.createElement(e) as HTMLScriptElement
        t.async = true
        t.src = v
        const s = b.getElementsByTagName(e)[0]
        s.parentNode?.insertBefore(t, s)
      }

      // Grant consent
      window.fbq('consent', 'grant')

      // Initialize the pixel
      window.fbq('init', META_PIXEL_ID)

      // Track PageView
      window.fbq('track', 'PageView')
    }
  }, [canUseAnalytics, loading])

  // Don't render if no pixel ID is configured or if analytics is not consented
  if (!META_PIXEL_ID || loading || !canUseAnalytics) {
    return null
  }

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

export default MetaPixel

// Utility function to track standard events
export const trackMetaEvent = (
  eventName: string,
  parameters?: Record<string, any>,
) => {
  if (typeof window === 'undefined' || !window.fbq) return

  // Check consent before tracking
  const consent = localStorage.getItem('webapplica-cookie-consent')
  if (!consent) return

  try {
    const parsedConsent = JSON.parse(consent)
    if (!parsedConsent.settings?.analytics) return

    window.fbq('track', eventName, parameters)
  } catch (error) {
    // Error tracking Meta Pixel event
  }
}

// Utility function to track custom events
export const trackCustomMetaEvent = (
  eventName: string,
  parameters?: Record<string, any>,
) => {
  if (typeof window === 'undefined' || !window.fbq) return

  // Check consent before tracking
  const consent = localStorage.getItem('webapplica-cookie-consent')
  if (!consent) return

  try {
    const parsedConsent = JSON.parse(consent)
    if (!parsedConsent.settings?.analytics) return

    window.fbq('trackCustom', eventName, parameters)
  } catch (error) {
    // Error tracking custom Meta Pixel event
  }
}

// Standard event helpers for common conversions
export const trackMetaConversion = {
  // Track when a user views content
  viewContent: (parameters?: {
    content_name?: string
    content_category?: string
    value?: number
    currency?: string
  }) => {
    trackMetaEvent('ViewContent', parameters)
  },

  // Track when a user adds to cart
  addToCart: (parameters?: {
    content_name?: string
    content_ids?: string[]
    value?: number
    currency?: string
  }) => {
    trackMetaEvent('AddToCart', parameters)
  },

  // Track when a user initiates checkout
  initiateCheckout: (parameters?: {
    value?: number
    currency?: string
    num_items?: number
  }) => {
    trackMetaEvent('InitiateCheckout', parameters)
  },

  // Track when a purchase is completed
  purchase: (parameters: {
    value: number
    currency: string
    content_ids?: string[]
    content_type?: string
  }) => {
    trackMetaEvent('Purchase', parameters)
  },

  // Track when a user completes registration
  completeRegistration: (parameters?: {
    value?: number
    currency?: string
    status?: string
  }) => {
    trackMetaEvent('CompleteRegistration', parameters)
  },

  // Track when a user submits a lead form
  lead: (parameters?: {
    content_name?: string
    value?: number
    currency?: string
  }) => {
    trackMetaEvent('Lead', parameters)
  },

  // Track when a user adds payment info
  addPaymentInfo: (parameters?: { value?: number; currency?: string }) => {
    trackMetaEvent('AddPaymentInfo', parameters)
  },

  // Track when a user adds to wishlist
  addToWishlist: (parameters?: {
    content_name?: string
    value?: number
    currency?: string
  }) => {
    trackMetaEvent('AddToWishlist', parameters)
  },

  // Track when a user searches
  search: (parameters?: {
    search_string?: string
    value?: number
    currency?: string
  }) => {
    trackMetaEvent('Search', parameters)
  },

  // Track when a user contacts you
  contact: (parameters?: { value?: number; currency?: string }) => {
    trackMetaEvent('Contact', parameters)
  },
}
