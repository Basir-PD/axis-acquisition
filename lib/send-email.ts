interface EmailData {
  formType: 'contact' | 'lead' | 'quick-contact'
  name: string
  email: string
  company?: string
  message?: string
  phone?: string
  budget?: string
  timeline?: string
  services?: string | string[]
  projectDetails?: string
  [key: string]: any
}

export async function sendFormEmail(data: EmailData) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to send email')
  }

  return await response.json()
}
