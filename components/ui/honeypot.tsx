'use client'

import { useEffect, useRef } from 'react'

interface HoneypotFieldProps {
  name?: string
  value: string
  onChange: (_value: string) => void
}

export function HoneypotField({
  name = 'website',
  value: _value,
  onChange,
}: HoneypotFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Ensure the field stays hidden even if CSS is disabled
    if (inputRef.current) {
      inputRef.current.style.cssText = `
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
        overflow: hidden !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        white-space: nowrap !important;
        border: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      `
    }
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      value={_value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        overflow: 'hidden',
        clip: 'rect(1px, 1px, 1px, 1px)',
        whiteSpace: 'nowrap',
        border: '0',
        padding: '0',
        margin: '0',
      }}
    />
  )
}
