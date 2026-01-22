'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypingAnimation({
  words,
  typingSpeed = 80,
  deletingSpeed = 30,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentWord = words[loopNum % words.length]
    const isComplete = !isDeleting && charIndex === currentWord.length
    const isEmpty = isDeleting && charIndex === 0

    const timeout = setTimeout(
      () => {
        if (isComplete) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        } else if (isEmpty) {
          setIsDeleting(false)
          setLoopNum(loopNum + 1)
          setCharIndex(0)
        } else {
          setCharIndex(charIndex + (isDeleting ? -1 : 1))
        }
      },
      isDeleting
        ? deletingSpeed + Math.random() * deletingSpeed
        : typingSpeed + Math.random() * (typingSpeed / 2),
    )

    return () => clearTimeout(timeout)
  }, [
    charIndex,
    isDeleting,
    loopNum,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ])

  useEffect(() => {
    const currentWord = words[loopNum % words.length]
    setTypedText(currentWord.substring(0, charIndex))
  }, [charIndex, loopNum, words])

  return (
    <span className="relative inline-block w-[200px] sm:w-[240px] md:w-[300px] lg:w-[360px] text-left">
      <span className="absolute -inset-2 bg-primary-500/15 blur-2xl rounded-full animate-pulse"></span>
      <span className="relative text-primary-600 dark:text-primary-400 font-black">
        {typedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="text-primary-600 dark:text-primary-400 font-normal ml-0.5"
        >
          |
        </motion.span>
      </span>
    </span>
  )
}
