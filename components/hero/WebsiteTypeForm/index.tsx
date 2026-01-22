/* eslint-disable */
'use client'

import React, { useState, useRef, useCallback, useEffect, memo } from 'react'
import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from 'framer-motion'
import { ChevronUp, ChevronDown, ArrowRight, X, Check } from 'lucide-react'
import {
  useForm,
  Controller,
  Control,
  useController,
  FieldErrors,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/shared/button'
import { Checkbox } from '@/components/ui/checkbox'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Question } from './questions'
import { useTranslatedQuestions } from './translatedQuestions'
import { useIntl, FormattedMessage } from 'react-intl'
import { Input } from '@/components/ui/typeform-input'
import { Textarea } from '@/components/ui/typeform-textarea'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { PackageQuestion } from './PackageQuestion'
// import {
//   TurnstileWrapper,
//   TurnstileWrapperRef,
// } from '@/components/ui/turnstile'
import { HoneypotField } from '@/components/ui/honeypot'
import PortalWrapper from './PortalWrapper'

interface OkayButtonProps {
  onClick?: () => void
  isSubmit?: boolean
  disabled?: boolean
}

const OkayButton: React.FC<OkayButtonProps & { isSubmitting?: boolean }> = ({
  onClick,
  isSubmit = false,
  disabled = false,
  isSubmitting = false,
}) => (
  <div className="flex items-center w-full justify-between mt-6 md:mt-8">
    <Button
      type={isSubmit ? 'submit' : 'button'}
      onClick={isSubmit ? undefined : onClick}
      className={`bg-black text-white hover:bg-gray-800 transition-all duration-200 ease-out rounded-sm px-6 md:px-8 py-3 text-base font-medium touch-manipulation min-h-[44px] ${
        disabled || isSubmitting
          ? 'opacity-50 cursor-not-allowed hover:bg-black'
          : ''
      }`}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <FormattedMessage
            id="typeform.submitting"
            defaultMessage="Submitting..."
          />
        </>
      ) : (
        <>
          {isSubmit ? (
            <FormattedMessage
              id="typeform.navigation.submit"
              defaultMessage="Submit"
            />
          ) : (
            <FormattedMessage id="typeform.labels.ok" defaultMessage="OK" />
          )}
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
      <FormattedMessage id="typeform.pressEnter" defaultMessage="press" />
      <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono">
        Enter ↵
      </kbd>
    </div>
  </div>
)

