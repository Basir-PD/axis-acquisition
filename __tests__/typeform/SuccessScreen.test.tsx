import { render, screen, fireEvent } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { SuccessScreen } from '@/components/hero/AIAutomationTypeForm/components/SuccessScreen'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockMessages = {
  'typeform.success.title': 'Thank you',
  'typeform.success.message':
    "Your submission has been received. We'll get back to you within 24 hours with a personalized proposal.",
  'typeform.labels.close': 'Close',
}

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={mockMessages}>
      {component}
    </IntlProvider>,
  )
}

describe('SuccessScreen', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders success title', () => {
    renderWithIntl(<SuccessScreen onClose={mockOnClose} />)
    expect(screen.getByText('Thank you')).toBeInTheDocument()
  })

  it('renders success message', () => {
    renderWithIntl(<SuccessScreen onClose={mockOnClose} />)
    expect(
      screen.getByText(/Your submission has been received/),
    ).toBeInTheDocument()
  })

  it('renders close button', () => {
    renderWithIntl(<SuccessScreen onClose={mockOnClose} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    renderWithIntl(<SuccessScreen onClose={mockOnClose} />)
    const closeButton = screen.getByRole('button', { name: /close/i })

    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('displays success icon', () => {
    renderWithIntl(<SuccessScreen onClose={mockOnClose} />)
    // Check for the container div that holds the success icon
    const iconContainer = document.querySelector('.bg-green-100')
    expect(iconContainer).toBeInTheDocument()
  })
})
