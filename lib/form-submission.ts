import { Databases, ID } from 'appwrite'
import client from '@/lib/appwrite'
import { sendFormEmail } from '@/lib/send-email'

interface BaseFormData {
  name: string
  email: string
  company?: string
  message?: string
  [key: string]: any
}

interface FormSubmissionOptions {
  formType: 'contact' | 'lead' | 'quick-contact'
  collectionId: string
  data: BaseFormData
  skipEmailNotification?: boolean
}

export class FormSubmissionService {
  private database: Databases

  constructor() {
    this.database = new Databases(client)
  }

  async submitForm(options: FormSubmissionOptions) {
    const {
      formType,
      collectionId,
      data,
      skipEmailNotification = false,
    } = options

    // eslint-disable-next-line no-console
    console.log('FormSubmissionService.submitForm called with:', {
      formType,
      collectionId,
      data,
    })

    try {
      // 1. Validate required fields
      this.validateFormData(data)
      // eslint-disable-next-line no-console
      console.log('Form data validation passed')

      // 2. Prepare submission data (remove fields not in database schema)
      // Extract and remove turnstileToken and honeypot from the data
      const submissionData = { ...data }
      delete submissionData.turnstileToken
      delete submissionData.honeypot
      // eslint-disable-next-line no-console
      console.log('Prepared submission data:', submissionData)

      // 3. Verify Turnstile token if provided - commented out for now
      // if (data.turnstileToken) {
      //   // Token verification happens on client-side via Cloudflare
      //   // We just ensure it was provided for spam protection
      //   if (!data.turnstileToken || typeof data.turnstileToken !== 'string') {
      //     throw new Error('Invalid security verification')
      //   }
      // }

      // 4. Save to database
      // eslint-disable-next-line no-console
      console.log('Attempting to save to database...')
      const dbResponse = await this.saveToDatabase(collectionId, submissionData)
      // eslint-disable-next-line no-console
      console.log('Database save successful:', dbResponse)

      // 5. Send email notification (non-blocking)
      if (!skipEmailNotification) {
        // eslint-disable-next-line no-console
        console.log('Sending email notification...')
        this.sendEmailNotification(formType, submissionData).catch(
          (emailError) => {
            // eslint-disable-next-line no-console
            console.error('Email notification failed:', emailError)
            // Don't throw - email failure shouldn't block form submission
          },
        )
      }

      return {
        success: true,
        data: dbResponse,
        message: 'Form submitted successfully',
      }
    } catch (error) {
      throw new FormSubmissionError(
        error instanceof Error ? error.message : 'Form submission failed',
      )
    }
  }

  private validateFormData(data: BaseFormData) {
    if (!data.name?.trim()) {
      throw new Error('Name is required')
    }
    if (!data.email?.trim()) {
      throw new Error('Email is required')
    }
    if (!this.isValidEmail(data.email)) {
      throw new Error('Valid email is required')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private async saveToDatabase(collectionId: string, data: any) {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string
    const documentId = ID.unique()

    // eslint-disable-next-line no-console
    console.log('saveToDatabase called with:', {
      databaseId,
      collectionId,
      documentId,
      data,
    })

    const result = await this.database.createDocument(
      databaseId,
      collectionId,
      documentId,
      data,
    )

    // eslint-disable-next-line no-console
    console.log('Database document created:', result)
    return result
  }

  private async sendEmailNotification(
    formType: 'contact' | 'lead' | 'quick-contact',
    data: BaseFormData,
  ) {
    await sendFormEmail({
      formType,
      ...data,
    })
  }
}

export class FormSubmissionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FormSubmissionError'
  }
}

// Singleton instance
export const formSubmissionService = new FormSubmissionService()

// Collection IDs enum for type safety
export const COLLECTION_IDS = {
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID as string,
  LEADS: process.env.NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID as string,
} as const
