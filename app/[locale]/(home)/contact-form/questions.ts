export type QuestionType =
  | 'text'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'email'

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  isRequired?: boolean
  hasOther?: boolean
}

export const questions: Question[] = [
  {
    id: 'name',
    type: 'text',
    question: 'Please Provide Your Full Name:',
    isRequired: true,
  },
  {
    id: 'company',
    type: 'text',
    question: 'What is the name of your Company or Organization?',
    isRequired: true,
  },
  {
    id: 'services',
    type: 'checkbox',
    question: 'Which of our services are you most Interested in exploring?',
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
      '$1,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000 and above',
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
