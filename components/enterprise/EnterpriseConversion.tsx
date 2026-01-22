'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Container } from '../hero/container'
import { AnimatedStat } from './components/AnimatedStat'
import { BackgroundEffects } from './components/BackgroundEffects'
import { EnterpriseHeader } from './components/EnterpriseHeader'
import { getEnterpriseStats } from './constants/stats'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function EnterpriseConversion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const enterpriseStats = getEnterpriseStats(intl)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream-50 dark:bg-[#0c0f0c] overflow-x-clip"
    >
      <BackgroundEffects />

      <Container>
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <EnterpriseHeader />
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-20"
        >
          {enterpriseStats.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
