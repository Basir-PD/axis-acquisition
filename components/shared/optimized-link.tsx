'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { MouseEvent, ReactNode } from 'react'

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
}

export default function OptimizedLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
}: OptimizedLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick()
    router.push(href)
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
