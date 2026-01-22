'use client'

import { useController, Control } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { BaseQuestion } from './BaseQuestion'
import { OkayButton } from '../OkayButton'
import { Question } from '../../questions'

interface TextareaQuestionProps {
  question: Question
  control: Control<any>
  handleNext: () => void
  isLastStep: boolean
  trigger: (_name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
}

export function TextareaQuestion({
  question,
  control,
  handleNext,
  isLastStep,
  trigger,
  focusTrigger,
  isSubmitting,
}: TextareaQuestionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    if (focusTrigger && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [focusTrigger])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
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
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          className="w-full text-2xl md:text-3xl bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-[120px]"
          placeholder="Type your answer here..."
          rows={3}
        />

        <div className="w-full h-px bg-gray-300 dark:bg-gray-600" />

        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <FormattedMessage
              id="typeform.hints.ctrlEnter"
              defaultMessage="Press Ctrl + Enter to continue"
            />
          </div>

          <OkayButton
            onClick={handleNext}
            isSubmit={isLastStep}
            disabled={!value || !!error}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </BaseQuestion>
  )
}
