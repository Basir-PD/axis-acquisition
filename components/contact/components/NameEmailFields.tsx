import React from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { SafeInput as Input } from '@/components/ui/safe-input'

interface ContactFormData {
  name: string
  email: string
  phoneNumber: string
  package: string
  message: string
}

interface NameEmailFieldsProps {
  control: Control<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>
}

export const NameEmailFields: React.FC<NameEmailFieldsProps> = ({
  control,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <LabelInputContainer>
        <FormField
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label
                htmlFor="name"
                className="text-sage-900 dark:text-cream-50 font-medium text-base"
              >
                Full Name
              </Label>
              <FormControl>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Your full name"
                    {...field}
                    className={`h-14 text-base bg-cream-50 dark:bg-sage-900/60 border-sage-200 dark:border-sage-700 rounded-xl focus:border-sage-500 dark:focus:border-sage-400 focus:ring-0 transition-colors ${
                      fieldState.error
                        ? 'border-red-500 dark:border-red-500'
                        : field.value && !fieldState.error
                          ? 'border-sage-500 dark:border-sage-400'
                          : ''
                    }`}
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={
                      fieldState.error ? `${field.name}-error` : undefined
                    }
                  />
                </div>
              </FormControl>
              <FormMessage
                className="!text-red-500 dark:!text-red-400 text-sm mt-1"
                id={`${field.name}-error`}
              />
            </FormItem>
          )}
        />
      </LabelInputContainer>

      <LabelInputContainer>
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label
                htmlFor="email"
                className="text-sage-900 dark:text-cream-50 font-medium text-base"
              >
                Email Address
              </Label>
              <FormControl>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                    className={`h-14 text-base bg-cream-50 dark:bg-sage-900/60 border-sage-200 dark:border-sage-700 rounded-xl focus:border-sage-500 dark:focus:border-sage-400 focus:ring-0 transition-colors ${
                      fieldState.error
                        ? 'border-red-500 dark:border-red-500'
                        : field.value && !fieldState.error
                          ? 'border-sage-500 dark:border-sage-400'
                          : ''
                    }`}
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={
                      fieldState.error ? `${field.name}-error` : undefined
                    }
                  />
                </div>
              </FormControl>
              <FormMessage
                className="!text-red-500 dark:!text-red-400 text-sm mt-1"
                id={`${field.name}-error`}
              />
            </FormItem>
          )}
        />
      </LabelInputContainer>
    </div>
  )
}
