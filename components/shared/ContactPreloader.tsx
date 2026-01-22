'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ContactPreloader() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only preload if we're not already on the contact page
    if (!pathname.includes('/contact')) {
      // Prefetch contact page after a short delay to not interfere with initial page load
      const timer = setTimeout(() => {
        router.prefetch('/contact')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pathname, router])

  return null
}
