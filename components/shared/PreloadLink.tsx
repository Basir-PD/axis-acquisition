'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ReactNode, useCallback, useEffect, useState } from 'react'

interface PreloadLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
}

export function PreloadLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
}: PreloadLinkProps) {
  const router = useRouter()
  const [isPrefetched, setIsPrefetched] = useState(false)

  const handleMouseEnter = useCallback(() => {
    if (!isPrefetched && prefetch) {
      router.prefetch(href)
      setIsPrefetched(true)
    }
  }, [href, isPrefetched, prefetch, router])

  // Prefetch on mount for critical routes
  useEffect(() => {
    if (href === '/contact' && prefetch) {
      router.prefetch(href)
      setIsPrefetched(true)
    }
  }, [href, prefetch, router])

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
