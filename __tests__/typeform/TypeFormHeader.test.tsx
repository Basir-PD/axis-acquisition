import { render, screen, fireEvent } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { TypeFormHeader } from '@/components/hero/AIAutomationTypeForm/components/TypeFormHeader'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

const mockMessages = {
  'typeform.navigation.previous': 'Previous',
}

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={mockMessages}>
      {component}
    </IntlProvider>,
  )
}

describe('TypeFormHeader', () => {
  const mockOnPrevious = jest.fn()

  beforeEach(() => {
    mockOnPrevious.mockClear()
  })

  it('renders progress bar with correct percentage', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={2}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={true}
      />,
    )

    const progressBar = document.querySelector('[style*="width: 60%"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('displays correct step counter', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={2}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={true}
      />,
    )

    expect(screen.getByText('3 / 5')).toBeInTheDocument()
  })

  it('shows previous button when showPrevious is true', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={2}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={true}
      />,
    )

    const previousButton = screen.getByRole('button', { name: /previous/i })
    expect(previousButton).toBeInTheDocument()
  })

  it('hides previous button when showPrevious is false', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={2}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={false}
      />,
    )

    const previousButton = screen.queryByRole('button', { name: /previous/i })
    expect(previousButton).not.toBeInTheDocument()
  })

  it('calls onPrevious when previous button is clicked', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={2}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={true}
      />,
    )

    const previousButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(previousButton)

    expect(mockOnPrevious).toHaveBeenCalledTimes(1)
  })

  it('shows 100% progress on last step', () => {
    renderWithIntl(
      <TypeFormHeader
        currentStep={4}
        totalSteps={5}
        onPrevious={mockOnPrevious}
        showPrevious={true}
      />,
    )

    const progressBar = document.querySelector('[style*="width: 100%"]')
    expect(progressBar).toBeInTheDocument()
    expect(screen.getByText('5 / 5')).toBeInTheDocument()
  })
})
