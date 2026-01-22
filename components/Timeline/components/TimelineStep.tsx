import type { ReactNode } from 'react'

interface TimelineStepProps {
  description: ReactNode
  children?: ReactNode
}

export function TimelineStep({ description }: TimelineStepProps) {
  return (
    <p className="text-sage-300 text-base md:text-lg leading-relaxed">
      {description}
    </p>
  )
}
