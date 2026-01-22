import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'
import { TextQuestion } from '@/components/hero/AIAutomationTypeForm/components/questions/TextQuestion'
import {
  Question,
  QuestionType,
} from '@/components/hero/AIAutomationTypeForm/questions'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

const mockMessages = {
  'typeform.validation.fieldRequired': 'This field is required',
  'typeform.labels.ok': 'OK',
  'typeform.navigation.submit': 'Submit',
  'typeform.submitting': 'Submitting...',
  'typeform.pressEnter': 'press',
}

const TestWrapper = ({ isRequired = true }: { isRequired?: boolean }) => {
  const { control, trigger } = useForm()
  const mockHandleNext = jest.fn()

  const question: Question = {
    id: 'name',
    type: 'text' as QuestionType,
    question: "What's your name?",
    isRequired,
  }

  return (
    <IntlProvider locale="en" messages={mockMessages}>
      <TextQuestion
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

describe('TextQuestion', () => {
  it('renders question text', () => {
    render(<TestWrapper />)
    expect(screen.getByText("What's your name?")).toBeInTheDocument()
  })

  it('renders input field with placeholder', () => {
    render(<TestWrapper />)
    const input = screen.getByPlaceholderText('Type your answer here...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('updates input value when typing', async () => {
    render(<TestWrapper />)
    const input = screen.getByPlaceholderText('Type your answer here...')

    fireEvent.change(input, { target: { value: 'John Doe' } })

    await waitFor(() => {
      expect(input).toHaveValue('John Doe')
    })
  })

  it('shows OK button for non-last step', () => {
    render(<TestWrapper />)
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('shows Submit button for last step', () => {
    const TestWrapperLastStep = () => {
      const { control, trigger } = useForm()
      const mockHandleNext = jest.fn()

      const question: Question = {
        id: 'name',
        type: 'text' as QuestionType,
        question: "What's your name?",
        isRequired: true,
      }

      return (
        <IntlProvider locale="en" messages={mockMessages}>
          <TextQuestion
            question={question}
            control={control}
            handleNext={mockHandleNext}
            isLastStep={true}
            trigger={trigger}
            focusTrigger={true}
            isSubmitting={false}
          />
        </IntlProvider>
      )
    }

    render(<TestWrapperLastStep />)
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('shows validation error for required field when empty', async () => {
    const TestWrapperWithValidation = () => {
      const { control, trigger } = useForm({ mode: 'onChange' })
      const mockHandleNext = jest.fn()

      const question: Question = {
        id: 'name',
        type: 'text' as QuestionType,
        question: "What's your name?",
        isRequired: true,
      }

      return (
        <IntlProvider locale="en" messages={mockMessages}>
          <form>
            <TextQuestion
              question={question}
              control={control}
              handleNext={mockHandleNext}
              isLastStep={false}
              trigger={trigger}
              focusTrigger={true}
              isSubmitting={false}
            />
          </form>
        </IntlProvider>
      )
    }

    render(<TestWrapperWithValidation />)
    const button = screen.getByRole('button')

    // Button should be disabled when field is empty and required
    expect(button).toBeDisabled()
  })

  it('enables button when valid input is provided', async () => {
    render(<TestWrapper />)
    const input = screen.getByPlaceholderText('Type your answer here...')
    const button = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'John Doe' } })

    await waitFor(() => {
      expect(button).not.toBeDisabled()
    })
  })

  it('shows submitting state', () => {
    const TestWrapperSubmitting = () => {
      const { control, trigger } = useForm()
      const mockHandleNext = jest.fn()

      const question: Question = {
        id: 'name',
        type: 'text' as QuestionType,
        question: "What's your name?",
        isRequired: true,
      }

      return (
        <IntlProvider locale="en" messages={mockMessages}>
          <TextQuestion
            question={question}
            control={control}
            handleNext={mockHandleNext}
            isLastStep={false}
            trigger={trigger}
            focusTrigger={true}
            isSubmitting={true}
          />
        </IntlProvider>
      )
    }

    render(<TestWrapperSubmitting />)
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
  })
})
