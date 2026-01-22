# TypeForm Testing Guide

This document provides comprehensive information about testing the TypeForm components in the Axis Acquisition application.

## Overview

The TypeForm system has been modularized into single-responsibility components with comprehensive test coverage. Each component is tested in isolation with proper mocking of dependencies.

## Test Structure

```
__tests__/
└── typeform/
    ├── TypeFormHeader.test.tsx       # Progress bar and navigation tests
    ├── QuestionRenderer.test.tsx     # Question type routing tests  
    ├── SuccessScreen.test.tsx        # Success state tests
    └── questions/
        ├── TextQuestion.test.tsx     # Text input tests
        ├── EmailQuestion.test.tsx    # Email validation tests  
        └── TextareaQuestion.test.tsx # Multi-line input tests
```

## Prerequisites

Before running tests, ensure you have the following dependencies installed:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Running Tests

### Run All TypeForm Tests
```bash
npm test __tests__/typeform
```

### Run Individual Test Files
```bash
# Test specific component
npm test TypeFormHeader.test.tsx
npm test questions/TextQuestion.test.tsx

# Run with coverage
npm test __tests__/typeform -- --coverage
```

### Run Tests in Watch Mode
```bash
npm test __tests__/typeform -- --watch
```

## Test Configuration

### Jest Setup

Ensure your `jest.config.js` includes:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
```

### Jest Setup File (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom'

// Mock framer-motion globally
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}))
```

## Test Coverage Areas

### 1. TypeFormHeader Component
- **Progress calculation**: Verifies correct percentage based on current step
- **Step counter display**: Tests proper step numbering (e.g., "3 / 5")
- **Previous button**: Shows/hides based on `showPrevious` prop
- **Navigation**: Tests previous button click handler

### 2. Question Components
- **Text Question**: Input handling, validation, keyboard events
- **Email Question**: Email format validation, error messages
- **Textarea Question**: Multi-line input, auto-resize, Ctrl+Enter shortcuts
- **Package Question**: Package selection, modal display, validation

### 3. QuestionRenderer
- **Type routing**: Ensures correct component renders for each question type
- **Prop passing**: Verifies all required props are passed through
- **Fallback handling**: Tests unknown question type fallback

### 4. SuccessScreen
- **Message display**: Shows thank you message and instructions
- **Close functionality**: Tests close button interaction
- **Animation presence**: Verifies UI elements are present

## Writing New Tests

### Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { YourComponent } from '@/path/to/component'

const mockMessages = {
  'key': 'Translation',
}

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={mockMessages}>
      {component}
    </IntlProvider>
  )
}

describe('YourComponent', () => {
  it('should render correctly', () => {
    renderWithIntl(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Best Practices

1. **Mock external dependencies**: Always mock framer-motion, react-hook-form, etc.
2. **Use IntlProvider**: Wrap components that use react-intl
3. **Test user interactions**: Click events, form input, keyboard navigation
4. **Verify accessibility**: Screen reader compatibility, proper ARIA attributes
5. **Test error states**: Validation errors, network failures, edge cases

## Debugging Tests

### Common Issues

1. **Framer Motion Errors**
   ```bash
   Error: Cannot find module 'framer-motion'
   ```
   **Solution**: Ensure framer-motion is properly mocked in jest.setup.js

2. **React Hook Form Issues**
   ```bash
   Error: Cannot destructure property 'field' of 'useController(...)'
   ```
   **Solution**: Wrap test component with proper form context

3. **Translation Errors**
   ```bash
   Error: [React Intl] Missing message
   ```
   **Solution**: Add required message keys to mockMessages object

### Debug Mode

Run tests with additional logging:

```bash
DEBUG=true npm test __tests__/typeform
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: TypeForm Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test __tests__/typeform -- --coverage
      - uses: codecov/codecov-action@v3
```

## Internationalization Testing

Tests cover both English and French translations:

```typescript
const testBothLocales = (component: React.ReactElement) => {
  // Test English
  const englishMessages = { /* EN messages */ }
  render(
    <IntlProvider locale="en" messages={englishMessages}>
      {component}
    </IntlProvider>
  )
  // Assertions...

  // Test French  
  const frenchMessages = { /* FR messages */ }
  render(
    <IntlProvider locale="fr" messages={frenchMessages}>
      {component}
    </IntlProvider>
  )
  // Assertions...
}
```

## Performance Testing

Monitor component performance:

```bash
npm test -- --watchAll=false --testPathPattern=__tests__/typeform --verbose --detectOpenHandles
```

## Accessibility Testing

Include accessibility checks:

```javascript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('should be accessible', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Updating Tests

When modifying TypeForm components:

1. **Update relevant test files**
2. **Add new test cases for new functionality**
3. **Update mock messages if new translations are added**
4. **Run full test suite to ensure no regressions**
5. **Update this documentation if test structure changes**

## Troubleshooting

For common issues and solutions, check:
- Component prop types and interfaces
- Translation key consistency
- Mock configurations
- React Hook Form integration
- Framer Motion animations

## Support

For questions about TypeForm testing:
1. Check this documentation
2. Review existing test files for patterns
3. Consult the main TypeForm component implementations
4. Ask the development team for clarification