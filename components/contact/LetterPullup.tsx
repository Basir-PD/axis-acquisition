'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function LetterPullUp({ words }: { words: string }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })
  const letters = words.split('')

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
        duration: 0.5, // Adjust duration for smoothness
      },
    }),
  }

  return (
    <div className="flex justify-center" ref={ref}>
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          custom={i}
          className={clsx(
            'text-center text-white dark:text-neutral-900 py-5 font-display font-bold drop-shadow-sm',
            'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
            'tracking-[-0.02em]',
            'md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]',
          )}
        >
          {letter === ' ' ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  )
}
