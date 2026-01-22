'use client'
import React from 'react'
import { FloatingDock } from './floating-dock'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
} from '@tabler/icons-react'

export function FloatingDockDemo() {
  const links = [
    {
      title: 'Facebook',
      icon: <IconBrandFacebook className="h-full w-full text-[#1877F2]" />,
      href: '#',
    },
    {
      title: 'Instagram',
      icon: <IconBrandInstagram className="h-full w-full text-[#dbad2f]" />,
      href: '#',
    },
    {
      title: 'Twitter',
      icon: <IconBrandTwitter className="h-full w-full text-[#1DA1F2]" />,
      href: '#',
    },
    {
      title: 'LinkedIn',
      icon: <IconBrandLinkedin className="h-full w-full text-[#0A66C2]" />,
      href: '#',
    },
  ]

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  )
}
