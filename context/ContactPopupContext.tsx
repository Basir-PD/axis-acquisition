'use client'

import React, { createContext, useContext, useState } from 'react'

interface ContactPopupContextType {
  isContactPopupOpen: boolean
  setIsContactPopupOpen: (open: boolean) => void
}

const ContactPopupContext = createContext<ContactPopupContextType | undefined>(
  undefined,
)

export function ContactPopupProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)

  return (
    <ContactPopupContext.Provider
      value={{ isContactPopupOpen, setIsContactPopupOpen }}
    >
      {children}
    </ContactPopupContext.Provider>
  )
}

export function useContactPopup() {
  const context = useContext(ContactPopupContext)
  if (context === undefined) {
    throw new Error(
      'useContactPopup must be used within a ContactPopupProvider',
    )
  }
  return context
}
