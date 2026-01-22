'use client'

import { useIntl } from 'react-intl'
import { Question, QuestionType } from './questions'

export const useTranslatedQuestions = (): Question[] => {
  const intl = useIntl()

  return [
    {
      id: 'name',
      type: 'text' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.name',
        defaultMessage: "What's your name?",
      }),
      isRequired: true,
    },
    {
      id: 'company',
      type: 'text' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.company',
        defaultMessage: "What's your company name?",
      }),
      isRequired: true,
    },
    {
      id: 'package',
      type: 'package' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.package',
        defaultMessage: 'Which package best fits your needs?',
      }),
      isRequired: true,
    },
    {
      id: 'project_description',
      type: 'textarea' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.details',
        defaultMessage: 'Tell us more about your project',
      }),
      isRequired: true,
    },
    {
      id: 'email',
      type: 'email' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.email',
        defaultMessage: "What's your email address?",
      }),
      isRequired: true,
    },
  ]
}
