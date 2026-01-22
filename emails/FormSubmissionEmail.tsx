import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface FormSubmissionEmailProps {
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
  submittedAt: string
  formData?: Record<string, any>
}

export const FormSubmissionEmail = ({
  formType,
  name,
  email,
  company,
  message,
  phone,
  budget,
  timeline,
  services,
  projectDetails,
  submittedAt,
  formData = {},
}: FormSubmissionEmailProps) => {
  const previewText = `New ${formType} form submission from ${name}`

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2)
    }
    return String(value || 'N/A')
  }

  const formatFieldName = (fieldName: string): string => {
    // Convert camelCase and snake_case to Title Case
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
  }

  const formTypeLabels = {
    contact: 'Contact Form',
    lead: 'Lead Generation Form',
    'quick-contact': 'Quick Contact Popup',
  }

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>
              New {formTypeLabels[formType]} Submission
            </Heading>
          </Section>

          <Section style={infoSection}>
            <Heading as="h2" style={h2}>
              Contact Information
            </Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Name:</Text>
              </Column>
              <Column>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Email:</Text>
              </Column>
              <Column>
                <Text style={value}>
                  <a href={`mailto:${email}`} style={link}>
                    {email}
                  </a>
                </Text>
              </Column>
            </Row>
            {company && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Company:</Text>
                </Column>
                <Column>
                  <Text style={value}>{company}</Text>
                </Column>
              </Row>
            )}
            {phone && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Phone:</Text>
                </Column>
                <Column>
                  <Text style={value}>{phone}</Text>
                </Column>
              </Row>
            )}
          </Section>

          {message && (
            <Section style={messageSection}>
              <Heading as="h2" style={h2}>
                Message
              </Heading>
              <Text style={messageText}>{message}</Text>
            </Section>
          )}

          {(budget || timeline || services || projectDetails) && (
            <Section style={infoSection}>
              <Heading as="h2" style={h2}>
                Project Details
              </Heading>
              {budget && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>Budget:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{budget}</Text>
                  </Column>
                </Row>
              )}
              {timeline && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>Timeline:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{timeline}</Text>
                  </Column>
                </Row>
              )}
              {services && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>Services:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{formatValue(services)}</Text>
                  </Column>
                </Row>
              )}
              {projectDetails && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>Details:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{projectDetails}</Text>
                  </Column>
                </Row>
              )}
            </Section>
          )}

          {Object.keys(formData).length > 0 && (
            <Section style={infoSection}>
              <Heading as="h2" style={h2}>
                Additional Information
              </Heading>
              {Object.entries(formData).map(([key, val]) => {
                // Skip standard fields that are already displayed above
                if (
                  [
                    'name',
                    'email',
                    'company',
                    'message',
                    'phone',
                    'budget',
                    'timeline',
                    'services',
                    'projectDetails',
                  ].includes(key)
                ) {
                  return null
                }
                return (
                  <Row key={key} style={infoRow}>
                    <Column style={labelColumn}>
                      <Text style={label}>{formatFieldName(key)}:</Text>
                    </Column>
                    <Column>
                      <Text style={value}>{formatValue(val)}</Text>
                    </Column>
                  </Row>
                )
              })}
            </Section>
          )}

          <Section style={footer}>
            <Text style={footerText}>
              Submitted at: {new Date(submittedAt).toLocaleString()}
            </Text>
            <Text style={footerText}>
              Form Type: {formTypeLabels[formType]}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const header = {
  padding: '32px 20px',
  backgroundColor: '#0070f3',
}

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '0 0 16px',
}

const infoSection = {
  padding: '32px 20px',
  borderBottom: '1px solid #e6e6e6',
}

const messageSection = {
  padding: '32px 20px',
  borderBottom: '1px solid #e6e6e6',
}

const infoRow = {
  marginBottom: '12px',
}

const labelColumn = {
  width: '120px',
}

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const value = {
  color: '#333',
  fontSize: '14px',
  margin: '0',
}

const messageText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const link = {
  color: '#0070f3',
  textDecoration: 'underline',
}

const footer = {
  padding: '24px 20px',
}

const footerText = {
  color: '#999',
  fontSize: '12px',
  margin: '0 0 4px',
}

export default FormSubmissionEmail
