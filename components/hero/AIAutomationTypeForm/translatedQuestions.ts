'use client'

import { useIntl } from 'react-intl'
import { Question, QuestionType } from './questions'

export const useTranslatedQuestions = (): Question[] => {
  const intl = useIntl()

  return [
    {
      id: 'company_name',
      type: 'text' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.company',
        defaultMessage: "What's your company name?",
      }),
      placeholder: 'Acme Corp',
      isRequired: true,
    },
    {
      id: 'website',
      type: 'text' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.website',
        defaultMessage: 'Do you have a company website? (Optional)',
      }),
      placeholder: 'doneforyou.com',
      isRequired: false,
      validation: {
        pattern: '^(?!https?://).*$',
        message: intl.formatMessage({
          id: 'typeform.validation.websiteFormat',
          defaultMessage: 'Please enter just the domain (e.g., example.com)',
        }),
      },
    },
    {
      id: 'email',
      type: 'email' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.email',
        defaultMessage: 'Please Enter your email.',
      }),
      placeholder: 'info@doneforyou.com',
      isRequired: true,
      validation: {
        pattern: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$',
        message: intl.formatMessage({
          id: 'typeform.validation.emailFormat',
          defaultMessage: 'Please enter a valid email address',
        }),
      },
    },
    {
      id: 'employees',
      type: 'radio' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.employees',
        defaultMessage: 'How many employees are in your organization?*',
      }),
      options: ['1 - 5', '6 - 15', '16 - 50', '50 - 150', '150 - 400', '400+'],
      isRequired: true,
    },
    {
      id: 'timeline',
      type: 'radio' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.timeline',
        defaultMessage:
          'How soon is your organization planning to implement AI or automation?*',
      }),
      description: intl.formatMessage({
        id: 'typeform.questions.timelineDescription',
        defaultMessage:
          'This will help us understand your organisation better.',
      }),
      options: [
        intl.formatMessage({
          id: 'typeform.options.immediately',
          defaultMessage: 'Immediately (within the next 3 months)',
        }),
        intl.formatMessage({
          id: 'typeform.options.sixMonths',
          defaultMessage: 'In the next 6 months',
        }),
        intl.formatMessage({
          id: 'typeform.options.withinYear',
          defaultMessage: 'Within the year',
        }),
        intl.formatMessage({
          id: 'typeform.options.exploring',
          defaultMessage: 'Just exploring',
        }),
      ],
      isRequired: true,
    },
    {
      id: 'automation_focus',
      type: 'text' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.automationFocus',
        defaultMessage:
          'If you could automate one thing in your business today, what would it be?*',
      }),
      placeholder: intl.formatMessage({
        id: 'typeform.placeholders.automationFocus',
        defaultMessage: 'Lead generation',
      }),
      isRequired: true,
    },
    {
      id: 'additional_info',
      type: 'textarea' as QuestionType,
      question: intl.formatMessage({
        id: 'typeform.questions.additionalInfo',
        defaultMessage: 'Is there anything else you would like to add?',
      }),
      placeholder: intl.formatMessage({
        id: 'typeform.placeholders.additionalInfo',
        defaultMessage: 'Nope',
      }),
      isRequired: false,
      submitButton: {
        text: intl.formatMessage({
          id: 'typeform.buttons.submit',
          defaultMessage: 'Submit',
        }),
        alternativeText: intl.formatMessage({
          id: 'typeform.buttons.ok',
          defaultMessage: 'OK',
        }),
      },
    },
  ]
}
