'use client'
import { useEffect, useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { Modal, ModalBody, ModalTrigger } from '../animations/animated-modal'
import LottieAnimation from './LottieAnimation'

export function AnimatedModal() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('__next'))
  }, [])

  if (!rootElement) return null
  return (
    <div className="">
      <Modal>
        {/* <ModalTrigger
          className="inline-flex h-10 md:h-12 items-center bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
            bg-[length:200%_100%] animate-shimmer justify-center rounded-full   font-medium transition-colors text-white group"
        >
          <span className="text-xs md:text-base items-center group-hover:text-gray-300 ">
            Book a Meeting
          </span>
        </ModalTrigger> */}
        <ModalTrigger
          className="hidden sm:inline-flex h-10 md:h-12 items-center bg-[linear-gradient(110deg,#4A249D,45%,#5f3ea7,55%,#4A249D)] 
            bg-[length:200%_100%] animate-shimmer rounded-md   font-medium transition-colors text-white group justify-center group/modal-btn"
        >
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Book a Meeting
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <LottieAnimation />
          </div>
        </ModalTrigger>
        <ModalBody>
          <InlineWidget
            url="https://calendly.com/hi-basirpayenda/discovery-call"
            styles={{
              height: '900px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </ModalBody>
      </Modal>
    </div>
  )
}
