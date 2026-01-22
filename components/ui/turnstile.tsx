'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface TurnstileWrapperProps {
  onVerify: (_token: string) => void
  onError?: () => void
  onExpire?: () => void
  className?: string
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
}

export interface TurnstileWrapperRef {
  reset: () => void
  getToken: () => string | undefined
}

export const TurnstileWrapper = forwardRef<
  TurnstileWrapperRef,
  TurnstileWrapperProps
>(
  (
    {
      onVerify: _onVerify,
      onError,
      onExpire,
      className = '',
      theme = 'auto',
      size = 'normal',
    },
    ref,
  ) => {
    const turnstileRef = useRef<TurnstileInstance>(null)

    useImperativeHandle(ref, () => ({
      reset: () => {
        turnstileRef.current?.reset()
      },
      getToken: () => {
        return turnstileRef.current?.getResponse()
      },
    }))

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    if (!siteKey) {
      console.error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set')
      return null
    }

    return (
      <div className={`turnstile-container ${className}`}>
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={_onVerify}
          onError={onError}
          onExpire={onExpire}
          options={{
            theme,
            size,
            action: 'form-submit',
            cData: 'webapplica-form',
          }}
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        />
      </div>
    )
  },
)

TurnstileWrapper.displayName = 'TurnstileWrapper'
