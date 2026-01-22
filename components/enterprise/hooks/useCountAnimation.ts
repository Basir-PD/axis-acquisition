import { useState } from 'react'

export function useCountAnimation(end: number, duration: number = 2) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(end * easeOut)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }

  return { count, startAnimation }
}
