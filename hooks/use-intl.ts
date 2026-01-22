'use client'

import { useIntl as useReactIntl, FormattedMessage } from 'react-intl'

export const useIntl = () => {
  const intl = useReactIntl()

  return {
    formatMessage: intl.formatMessage,
    formatNumber: intl.formatNumber,
    formatDate: intl.formatDate,
    formatTime: intl.formatTime,
    formatRelativeTime: intl.formatRelativeTime,
    formatPlural: intl.formatPlural,
    formatList: intl.formatList,
    formatDisplayName: intl.formatDisplayName,
    locale: intl.locale,
  }
}

export { FormattedMessage }
