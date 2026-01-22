'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/main-navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()

  // Don't show navbar on leads page or portal pages
  if (pathname?.includes('/leads') || pathname?.includes('/portal')) {
    return null
  }

  return (
    <header>
      <Navbar />
    </header>
  )
}
