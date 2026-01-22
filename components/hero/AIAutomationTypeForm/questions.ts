import websiteQuestions from '@/data/website-development-questions.json'

export type QuestionType =
  | 'text'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'email'
  | 'package'

export interface Question {
  id: string
  type: QuestionType
  question: string
  placeholder?: string
  description?: string
  options?: string[]
  isRequired?: boolean
  hasOther?: boolean
  highlight?: boolean
  validation?: {
    pattern?: string
    message?: string
  }
  submitButton?: {
    text?: string
    alternativeText?: string
  }
}

// Use website development questions from JSON file
export const questions: Question[] = websiteQuestions.questions as Question[]

// Keep the original questions for reference if needed
export const originalQuestions: Question[] = [
  {
    id: 'name',
    type: 'text',
    question: 'Please provide your full name:',
    isRequired: true,
  },
  {
    id: 'company',
    type: 'text',
    question: 'What is the name of your company or organization?',
    isRequired: true,
  },
  {
    id: 'services',
    type: 'checkbox',
    question: 'Which of our services are you most interested in exploring?',
    options: [
      'Web Design',
      'Web Development',
      'Search Engine Optimization',
      'Content Creation',
    ],
    isRequired: true,
    hasOther: true,
  },
  {
    id: 'budget',
    type: 'radio',
    question: 'What is your anticipated budget range for this project?',
    options: [
      '$500 - $1,000',
      '$1,001 - $5,000',
      '$5,001 - $10,000',
      '$10,001 and above',
    ],
    isRequired: true,
  },
  {
    id: 'project_description',
    type: 'textarea',
    question:
      'Could you please provide a concise overview of your project requirements?',
    isRequired: true,
  },
  {
    id: 'email',
    type: 'email',
    question: 'What is your preferred email address for correspondence?',
    isRequired: true,
  },
]
