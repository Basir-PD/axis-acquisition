import React from 'react'

interface CustomSelectValueProps {
  value: string
  placeholder: string
  intl: {
    formatMessage: (_params: { id: string; defaultMessage: string }) => string
  }
}

export const CustomSelectValue: React.FC<CustomSelectValueProps> = ({
  value,
  placeholder,
  intl,
}) => {
  const getDisplayValue = (val: string) => {
    const displayMap: Record<string, string> = {
      'website-standard': intl.formatMessage({
        id: 'contact.packages.options.websiteStandard',
        defaultMessage: 'Standard Website',
      }),
      'website-premium': intl.formatMessage({
        id: 'contact.packages.options.websitePremium',
        defaultMessage: 'Premium Website',
      }),
      'website-enterprise': intl.formatMessage({
        id: 'contact.packages.options.websiteEnterprise',
        defaultMessage: 'Enterprise Website',
      }),
      'ai-chatbots': intl.formatMessage({
        id: 'contact.packages.options.aiChatbots',
        defaultMessage: 'AI Chatbots',
      }),
      'ai-voice-agents': intl.formatMessage({
        id: 'contact.packages.options.aiVoiceAgents',
        defaultMessage: 'AI Voice Agents',
      }),
      'ai-lead-generation': intl.formatMessage({
        id: 'contact.packages.options.aiLeadGeneration',
        defaultMessage: 'Lead Generation',
      }),
      custom: intl.formatMessage({
        id: 'contact.packages.options.custom',
        defaultMessage: 'Custom Solution',
      }),
      consultation: intl.formatMessage({
        id: 'contact.packages.options.consultation',
        defaultMessage: 'Consultation Only',
      }),
    }
    return displayMap[val] || val
  }

  return (
    <span className="flex-1 text-left">
      {value ? (
        <span className="text-gray-900 dark:text-white">
          {getDisplayValue(value)}
        </span>
      ) : (
        <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
      )}
    </span>
  )
}
