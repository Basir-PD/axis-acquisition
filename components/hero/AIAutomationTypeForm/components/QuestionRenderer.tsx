'use client'

import { Control } from 'react-hook-form'
import { Question } from '../questions'
import { TextQuestion } from './questions/TextQuestion'
import { EmailQuestion } from './questions/EmailQuestion'
import { TextareaQuestion } from './questions/TextareaQuestion'
import { PackageQuestion } from '../PackageQuestion'

interface QuestionRendererProps {
  question: Question
  control: Control<any>
  handleNext: () => void
  isLastStep: boolean
  trigger: (_name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
}

export function QuestionRenderer({
  question,
  control,
  handleNext,
  isLastStep,
  trigger,
  focusTrigger,
  isSubmitting,
}: QuestionRendererProps) {
  const commonProps = {
    question,
    control,
    handleNext,
    isLastStep,
    trigger,
    focusTrigger,
    isSubmitting,
  }

  switch (question.type) {
    case 'text':
      return <TextQuestion {...commonProps} />

    case 'email':
      return <EmailQuestion {...commonProps} />

    case 'textarea':
      return <TextareaQuestion {...commonProps} />

    case 'package':
      return <PackageQuestion {...commonProps} />

    default:
      console.warn(`Unknown question type: ${question.type}`)
      return <TextQuestion {...commonProps} />
  }
}
