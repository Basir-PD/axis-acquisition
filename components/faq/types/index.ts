import type { ReactNode } from 'react'

export interface FAQData {
  id: string
  question: string
  answer: ReactNode
  icon: ReactNode
}

export interface FAQItemProps {
  question: string
  answer: ReactNode
  id: string
  isOpen: boolean
  toggleFAQ: () => void
  icon: ReactNode
  index: number
  mounted: boolean
}
