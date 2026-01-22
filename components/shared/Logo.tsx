import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'icon'
  className?: string
}

export const Logo = ({ variant = 'full', className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`flex items-center relative z-20 ${className || ''}`}
    >
      {variant === 'full' ? (
        <Image
          src="/images/logo.svg"
          alt="Axis Acquisition"
          width={160}
          height={48}
          className="dark:brightness-110"
          priority
        />
      ) : (
        <Image
          src="/images/logo-icon.svg"
          alt="Axis Acquisition"
          width={40}
          height={40}
          className="dark:brightness-110"
          priority
        />
      )}
    </Link>
  )
}
