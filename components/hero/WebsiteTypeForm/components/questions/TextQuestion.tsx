'use client'

import { useController, Control } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { BaseQuestion } from './BaseQuestion'
import { OkayButton } from '../OkayButton'
import { Question } from '../../questions'

interface TextQuestionProps {
  question: Question
  control: Control<any>
  handleNext: () => void
  isLastStep: boolean
  trigger: (_name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
}

export function TextQuestion({
  question,
  control,
  handleNext,
  isLastStep,
  trigger,
  focusTrigger,
  isSubmitting,
}: TextQuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: question.id,
    control,
    defaultValue: '',
    rules: { required: question.isRequired },
  })

  useEffect(() => {
    if (focusTrigger && inputRef.current) {
      inputRef.current.focus()
    }
  }, [focusTrigger])

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const isValid = await trigger(question.id)
      if (isValid) {
        handleNext()
      }
    }
  }

  return (
    <BaseQuestion
      question={question.question}
      error={
        error
          ? ((
              <FormattedMessage
                id="typeform.validation.fieldRequired"
                defaultMessage="This field is required"
              />
            ) as any)
          : undefined
      }
    >
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          className="w-full text-2xl md:text-3xl bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Type your answer here..."
          autoComplete="off"
        />

        <div className="w-full h-px bg-gray-300 dark:bg-gray-600" />

        <OkayButton
          onClick={handleNext}
          isSubmit={isLastStep}
          disabled={!value || !!error}
          isSubmitting={isSubmitting}
        />
      </div>
    </BaseQuestion>
  )
}
