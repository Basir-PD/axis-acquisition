/* eslint-disable */
'use client'
import React, { useRef, useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from '@tabler/icons-react'
import { Heading } from './shared/heading'

export default function ServiceCard() {
  const features = [
    {
      title: 'Built for developers',
      content: 'Built for engineers, developers, dreamers, thinkers and doers.',
      icon: <IconTerminal2 />,
    },
    {
      title: 'Ease of use',
      content:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: 'Pricing like no other',
      content:
        'Our prices are best in the market. No cap, no lock, no credit card required.',
      icon: <IconCurrencyDollar />,
    },
    {
      title: '100% Uptime guarantee',
      content: 'We just cannot be taken down by anyone.',
      icon: <IconCloud />,
    },
    {
      title: 'Multi-tenant Architecture',
      content: 'You can simply share passwords instead of buying new seats.',
      icon: <IconRouteAltLeft />,
    },
    {
      title: '24/7 Customer Support',
      content:
        'We are available a 100% of the time. At least our AI Agents are.',
      icon: <IconHelp />,
    },
    {
      title: 'Money back guarantee',
      content: 'If you don’t like EveryAI, we will convince you to like us.',
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: 'And everything else',
      content: 'I just ran out of copy ideas. Accept my sincere apologies.',
      icon: <IconHeart />,
    },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            title={feature.title}
            content={feature.content}
            icon={feature.icon}
            index={index}
          />
        ))}
      </div>
    </>
  )
}

const Card = ({
  title,
  content,
  icon,
  index,
}: {
  title: string
  content: string
  icon: React.ReactNode
  index: number
}) => {
  const { x, y, parentRef } = useMousePosition()

  return (
    <div
      ref={parentRef}
      style={{
        // @ts-expect-error
        '--x': `${x}px`,
        '--y': `${y}px`,
      }}
      className={cn(
        'lg:border-r py-10 mt-10  group dark:border-neutral-800 cursor-pointer relative overflow-hidden transform-gpu hover:transition-all duration-300 ease-linear hover:scale-95',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800',
      )}
    >
      <div
        className={cn(
          'size-40 rounded-full blur-3xl absolute top-[var(--y)] left-[var(--x)] -translate-x-1/2 -translate-y-1/2',
          (x === null || y === null) && 'hidden',
        )}
        style={{
          background:
            'linear-gradient(135deg, #f24389, #6624c0, #f4afe9, #9d7ef3)',
        }}
      />
      <div className="absolute inset-px dark:bg-glass-dark  bg-neutral-100/70 " />
      <div className="relative p-5">
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="relative px-4 pb-2 pt-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{content}</p>
      </div>
    </div>
  )
}

type MousePosition = {
  x: number | null
  y: number | null
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      if (parentRef.current) {
        const bounds = parentRef.current.getBoundingClientRect()
        const x = event.clientX - bounds.left
        const y = event.clientY - bounds.top
        setMousePosition({ x, y })
      }
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return { ...mousePosition, parentRef }
}
