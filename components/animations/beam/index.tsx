import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const Beam = ({
  showBeam = true,
  className,
}: {
  showBeam?: boolean
  className?: string
}) => {
  const meteorRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!showBeam || !meteorRef.current) return

    const meteor = meteorRef.current

    const handleAnimationEnd = () => {
      setIsVisible(false)
      const animationDelay = Math.random() * 2
      const animationDuration = Math.random() * 4 + 1 // Ensure duration is at least 1 second
      const meteorWidth = Math.floor(Math.random() * (150 - 80) + 80)

      meteor.style.setProperty('--meteor-delay', `${animationDelay}s`)
      meteor.style.setProperty('--meteor-duration', `${animationDuration}s`)
      meteor.style.setProperty('--meteor-width', `${meteorWidth}px`)

      // Use setTimeout to ensure the new animation starts after a short delay
      setTimeout(() => {
        setIsVisible(true)
      }, 50)
    }

    meteor.addEventListener('animationend', handleAnimationEnd)

    // Start the initial animation
    setIsVisible(true)

    return () => {
      meteor.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [showBeam])

  if (!showBeam) return null

  return (
    <span
      ref={meteorRef}
      className={cn(
        'absolute z-[40] -top-7 h-[0.2rem] w-[0.2rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg]',
        isVisible ? 'animate-meteor' : 'invisible',
        className,
      )}
      style={
        {
          '--meteor-delay': '0s',
          '--meteor-duration': '2s',
          '--meteor-width': '100px',
        } as React.CSSProperties
      }
    />
  )
}

export default Beam
