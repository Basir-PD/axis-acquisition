'use client'
import React, { useRef } from 'react'
import Lottie from 'react-lottie'
import animationData from '../animations/calender.json' // Adjust the path accordingly

const LottieAnimation = () => {
  const animationRef = useRef(null)

  const defaultOptions = {
    loop: true, // Disable looping
    autoplay: true, // Disable autoplay
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Lottie
      ref={animationRef}
      options={defaultOptions}
      height={60}
      width={60}
    />
  )
}

export default LottieAnimation
