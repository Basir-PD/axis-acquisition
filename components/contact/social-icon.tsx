import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react'
import type React from 'react'

type SocialPlatform = 'twitter' | 'facebook' | 'linkedin' | 'github'

interface SocialIconProps {
  platform: SocialPlatform
  href: string
  size?: number
  color?: string
}

const iconComponents: Record<SocialPlatform, React.ComponentType<any>> = {
  twitter: IconBrandTwitter,
  facebook: IconBrandFacebook,
  linkedin: IconBrandLinkedin,
  github: IconBrandInstagram,
}

export function SocialIcon({
  platform,
  href,
  size = 24,
  color = 'currentColor',
}: SocialIconProps) {
  const IconComponent = iconComponents[platform]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-gray-600 dark:hover:text-gray-300"
    >
      <IconComponent
        size={size}
        color={color}
        stroke={1.5}
        className="transition-colors duration-300"
      />
    </a>
  )
}

export function SocialIconGroup() {
  return (
    <div className="flex space-x-4 flex-col justify-center items-center mb-3">
      <div className="flex space-x-4">
        <SocialIcon platform="twitter" href="https://twitter.com" />
        <SocialIcon platform="facebook" href="https://facebook.com" />
        <SocialIcon platform="linkedin" href="https://linkedin.com" />
        <SocialIcon platform="github" href="https://github.com" />
      </div>
    </div>
  )
}
