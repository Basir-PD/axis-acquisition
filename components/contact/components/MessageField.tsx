import React from 'react'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { SafeTextarea as Textarea } from '@/components/ui/safe-textarea'

interface ContactFormData {
  name: string
  email: string
  phoneNumber: string
  package: string
  message: string
}

interface MessageFieldProps {
  control: Control<ContactFormData>
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>
}

export const MessageField: React.FC<MessageFieldProps> = ({ control }) => {
  return (
    <LabelInputContainer>
      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <Label
              htmlFor="message"
              className="text-sage-900 dark:text-cream-50 font-medium text-base"
            >
              Tell Us About Your Clinic
            </Label>
            <FormControl>
              <Textarea
                id="message"
                placeholder="Share a bit about your practice: What services do you offer? How many new patients are you looking to add monthly? What marketing have you tried before?"
                {...field}
                className="min-h-[140px] text-base bg-cream-50 dark:bg-sage-900/60 border-sage-200 dark:border-sage-700 rounded-xl focus:border-sage-500 dark:focus:border-sage-400 focus:ring-0 resize-none transition-colors"
              />
            </FormControl>
            <FormMessage className="!text-red-500 dark:!text-red-400" />
          </FormItem>
        )}
      />
    </LabelInputContainer>
  )
}
