'use client'

import { IconSunLow } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient && (
      <motion.button
        onClick={() => {
          theme === 'dark' ? setTheme('light') : setTheme('dark')
        }}
        className="w-10 h-10 flex hover:bg-primary-100 dark:hover:bg-white/[0.1] rounded-lg items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none overflow-hidden relative"
        whileHover={{
          scale: 1.1,
          rotate: 15,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ y: -30, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 30, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute"
            >
              <IconSunLow className="h-5 w-5 flex-shrink-0 text-primary-600" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 30, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -30, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute"
            >
              <MoonIcon className="h-5 w-5 flex-shrink-0 text-primary-400" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </motion.button>
    )
  )
}
