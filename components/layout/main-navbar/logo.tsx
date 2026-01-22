'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  visible?: boolean
}

export default function Logo({ visible = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      {/* Full Logo with text */}
      <Image
        src="/images/logo.svg"
        alt="Axis Acquisition"
        width={visible ? 140 : 160}
        height={visible ? 42 : 48}
        className="transition-all duration-300 dark:brightness-110"
        priority
      />
    </Link>
  )
}
