'use client'

import React, { useState } from 'react'

interface AnimatedInputProps {
  label: string
  type?: string
  name: string
  required?: boolean
}

export default function AnimatedInput({
  label,
  type = 'text',
  name,
  required = false,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(e.target.value !== '')
  }

  return (
    <div style={styles.inputContainer}>
      <input
        type={type}
        name={name}
        required={required}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        style={{
          ...styles.label,
          ...(isFocused || hasValue ? styles.labelActive : {}),
        }}
      >
        {label}
      </label>
    </div>
  )
}

const styles = {
  inputContainer: {
    position: 'relative',
    marginBottom: '20px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px 0',
    fontSize: '16px',
    color: '#333',
    border: 'none',
    borderBottom: '1px solid #ccc',
    outline: 'none',
    background: 'transparent',
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
  label: {
    position: 'absolute',
    top: '10px',
    left: '0',
    fontSize: '16px',
    color: '#999',
    pointerEvents: 'none',
    transition: '0.2s ease all',
  } as React.CSSProperties,
  labelActive: {
    top: '-20px',
    fontSize: '12px',
    color: '#3498db',
  } as React.CSSProperties,
}