interface MultiStepFormProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function MultiStepForm({
  isOpen: isModalOpen,
  setIsOpen: setIsModalOpen,
}: MultiStepFormProps) {
  const intl = useIntl()
  const questions = useTranslatedQuestions()
  const [currentStep, setCurrentStep] = useState(0)
  // const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [turnstileToken] = useState<string>('dummy-token') // Temporarily bypassing Turnstile
  const setTurnstileToken = () => {} // Dummy function
  const [honeypot, setHoneypot] = useState<string>('')
  // const turnstileRef = useRef<TurnstileWrapperRef>(null)
  const turnstileRef = useRef<any>(null) // Temporarily bypassing Turnstile

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({ mode: 'onChange' })
  const formRef = useRef<HTMLFormElement>(null)

  const { submitForm, isSubmitting, isSuccess, error } = useFormSubmission({
    formType: 'lead',
    onSuccess: () => {
      setCurrentStep(questions.length)
    },
  })

  const handleNext = useCallback(async () => {
    const currentQuestion = questions[currentStep]
    console.log(
      `handleNext called for step ${currentStep}, last step is ${questions.length - 1}`,
    )
    const isValid = await trigger(currentQuestion.id)

    if (isValid) {
      // If this is the last step, trigger form submission
      if (currentStep === questions.length - 1) {
        console.log('Triggering form submission...')
        // Manually trigger the form submission
        const formElement = formRef.current
        if (formElement) {
          formElement.requestSubmit()
        }
      } else {
        setCurrentStep((prevStep) => prevStep + 1)
      }
    } else {
      console.log('Form validation failed for step:', currentStep)
    }
  }, [currentStep, questions.length, trigger])

  const handlePrev = useCallback(() => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }, [])

  const onSubmit = useCallback(
    async (data: any) => {
      console.log('Form submission started with data:', data)
      // Check spam protection - commented out for now
      // if (!turnstileToken) {
      //   alert(
      //     intl.formatMessage({
      //       id: 'typeform.errors.securityVerification',
      //       defaultMessage: 'Please complete the security verification',
      //     }),
      //   )
      //   return
      // }

      if (honeypot) {
        // Honeypot was filled - likely spam
        return
      }

      // Validate that all required fields are present
      const requiredFields = questions
        .filter((q) => q.isRequired)
        .map((q) => q.id)
      const missingFields = requiredFields.filter(
        (field) =>
          !data[field] ||
          (Array.isArray(data[field]) && data[field].length === 0),
      )

      if (missingFields.length > 0) {
        alert(
          intl.formatMessage({
            id: 'typeform.errors.requiredFields',
            defaultMessage: 'Please fill in all required fields',
          }) +
            ': ' +
            missingFields.join(', '),
        )
        return
      }

      try {
        console.log('Starting form submission...')
        // Add timestamp and spam protection data, and map fields to database schema
        const submissionData = {
          ...data,
          // Map 'package' field to 'budget' for database compatibility
          budget: data.package || '',
          // Add services as empty array since we removed the services question
          services: [],
          turnstileToken,
          dateTime: new Date().toISOString(),
        }

        // Remove the original 'package' field to avoid confusion
        delete submissionData.package

        // eslint-disable-next-line no-console
        console.log('Mapped submission data for database:', submissionData)

        await submitForm(submissionData)

        // On successful submission, advance to success screen
        setCurrentStep(questions.length)
        console.log('Form submitted successfully, showing success screen')
      } catch (error) {
        console.error('Form submission failed:', error)
        if (error instanceof Error) {
          alert(
            intl.formatMessage({
              id: 'typeform.errors.submissionFailed',
              defaultMessage: 'Submission failed. Please try again.',
            }) +
              ': ' +
              error.message,
          )
        }
      }
    },
    [submitForm, turnstileToken, honeypot, questions],
  )

  const openModal = () => {
    setIsModalOpen(true)
    setCurrentStep(0)
    reset()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Small delay to ensure animation completes before resetting
    setTimeout(() => {
      setCurrentStep(0)
      reset()
      setHoneypot('')
    }, 300)
  }

  const handleFormKeyDown = async (
    event: React.KeyboardEvent<HTMLFormElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (currentStep < questions.length) {
        await handleNext()
      } else if (currentStep === questions.length - 1) {
        // Submit the form
        handleSubmit(onSubmit)()
      }
    }
  }

  const isLastQuestionStep = currentStep === questions.length - 1
  const [focusTrigger, setFocusTrigger] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (typeof window !== 'undefined' && isModalOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isModalOpen])

  // Typeform-style success animation
  const TypeformSuccessIcon = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className="w-20 h-20 mx-auto mb-8 relative"
    >
      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Check className="w-10 h-10 text-white stroke-[3]" />
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isModalOpen && (
          <PortalWrapper>
            {/* Backdrop to ensure everything is covered */}
            <div
              className="fixed inset-0 bg-black/5"
              style={{ zIndex: 2147483646 }}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white overflow-hidden h-screen md:h-screen supports-[height:100dvh]:h-dvh"
              onClick={(e) => e.target === e.currentTarget && closeModal()}
              style={{
                zIndex: 2147483647,
                isolation: 'isolate',
                position: 'fixed',
              }}
            >
              {/* Typeform-style Progress Bar */}
              <div
                className="absolute top-0 left-0 w-full h-1 bg-gray-100"
                style={{ zIndex: 2147483648 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-black"
                />
              </div>

              {/* Close Button */}
              <Button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors border-0 shadow-none"
                style={{ zIndex: 2147483649 }}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Main Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full w-full flex flex-col"
              >
                {/* Typeform-style Content */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={handleFormKeyDown}
                  className="flex-grow flex flex-col min-h-0"
                >
                  <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 overflow-y-auto overscroll-contain">
                    <div className="w-full max-w-3xl py-8 md:py-12 flex flex-col justify-center">
                      {/* Question Content */}
                      <AnimatePresence mode="wait">
                        {currentStep < questions.length ? (
                          <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            onAnimationComplete={() => {
                              setFocusTrigger((prev) => !prev)
                            }}
                            className="space-y-6 md:space-y-8 flex flex-col"
                          >
                            {/* Typeform-style Question Layout */}
                            <div className="space-y-4 md:space-y-6 flex-shrink-0">
                              {/* Question Number */}
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-medium text-gray-400">
                                  {currentStep + 1}
                                </span>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                              </div>

                              {/* Question Text */}
                              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight max-w-4xl">
                                {questions[currentStep].question}
                              </h1>

                              {/* Question Component */}
                              <div className="mt-6 md:mt-8 flex-grow min-h-0">
                                <QuestionRenderer
                                  question={questions[currentStep]}
                                  control={control}
                                  handleNext={handleNext}
                                  isLastStep={isLastQuestionStep}
                                  setValue={setValue}
                                  errors={errors}
                                  trigger={trigger}
                                  focusTrigger={focusTrigger}
                                  isSubmitting={isSubmitting}
                                  turnstileToken={turnstileToken}
                                  setTurnstileToken={setTurnstileToken}
                                  turnstileRef={turnstileRef}
                                  honeypot={honeypot}
                                  setHoneypot={setHoneypot}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-8"
                          >
                            <TypeformSuccessIcon />

                            {/* Typeform-style Success Message */}
                            <div className="space-y-4">
                              <h1 className="text-4xl md:text-5xl font-bold text-black">
                                <FormattedMessage
                                  id="typeform.success.title"
                                  defaultMessage="Thank you"
                                />
                              </h1>
                              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                <FormattedMessage
                                  id="typeform.success.message"
                                  defaultMessage="Your submission has been received. We'll get back to you within 24 hours with a personalized proposal."
                                />
                              </p>
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.3 }}
                              className="pt-8"
                            >
                              <Button
                                type="button"
                                onClick={closeModal}
                                className="bg-black text-white hover:bg-gray-800 transition-all duration-200 ease-out rounded-sm px-8 py-3 text-base font-medium"
                              >
                                <FormattedMessage
                                  id="typeform.labels.close"
                                  defaultMessage="Close"
                                />
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Typeform-style Footer Navigation */}
                  {currentStep < questions.length && (
                    <div className="p-4 md:p-8 flex items-center justify-between border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                      <Button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium text-gray-600 bg-transparent hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-0 shadow-none touch-manipulation"
                      >
                        <ChevronUp className="h-4 w-4" />
                        <FormattedMessage
                          id="typeform.labels.previous"
                          defaultMessage="Previous"
                        />
                      </Button>
                      <div className="text-sm text-gray-400">
                        {currentStep + 1} / {questions.length}
                      </div>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors touch-manipulation"
                      >
                        <FormattedMessage
                          id="typeform.labels.continue"
                          defaultMessage="Continue"
                        />
                        <ChevronUp className="h-4 w-4 rotate-90" />
                      </Button>
                    </div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </PortalWrapper>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

interface QuestionRendererProps {
  question: Question
  control: Control
  handleNext: () => void
  isLastStep: boolean
  setValue: (name: string, value: any) => void
  errors: FieldErrors
  trigger: (name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
  turnstileToken: string
  setTurnstileToken: (token: string) => void
  turnstileRef: React.RefObject<any> // TurnstileWrapperRef
  honeypot: string
  setHoneypot: (value: string) => void
}

const QuestionRenderer: React.FC<QuestionRendererProps> = memo(
  ({
    question,
    control,
    handleNext,
    isLastStep,
    setValue,
    errors,
    trigger,
    focusTrigger,
    isSubmitting,
    turnstileToken,
    setTurnstileToken,
    turnstileRef,
    honeypot,
    setHoneypot,
  }) => {
    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'select':
        return (
          <SelectQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'checkbox':
        return (
          <CheckboxQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            setValue={setValue}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'radio':
        return (
          <RadioQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'textarea':
        return (
          <TextareaQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'email':
        return (
          <TextQuestion
            type="email"
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            errors={errors}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
            turnstileToken={turnstileToken}
            setTurnstileToken={setTurnstileToken}
            turnstileRef={turnstileRef}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
          />
        )
      case 'package':
        return (
          <PackageQuestion
            question={question}
            control={control}
            handleNext={handleNext}
            isLastStep={isLastStep}
            trigger={trigger}
            focusTrigger={focusTrigger}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  },
)

interface BaseQuestionProps {
  question: Question
  control: Control
  handleNext: () => void
  isLastStep: boolean
  errors: FieldErrors
  trigger: (name?: string | string[]) => Promise<boolean>
  focusTrigger: boolean
  isSubmitting: boolean
  turnstileToken?: string
  setTurnstileToken?: (token: string) => void
  turnstileRef?: React.RefObject<any> // TurnstileWrapperRef
  honeypot?: string
  setHoneypot?: (value: string) => void
}

interface TextareaQuestionProps extends BaseQuestionProps {}

const TextareaQuestion: React.FC<TextareaQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  errors,
  trigger,
  focusTrigger,
  isSubmitting,
  turnstileToken,
  setTurnstileToken,
  turnstileRef,
  honeypot,
  setHoneypot,
}) => {
  const intl = useIntl()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [focusTrigger])

  return (
    <Controller
      name={question.id}
      control={control}
      defaultValue=""
      rules={{ required: question.isRequired }}
      render={({ field, fieldState }) => (
        <div className="space-y-8">
          <div className="relative">
            <Textarea
              {...field}
              id={question.id}
              placeholder={intl.formatMessage({
                id: 'typeform.labels.typeAnswerHere',
                defaultMessage: 'Type your answer here...',
              })}
              ref={textareaRef}
              rows={4}
              className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black text-xl resize-none outline-none transition-colors"
              onChange={(e) => {
                field.onChange(e)
                trigger(question.id)
              }}
            />
            {fieldState.error && (
              <div className="flex items-center gap-2 mt-2 text-red-500">
                <span className="text-sm">
                  <FormattedMessage
                    id="typeform.validation.fieldRequired"
                    defaultMessage="This field is required"
                  />
                </span>
              </div>
            )}
          </div>

          {/* Add spam protection on the last step - Turnstile commented out */}
          {isLastStep && setTurnstileToken && setHoneypot && (
            <div className="space-y-4 mt-6">
              {/* Honeypot field - hidden from users */}
              <HoneypotField value={honeypot || ''} onChange={setHoneypot} />

              {/* Turnstile CAPTCHA - commented out
              <TurnstileWrapper
                ref={turnstileRef}
                onVerify={(token) => setTurnstileToken(token)}
                onError={() => {
                  setTurnstileToken('')
                }}
                onExpire={() => {
                  setTurnstileToken('')
                }}
              />
              */}
            </div>
          )}

          <OkayButton
            onClick={handleNext}
            isSubmit={isLastStep}
            disabled={fieldState.invalid}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    />
  )
}

interface TextQuestionProps extends BaseQuestionProps {
  type?: string
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  errors,
  trigger,
  focusTrigger,
  type = 'text',
  isSubmitting,
  turnstileToken,
  setTurnstileToken,
  turnstileRef,
  honeypot,
  setHoneypot,
}) => {
  const intl = useIntl()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [focusTrigger])

  return (
    <Controller
      name={question.id}
      control={control}
      defaultValue=""
      rules={{ required: question.isRequired }}
      render={({ field, fieldState }) => (
        <div className="space-y-8">
          <div className="relative">
            <Input
              {...field}
              type={type}
              id={question.id}
              ref={inputRef}
              className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black text-xl outline-none transition-colors"
              placeholder={intl.formatMessage({
                id: 'typeform.labels.typeAnswerHere',
                defaultMessage: 'Type your answer here...',
              })}
              onChange={(e) => {
                field.onChange(e)
                trigger(question.id)
              }}
            />
            {fieldState.error && (
              <div className="flex items-center gap-2 mt-2 text-red-500">
                <span className="text-sm">
                  <FormattedMessage
                    id="typeform.validation.fieldRequired"
                    defaultMessage="This field is required"
                  />
                </span>
              </div>
            )}
          </div>
          <OkayButton
            onClick={handleNext}
            isSubmit={isLastStep}
            disabled={fieldState.invalid}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    />
  )
}

interface SelectQuestionProps extends BaseQuestionProps {}

const SelectQuestion: React.FC<SelectQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  errors,
  trigger,
  focusTrigger,
  isSubmitting,
  turnstileToken,
  setTurnstileToken,
  turnstileRef,
  honeypot,
  setHoneypot,
}) => {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [otherValue, setOtherValue] = useState('')
  const otherInputRef = useRef<HTMLInputElement>(null)

  return (
    <Controller
      name={question.id}
      control={control}
      defaultValue=""
      rules={{ required: question.isRequired }}
      render={({ field, fieldState }) => {
        const isInvalid =
          fieldState.invalid ||
          (field.value === 'other' && question.hasOther && !otherValue.trim())

        useEffect(() => {
          if (field.value === 'other' && otherInputRef.current) {
            otherInputRef.current.focus()
          }
        }, [field.value, focusTrigger])

        return (
          <div className="space-y-5 z-50">
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                trigger(question.id)
                if (value !== 'other') {
                  setOtherValue('')
                }
              }}
              value={field.value}
              open={open}
              onOpenChange={setOpen}
            >
              <SelectTrigger className="w-full bg-blue-50 border-blue-200 text-blue-700">
                <SelectValue
                  placeholder="Select an option"
                  className="placeholder:text-blue-300"
                />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option, index) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-blue-700"
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </SelectItem>
                ))}
                {question.hasOther && (
                  <SelectItem value="other" className="text-blue-700">
                    Other
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {question.hasOther && field.value === 'other' && (
              <Input
                type="text"
                placeholder={intl.formatMessage({
                  id: 'typeform.labels.pleaseSpecify',
                  defaultMessage: 'Please specify',
                })}
                value={otherValue}
                onChange={(e) => {
                  setOtherValue(e.target.value)
                  trigger(question.id)
                }}
                className="mt-2 w-full"
                ref={otherInputRef}
              />
            )}
            {isInvalid && (
              <span className="text-red-500 text-sm">
                {fieldState.error?.type === 'required' ? (
                  <FormattedMessage
                    id="typeform.validation.fieldRequired"
                    defaultMessage="This field is required"
                  />
                ) : (
                  <FormattedMessage
                    id="typeform.validation.specifyOption"
                    defaultMessage="Please specify other option"
                  />
                )}
              </span>
            )}
            <OkayButton
              onClick={() => {
                // Validate the selection
                if (
                  !field.value ||
                  (field.value === 'other' && !otherValue.trim())
                ) {
                  trigger(question.id)
                  return
                }

                // Prepare final value for submission
                let finalValue = field.value
                if (field.value === 'other' && otherValue.trim()) {
                  finalValue = otherValue.trim()
                }

                field.onChange(finalValue)
                handleNext()
              }}
              isSubmit={isLastStep}
              disabled={isInvalid}
              isSubmitting={isSubmitting}
            />
          </div>
        )
      }}
    />
  )
}

interface CheckboxQuestionProps extends BaseQuestionProps {
  setValue: (name: string, value: any) => void
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  setValue,
  errors,
  trigger,
  focusTrigger,
  isSubmitting,
  turnstileToken,
  setTurnstileToken,
  turnstileRef,
  honeypot,
  setHoneypot,
}) => {
  const intl = useIntl()
  const {
    field: { value: selectedValues = [], onChange },
    fieldState,
  } = useController({
    name: question.id,
    control,
    defaultValue: [],
    rules: { required: question.isRequired },
  })

  const [otherValue, setOtherValue] = useState('')
  const otherInputRef = useRef<HTMLTextAreaElement>(null)

  // Initialize otherValue if form already has "other" selected with value
  useEffect(() => {
    if (
      selectedValues.length === 1 &&
      typeof selectedValues[0] === 'string' &&
      !question.options?.includes(selectedValues[0])
    ) {
      setOtherValue(selectedValues[0])
      onChange(['other'])
    }
  }, [])

  const isInvalid =
    fieldState.invalid ||
    (selectedValues.includes('other') && !otherValue.trim()) ||
    (selectedValues.length === 0 && question.isRequired)

  function handleCheckboxChange(option: string) {
    let newValues: string[] = []
    if (option === 'other') {
      if (selectedValues.includes('other')) {
        // Unselect 'Other' and clear the input
        newValues = []
        setOtherValue('')
      } else {
        // Select 'Other' and unselect others
        newValues = ['other']
      }
    } else {
      if (selectedValues.includes(option)) {
        // Unselect the option
        newValues = selectedValues.filter((v: string) => v !== option)
      } else {
        // Select the option and unselect 'Other' if selected
        newValues = selectedValues.filter((v: string) => v !== 'other')
        newValues.push(option)
      }
    }
    onChange(newValues)
    trigger(question.id)
  }

  useEffect(() => {
    if (selectedValues.includes('other') && otherInputRef.current) {
      otherInputRef.current.focus()
    }
  }, [selectedValues, focusTrigger])

  return (
    <div className="space-y-3 flex flex-col h-full max-h-full min-h-0">
      <div className="flex-grow overflow-y-auto space-y-2 md:space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent touch-pan-y min-h-0">
        {question.options?.map((option, index) => (
          <motion.div
            key={option}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <Checkbox
              id={`${question.id}-${index}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={() => {
                handleCheckboxChange(option)
              }}
              className="sr-only peer"
            />
            <Label
              htmlFor={`${question.id}-${index}`}
              className={`flex items-center w-full p-3 md:p-4 cursor-pointer transition-all duration-200 group-hover:bg-gray-50 rounded-lg touch-manipulation min-h-[44px] ${
                selectedValues.includes(option)
                  ? 'bg-gray-50'
                  : 'bg-transparent hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center mr-4 rounded-sm border-2 font-medium text-sm transition-all duration-200 ${
                  selectedValues.includes(option)
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-300 text-gray-700 group-hover:border-gray-400'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-grow text-left text-base md:text-lg text-black leading-snug">
                {option}
              </span>
              {selectedValues.includes(option) && (
                <Check className="w-5 h-5 text-black ml-2" />
              )}
            </Label>
          </motion.div>
        ))}
        {question.hasOther && (
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <Checkbox
              id={`${question.id}-other`}
              checked={selectedValues.includes('other')}
              onCheckedChange={() => {
                handleCheckboxChange('other')
              }}
              className="sr-only peer"
            />
            <Label
              htmlFor={`${question.id}-other`}
              className={`flex items-start w-full p-4 cursor-pointer transition-all duration-200 group-hover:bg-gray-50 ${
                selectedValues.includes('other')
                  ? 'bg-gray-50'
                  : 'bg-transparent hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center mr-4 rounded-sm border-2 font-medium text-sm transition-all duration-200 flex-shrink-0 ${
                  selectedValues.includes('other')
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-300 text-gray-700 group-hover:border-gray-400'
                }`}
              >
                {String.fromCharCode(65 + (question.options?.length || 0))}
              </span>
              <div className="flex-grow">
                <span className="text-base md:text-lg text-black leading-snug block mb-2">
                  <FormattedMessage
                    id="typeform.labels.otherPleaseSpecify"
                    defaultMessage="Other (please specify)"
                  />
                </span>
                <Textarea
                  value={otherValue}
                  onChange={(e) => {
                    setOtherValue(e.target.value)
                    // Auto-select 'other' when user starts typing
                    if (
                      e.target.value.trim() &&
                      !selectedValues.includes('other')
                    ) {
                      onChange(['other'])
                    }
                    // Auto-deselect 'other' when user clears the field
                    if (
                      !e.target.value.trim() &&
                      selectedValues.includes('other')
                    ) {
                      onChange([])
                    }
                    trigger(question.id)
                  }}
                  placeholder={intl.formatMessage({
                    id: 'typeform.labels.typeAnswerHere',
                    defaultMessage: 'Type your answer here...',
                  })}
                  className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black text-lg resize-none outline-none transition-colors"
                  ref={otherInputRef}
                  rows={2}
                  onFocus={() => {
                    // Auto-select 'other' when user focuses the input
                    if (!selectedValues.includes('other')) {
                      onChange(['other'])
                    }
                  }}
                />
              </div>
              {selectedValues.includes('other') && (
                <Check className="w-5 h-5 text-black ml-2 flex-shrink-0" />
              )}
            </Label>
          </motion.div>
        )}
      </div>

      {isInvalid && (
        <div className="flex items-center gap-2 mt-2 md:mt-3 text-red-500 flex-shrink-0">
          <span className="text-sm">
            {fieldState.error?.type === 'required' ? (
              <FormattedMessage
                id="typeform.validation.selectAtLeastOne"
                defaultMessage="Please select at least one option"
              />
            ) : (
              <FormattedMessage
                id="typeform.validation.specifyAnswer"
                defaultMessage="Please specify your answer"
              />
            )}
          </span>
        </div>
      )}

      <div className="flex-shrink-0 pt-2 md:pt-3">
        <OkayButton
          onClick={() => {
            // Validation check
            if (
              selectedValues.length === 0 ||
              (selectedValues.includes('other') && !otherValue.trim())
            ) {
              trigger(question.id)
              return
            }

            // Prepare final values for submission
            let finalValues = selectedValues
            if (selectedValues.includes('other') && otherValue.trim()) {
              // Replace 'other' with the actual text value
              finalValues = selectedValues
                .filter((v: string) => v !== 'other')
                .concat([otherValue.trim()])
            }

            onChange(finalValues)
            handleNext()
          }}
          isSubmit={isLastStep}
          disabled={isInvalid}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

interface RadioQuestionProps extends BaseQuestionProps {}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  control,
  handleNext,
  isLastStep,
  errors,
  trigger,
  focusTrigger,
  isSubmitting,
  turnstileToken,
  setTurnstileToken,
  turnstileRef,
  honeypot,
  setHoneypot,
}) => {
  const intl = useIntl()
  const {
    field: { value, onChange },
    fieldState,
  } = useController({
    name: question.id,
    control,
    defaultValue: '',
    rules: { required: question.isRequired },
  })

  const [otherValue, setOtherValue] = useState('')
  const otherInputRef = useRef<HTMLTextAreaElement>(null)

  const isInvalid =
    fieldState.invalid || (value === 'other' && !otherValue.trim())

  useEffect(() => {
    if (value === 'other' && otherInputRef.current) {
      otherInputRef.current.focus()
    }
  }, [value, focusTrigger])

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <motion.div
            key={option}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <input
              type="radio"
              id={`${question.id}-${option}`}
              checked={value === option}
              onChange={() => {
                onChange(option)
                setOtherValue('')
                trigger(question.id)
              }}
              className="sr-only"
            />
            <Label
              htmlFor={`${question.id}-${option}`}
              className={`flex items-center w-full p-4 cursor-pointer transition-all duration-200 group-hover:bg-gray-50 ${
                value === option
                  ? 'bg-gray-50'
                  : 'bg-transparent hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center mr-4 rounded-sm border-2 font-medium text-sm transition-all duration-200 ${
                  value === option
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-300 text-gray-700 group-hover:border-gray-400'
                }`}
                onClick={() => {
                  onChange(option)
                  setOtherValue('')
                  trigger(question.id)
                }}
              >
                {value === option ? (
                  <Check className="w-4 h-4" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="flex-grow text-left text-lg text-black leading-relaxed">
                {option}
              </span>
            </Label>
          </motion.div>
        ))}
        {question.hasOther && (
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <input
              type="radio"
              id={`${question.id}-other`}
              checked={value === 'other'}
              onChange={() => {
                onChange('other')
                trigger(question.id)
              }}
              className="sr-only"
            />
            <Label
              htmlFor={`${question.id}-other`}
              className={`flex items-start w-full p-4 cursor-pointer transition-all duration-200 group-hover:bg-gray-50 ${
                value === 'other'
                  ? 'bg-gray-50'
                  : 'bg-transparent hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center mr-4 rounded-sm border-2 font-medium text-sm transition-all duration-200 flex-shrink-0 ${
                  value === 'other'
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-300 text-gray-700 group-hover:border-gray-400'
                }`}
              >
                {value === 'other' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  String.fromCharCode(65 + (question.options?.length || 0))
                )}
              </span>
              <div className="flex-grow">
                <span className="text-lg text-black leading-relaxed block mb-2">
                  <FormattedMessage
                    id="typeform.labels.otherPleaseSpecify"
                    defaultMessage="Other (please specify)"
                  />
                </span>
                <Textarea
                  value={otherValue}
                  onChange={(e) => {
                    setOtherValue(e.target.value)
                    trigger(question.id)
                  }}
                  placeholder={intl.formatMessage({
                    id: 'typeform.labels.typeAnswerHere',
                    defaultMessage: 'Type your answer here...',
                  })}
                  className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-black placeholder-gray-400 focus:ring-0 focus:border-black text-lg resize-none outline-none transition-colors"
                  ref={otherInputRef}
                  rows={2}
                  onFocus={() => {
                    onChange('other')
                    trigger(question.id)
                  }}
                />
              </div>
            </Label>
          </motion.div>
        )}
        <div className="h-6">
          {isInvalid && (
            <span className="text-red-500 text-sm">
              {fieldState.error?.type === 'required' ? (
                <FormattedMessage
                  id="typeform.validation.selectOption"
                  defaultMessage="Please select an option"
                />
              ) : (
                <FormattedMessage
                  id="typeform.validation.specifyOption"
                  defaultMessage="Please specify other option"
                />
              )}
            </span>
          )}
        </div>
      </div>
      <OkayButton
        onClick={() => {
          if (value === 'other' && !otherValue.trim()) {
            trigger(question.id)
            return
          }

          // Prepare final value for submission
          let finalValue = value
          if (value === 'other' && otherValue.trim()) {
            finalValue = otherValue.trim()
          }

          onChange(finalValue)
          handleNext()
        }}
        isSubmit={isLastStep}
        disabled={isInvalid}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

// Update the EmailTemplate component
interface EmailTemplateProps {
  firstName: string
  [key: string]: any
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  ...formData
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      Thank you for submitting your information. Here's a summary of what you
      provided:
    </p>
    <ul>
      {Object.entries(formData).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong>{' '}
          {Array.isArray(value) ? value.join(', ') : value}
        </li>
      ))}
    </ul>
  </div>
)
