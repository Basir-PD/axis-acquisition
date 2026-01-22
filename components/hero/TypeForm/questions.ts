import universalQuestions from '@/data/universal-services-questions.json'

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

// Use universal services questions from JSON file
export const questions: Question[] = universalQuestions.questions as Question[]
