import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact'
import { FAQs } from '@/components/faq/faqs'

export const metadata: Metadata = {
  title: 'Get Started - Axis Acquisition | Start Your Web Project Today',
  description:
    'Ready to transform your business with a custom website? Fill out our quick form and get a personalized quote for premium web development services. AI-powered solutions, 10-day delivery, and expert support.',
  keywords:
    'web development quote, custom website pricing, AI website builder, business website cost, professional web design services',
  openGraph: {
    title: 'Start Your Web Project - Axis Acquisition',
    description:
      'Get a custom quote for your premium business website. Fast delivery, AI-powered features, and professional design.',
    images: ['https://webapplica.com/og-contact-form.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started with Axis Acquisition',
    description:
      'Transform your business with a custom AI-powered website. Get your quote today!',
  },
}

export default function ContactFormPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apple-style centered header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-black dark:text-white mb-8">
              Get Started
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Ready to start your project? Fill out the form below and
              let&apos;s create something amazing together.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Contact Form */}
            <div className="mb-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section from home page */}
      <FAQs hideCTA />
    </div>
  )
}
