import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalEmbedOptions {
  namespace: string
  styles?: {
    branding?: {
      brandColor?: string
    }
  }
  hideEventTypeDetails?: boolean
  layout?: 'month_view' | 'week_view' | 'day_view' | any
}

export const useCalEmbed = (options: CalEmbedOptions) => {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: options.namespace })
      cal('ui', {
        styles: options.styles,
        hideEventTypeDetails: options.hideEventTypeDetails,
        layout: options.layout,
      })
    })()
  }, [options])

  return {
    namespace: options.namespace,
    layout: options.layout,
  }
}
