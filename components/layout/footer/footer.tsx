'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import {
  Leaf,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
  ArrowRight,
} from 'lucide-react'

export const Footer = () => {
  const pathname = usePathname()

  const getCurrentLocale = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    if (['en', 'fr'].includes(firstSegment)) {
      return firstSegment
    }
    return 'en'
  }

  const localePrefix = `/${getCurrentLocale()}`

  const navItems = [
    { name: 'Home', href: `${localePrefix}/` },
    { name: 'Services', href: `${localePrefix}/#services` },
    { name: 'Pricing', href: `${localePrefix}/#price` },
    { name: 'About Us', href: `${localePrefix}/about` },
    { name: 'FAQ', href: `${localePrefix}/faq` },
    { name: 'Contact', href: `${localePrefix}/contact` },
  ]

  const services = [
    { name: 'Website Design', href: `${localePrefix}/#services` },
    { name: 'Paid Advertising', href: `${localePrefix}/#services` },
    { name: 'Local SEO', href: `${localePrefix}/#services` },
    { name: 'Marketing Analytics', href: `${localePrefix}/#services` },
    { name: 'Appointment Funnels', href: `${localePrefix}/#services` },
    { name: 'Patient Retention', href: `${localePrefix}/#services` },
  ]

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' },
  ]

  const socials = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ]

  return (
    <footer className="relative bg-sage-900 dark:bg-[#0a0d0a] text-cream-100">
      {/* Top CTA Section */}
      <div className="border-b border-sage-800/60 dark:border-sage-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-2">
                Ready to Fill Your Clinic?
              </h3>
              <p className="text-sage-300 text-lg">
                Book your free strategy call today — no obligation, no pressure.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream-100 text-sage-800 font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Get Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sage-600">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white leading-none">
                  Axis
                </span>
                <span className="text-xs text-sage-400 tracking-wider uppercase">
                  Patient Acquisition
                </span>
              </div>
            </Link>

            <p className="text-sage-300 leading-relaxed mb-6 max-w-sm">
              Full-service patient acquisition marketing for integrative health clinics.
              We fill your calendar with patients who value holistic care.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sage-300">
                <Phone className="w-5 h-5 text-sage-500 flex-shrink-0" />
                <Link href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sage-300">
                <Mail className="w-5 h-5 text-sage-500 flex-shrink-0" />
                <Link href="mailto:hello@axisacquisition.com" className="hover:text-white transition-colors">
                  hello@axisacquisition.com
                </Link>
              </div>
              <div className="flex items-start gap-3 text-sage-300">
                <Clock className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon - Fri: 9am - 5pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sage-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sage-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sage-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-800 hover:bg-sage-700 text-sage-300 hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage-800/60 dark:border-sage-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sage-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Axis Patient Acquisition. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-sage-400">
              Crafted with <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> for integrative health clinics
            </p>
          </div>
        </div>
      </div>

      {/* Large Brand Text */}
      <div className="overflow-hidden py-8 border-t border-sage-800/40 dark:border-sage-800/30">
        <div className="text-center text-[4rem] md:text-[6rem] lg:text-[8rem] font-serif font-bold text-sage-800/30 dark:text-sage-800/15 leading-none tracking-tight select-none">
          AXIS ACQUISITION
        </div>
      </div>
    </footer>
  )
}
