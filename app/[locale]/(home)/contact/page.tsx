import type { Metadata } from 'next'
import ContactPageContent from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact - Axis Acquisition',
  description:
    "Get in touch with Axis Acquisition. We'd love to hear from you.",
  openGraph: {
    images: ['https://axisacquisition.com'],
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
