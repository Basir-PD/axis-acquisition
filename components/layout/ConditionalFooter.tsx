'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/footer/footer'

export function ConditionalFooter() {
  const pathname = usePathname()

  // Don't show footer on leads page or portal pages
  if (pathname?.includes('/leads') || pathname?.includes('/portal')) {
    return null
  }

  return <Footer />
}
