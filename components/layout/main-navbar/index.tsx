'use client'

import { cn } from '@/lib/utils'
import { IconMenu2, IconX } from '@tabler/icons-react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { PreloadLink } from '@/components/shared/PreloadLink'
import LanguageChanger from '@/constants/LanguageChanger'
import ClientOnly from '@/components/ClientOnly'
import { ModeToggle } from '@/components/mode-toggle'
import Logo from './logo'
import { usePathname } from 'next/navigation'
import { Phone, Calendar } from 'lucide-react'

interface NavbarProps {
  navItems: {
    name: string
    link: string
    sectionId: string | null
  }[]
  visible: boolean
  activeSection: string
}

export const Navbar = () => {
  const pathname = usePathname()

  const getCurrentLocale = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    if (['en', 'fr'].includes(firstSegment)) {
      return firstSegment
    }
    return 'en'
  }

  const currentLocale = getCurrentLocale()
  const localePrefix = `/${currentLocale}`

  const navItems = [
    {
      name: 'Home',
      link: `${localePrefix}/`,
      sectionId: 'home',
    },
    {
      name: 'Services',
      link: `${localePrefix}/#services`,
      sectionId: 'services',
    },
    {
      name: 'Process',
      link: `${localePrefix}/#process`,
      sectionId: 'process',
    },
    {
      name: 'About',
      link: `${localePrefix}/about`,
      sectionId: 'about',
    },
    {
      name: 'FAQ',
      link: `${localePrefix}/faq`,
      sectionId: 'faq',
    },
    {
      name: 'Contact',
      link: `${localePrefix}/contact`,
      sectionId: 'contact',
    },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const [visible, setVisible] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('home')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  useEffect(() => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

    if (pathWithoutLocale.includes('/contact')) {
      setActiveSection('contact')
      return
    }
    if (pathWithoutLocale.includes('/faq')) {
      setActiveSection('faq')
      return
    }
    if (pathWithoutLocale.includes('/about')) {
      setActiveSection('about')
      return
    }

    if (pathWithoutLocale === '/' || pathWithoutLocale.includes('/#')) {
      const handleScroll = () => {
        const sections = navItems
          .filter(
            (item) =>
              item.sectionId &&
              !['contact', 'faq', 'about'].includes(item.sectionId),
          )
          .map((item) => ({
            id: item.sectionId,
            element: document.getElementById(item.sectionId!),
          }))
          .filter((section) => section.element)

        const scrollPosition = window.scrollY + 150

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          if (section.element && section.element.offsetTop <= scrollPosition) {
            setActiveSection(section.id!)
            break
          }
        }

        if (window.scrollY < 100) {
          setActiveSection('home')
        }
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll()

      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return (
    <div
      ref={ref}
      className={`w-full fixed top-0 inset-x-0 z-[9999] transition-all duration-300
        ${
          visible
            ? 'backdrop-blur-xl bg-cream-50/80 dark:bg-[#0c0f0c]/90 shadow-[0_1px_0_0_rgba(93,127,89,0.1)] dark:shadow-[0_1px_0_0_rgba(168,191,166,0.08)]'
            : 'backdrop-blur-md bg-cream-50/50 dark:bg-[#0c0f0c]/70'
        }
      `}
    >
      <div className="container mx-auto">
        <DesktopNav
          visible={visible}
          navItems={navItems}
          activeSection={activeSection}
        />
        <MobileNav
          visible={visible}
          navItems={navItems}
          activeSection={activeSection}
        />
      </div>
    </div>
  )
}

const DesktopNav = ({ navItems, activeSection, visible }: NavbarProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div
      onMouseLeave={() => {
        setHovered(null)
      }}
      className={cn(
        'hidden lg:flex flex-row self-start items-center justify-between px-6 relative z-[9998] w-full max-w-7xl mx-auto transition-all duration-300',
        visible ? 'py-2' : 'py-4',
      )}
    >
      <div className="flex items-center">
        <Logo visible={visible} />
        <div className="lg:flex flex-row ml-10 items-center space-x-1 text-sm font-medium">
          {navItems.map((navItem, idx) => {
            const isActive = navItem.sectionId === activeSection
            return (
              <div
                key={`link=${idx}`}
                onMouseEnter={() => setHovered(idx)}
                className="relative"
              >
                <PreloadLink
                  className={cn(
                    'relative px-4 py-2 transition-all duration-200 block rounded-lg',
                    isActive
                      ? 'text-sage-700 dark:text-sage-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-sage-700 dark:hover:text-sage-300',
                  )}
                  href={navItem.link}
                  prefetch={true}
                >
                  {hovered === idx && (
                    <motion.div
                      layoutId="hovered"
                      className="w-full h-full absolute inset-0 bg-sage-100/60 dark:bg-sage-800/40 rounded-lg backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active"
                      className="w-full h-full absolute inset-0 bg-sage-100/80 dark:bg-sage-800/60 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  <span className="relative z-20">{navItem.name}</span>
                </PreloadLink>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <ClientOnly>
          <LanguageChanger />
        </ClientOnly>

        {/* Phone Number */}
        <Link
          href="tel:+15551234567"
          className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-sage-700 dark:hover:text-sage-300 transition-colors"
        >
          <Phone className="w-4 h-4" />
          (555) 123-4567
        </Link>

        {/* Primary CTA */}
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-md shadow-sage-500/20 hover:shadow-lg transition-all duration-300"
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </Link>
      </div>
    </div>
  )
}

const MobileNav = ({ navItems, visible, activeSection }: NavbarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'flex relative flex-col lg:hidden cursor-pointer w-full justify-between items-center px-4 z-[9999] transition-all duration-300',
          visible ? 'py-2' : 'py-3',
          visible &&
            'backdrop-blur-xl bg-cream-50/80 dark:bg-[#0c0f0c]/90 border-b border-sage-200/50 dark:border-sage-800/30',
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Logo visible={visible} />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageChanger />
            {open ? (
              <IconX
                className="text-sage-700 dark:text-sage-300 w-6 h-6"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <IconMenu2
                className="text-sage-700 dark:text-sage-300 w-6 h-6"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-full left-0 right-0 bg-cream-50/95 dark:bg-[#0c0f0c]/98 backdrop-blur-xl z-[9998] flex-col items-start justify-start gap-2 w-full px-4 py-6 shadow-2xl border-b border-sage-200/50 dark:border-sage-800/30"
            >
              {navItems.map((navItem, idx) => {
                const isActive = navItem.sectionId === activeSection
                return (
                  <PreloadLink
                    key={`link=${idx}`}
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'relative w-full py-3 px-3 rounded-lg transition-all duration-200 font-medium',
                      isActive
                        ? 'bg-sage-100/80 dark:bg-sage-800/60 text-sage-700 dark:text-sage-300'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-sage-100/50 dark:hover:bg-sage-800/40',
                    )}
                    prefetch={true}
                  >
                    <motion.span className="block">{navItem.name}</motion.span>
                  </PreloadLink>
                )
              })}

              {/* Mobile Contact Info */}
              <div className="w-full mt-4 pt-4 border-t border-sage-200/50 dark:border-sage-800/50">
                <Link
                  href="tel:+15551234567"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-sage-700 dark:hover:text-sage-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call: (555) 123-4567
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 text-center text-sm font-semibold bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Book Free Consultation
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
