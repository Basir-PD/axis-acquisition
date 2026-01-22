'use client'

import React, { useState, useEffect } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)

  // Check for popup state from DOM (alternative method)
  useEffect(() => {
    const checkPopupState = () => {
      // Check if the popup element exists in the DOM
      const popup = document.querySelector('[data-contact-popup]')
      setIsContactPopupOpen(!!popup)
    }

    // Check initially and on mutations
    checkPopupState()

    const observer = new MutationObserver(checkPopupState)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && !isContactPopupOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HiArrowCircleUp className="w-8 h-8" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
