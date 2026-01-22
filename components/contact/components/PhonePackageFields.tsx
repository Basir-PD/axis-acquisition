import React from 'react'
import { useIntl } from 'react-intl'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { CustomSelectValue } from './CustomSelectValue'

interface ContactFormData {
  name: string
  email: string
  phoneNumber: string
  package: string
  message: string
}

interface PhonePackageFieldsProps {
  control: Control<ContactFormData>
  packageDropdownOpen: boolean
  setPackageDropdownOpen: (_open: boolean) => void
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>
}

export const PhonePackageFields: React.FC<PhonePackageFieldsProps> = ({
  control,
  packageDropdownOpen,
  setPackageDropdownOpen,
}) => {
  const intl = useIntl()

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <LabelInputContainer>
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label
                htmlFor="phoneNumber"
                className="text-sage-900 dark:text-cream-50 font-medium text-base"
              >
                Phone Number
              </Label>
              <FormControl>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={field.value}
                  onChange={(value) => field.onChange(value || '')}
                  placeholder="Your phone number"
                  className={`phone-input-split h-14 text-base bg-cream-50 dark:bg-sage-900/60 border border-sage-200 dark:border-sage-700 rounded-xl focus-within:border-sage-500 dark:focus-within:border-sage-400 transition-colors ${
                    fieldState.error
                      ? 'border-red-500 dark:border-red-500'
                      : field.value && !fieldState.error
                        ? 'border-sage-500 dark:border-sage-400'
                        : ''
                  }`}
                  numberInputProps={{
                    id: 'phoneNumber',
                    'aria-invalid': fieldState.error ? 'true' : 'false',
                    'aria-describedby': fieldState.error
                      ? `${field.name}-error`
                      : undefined,
                  }}
                />
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
          name="package"
          render={({ field }) => (
            <FormItem>
              <Label
                htmlFor="package"
                className="text-sage-900 dark:text-cream-50 font-medium text-base"
              >
                What Are You Looking For?
              </Label>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  open={packageDropdownOpen}
                  onOpenChange={setPackageDropdownOpen}
                >
                  <SelectTrigger className="h-14 text-base bg-cream-50 dark:bg-sage-900/60 border-sage-200 dark:border-sage-700 rounded-xl focus:border-sage-500 dark:focus:border-sage-400 focus:ring-0 transition-colors">
                    <CustomSelectValue
                      value={field.value}
                      placeholder="Select a service"
                      intl={intl}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-sage-900 border-sage-200 dark:border-sage-700">
                    {/* Getting Started */}
                    <div className="px-3 py-2 text-xs font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wide border-b border-sage-100 dark:border-sage-800">
                      Getting Started
                    </div>
                    <SelectItem value="strategy-call">
                      Free Growth Strategy Call
                    </SelectItem>
                    <SelectItem value="marketing-audit">
                      Marketing Audit
                    </SelectItem>

                    {/* Marketing Services */}
                    <div className="px-3 py-2 text-xs font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wide border-b border-sage-100 dark:border-sage-800 mt-2">
                      Marketing Services
                    </div>
                    <SelectItem value="website-design">
                      Website Design & Development
                    </SelectItem>
                    <SelectItem value="paid-ads">
                      Paid Advertising (Facebook/Google)
                    </SelectItem>
                    <SelectItem value="local-seo">
                      Local SEO & Google Maps
                    </SelectItem>
                    <SelectItem value="patient-funnels">
                      Patient Acquisition Funnels
                    </SelectItem>
                    <SelectItem value="retention-systems">
                      Patient Retention Systems
                    </SelectItem>

                    {/* Comprehensive Solutions */}
                    <div className="px-3 py-2 text-xs font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wide border-b border-sage-100 dark:border-sage-800 mt-2">
                      Comprehensive Solutions
                    </div>
                    <SelectItem value="full-service">
                      Full-Service Marketing Package
                    </SelectItem>
                    <SelectItem value="new-location">
                      New Location Launch
                    </SelectItem>

                    {/* Other */}
                    <div className="px-3 py-2 text-xs font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wide border-b border-sage-100 dark:border-sage-800 mt-2">
                      Other
                    </div>
                    <SelectItem value="pricing-question">
                      Pricing Question
                    </SelectItem>
                    <SelectItem value="other">
                      Other Inquiry
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="!text-red-500 dark:!text-red-400" />
            </FormItem>
          )}
        />
      </LabelInputContainer>
    </div>
  )
}
