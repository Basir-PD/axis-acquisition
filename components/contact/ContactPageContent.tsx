'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ContactForm } from './contact'

export default function ContactPageContent() {
  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#0a0a0a]">
      {/* Minimal grid lines for subtle texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <header className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 dark:text-stone-500 mb-6">
              Get in touch
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 dark:text-stone-100 leading-[1.1] tracking-[-0.02em] mb-8">
              Let's start a
              <br />
              conversation.
            </h1>

            {/* Subtle divider */}
            <div className="w-16 h-px bg-stone-300 dark:bg-stone-700 mb-8" />

            {/* Subtext */}
            <p className="text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
              Share your vision with us. We respond within 24 hours.
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 pb-24 md:pb-32">
          {/* Contact Info - Left Column */}
          <aside className="lg:col-span-2 space-y-12">
            {/* Direct Contact */}
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 mb-6">
                Direct
              </h2>
              <div className="space-y-4">
                <Link
                  href="mailto:info@axisacquisition.com"
                  className="group flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span className="text-base">info@axisacquisition.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
                <Link
                  href="tel:+15147756790"
                  className="group flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span className="text-base">+1 514 775 6790</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 mb-6">
                Based in
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed">
                Montreal, Canada
                <br />
                <span className="text-stone-400 dark:text-stone-500">
                  Working globally
                </span>
              </p>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 mb-6">
                Hours
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed">
                Monday — Friday
                <br />
                <span className="text-stone-400 dark:text-stone-500">
                  9:00 AM — 6:00 PM EST
                </span>
              </p>
            </div>
          </aside>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
