import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'
import { QuestionRenderer } from '@/components/hero/AIAutomationTypeForm/components/QuestionRenderer'
import {
  Question,
  QuestionType,
} from '@/components/hero/AIAutomationTypeForm/questions'

// Mock all the question components
jest.mock(
  '@/components/hero/TypeForm/components/questions/TextQuestion',
  () => ({
    TextQuestion: () => <div data-testid="text-question">Text Question</div>,
  }),
)

jest.mock(
  '@/components/hero/TypeForm/components/questions/EmailQuestion',
  () => ({
    EmailQuestion: () => <div data-testid="email-question">Email Question</div>,
  }),
)

jest.mock(
  '@/components/hero/TypeForm/components/questions/TextareaQuestion',
  () => ({
    TextareaQuestion: () => (
      <div data-testid="textarea-question">Textarea Question</div>
    ),
  }),
)

jest.mock('@/components/hero/TypeForm/PackageQuestion', () => ({
  PackageQuestion: () => (
    <div data-testid="package-question">Package Question</div>
  ),
}))

const mockMessages = {}

const TestWrapper = ({ question }: { question: Question }) => {
  const { control, trigger } = useForm()
  const mockHandleNext = jest.fn()

  return (
    <IntlProvider locale="en" messages={mockMessages}>
      <QuestionRenderer
        question={question}
        control={control}
        handleNext={mockHandleNext}
        isLastStep={false}
        trigger={trigger}
        focusTrigger={true}
        isSubmitting={false}
      />
    </IntlProvider>
  )
}

describe('QuestionRenderer', () => {
  it('renders TextQuestion for text type', () => {
    const question: Question = {
      id: 'name',
      type: 'text' as QuestionType,
      question: "What's your name?",
      isRequired: true,
    }

    render(<TestWrapper question={question} />)
    expect(screen.getByTestId('text-question')).toBeInTheDocument()
  })

  it('renders EmailQuestion for email type', () => {
    const question: Question = {
      id: 'email',
      type: 'email' as QuestionType,
      question: "What's your email?",
      isRequired: true,
    }

    render(<TestWrapper question={question} />)
    expect(screen.getByTestId('email-question')).toBeInTheDocument()
  })

  it('renders TextareaQuestion for textarea type', () => {
    const question: Question = {
      id: 'description',
      type: 'textarea' as QuestionType,
      question: 'Tell us about your project',
      isRequired: true,
    }

    render(<TestWrapper question={question} />)
    expect(screen.getByTestId('textarea-question')).toBeInTheDocument()
  })

  it('renders PackageQuestion for package type', () => {
    const question: Question = {
      id: 'package',
      type: 'package' as QuestionType,
      question: 'Select a package',
      isRequired: true,
    }

    render(<TestWrapper question={question} />)
    expect(screen.getByTestId('package-question')).toBeInTheDocument()
  })

  it('falls back to TextQuestion for unknown type', () => {
    const question: Question = {
      id: 'unknown',
      type: 'unknown' as QuestionType,
      question: 'Unknown question',
      isRequired: true,
    }

    // Spy on console.warn to test the warning
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    render(<TestWrapper question={question} />)

    expect(screen.getByTestId('text-question')).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalledWith('Unknown question type: unknown')

    consoleSpy.mockRestore()
  })
})
