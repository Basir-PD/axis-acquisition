// Accordion.js
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Accordion = ({ i, expanded, setExpanded, title, description }: any) => {
  const isOpen = i === expanded

  return (
    <motion.div
      className="relative flex flex-col w-11/12 md:w-3/4 h-full mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="flex flex-col p-4 cursor-pointer text-base text-gray-800 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-neutral-700 relative overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-center">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
          >
            {title}
          </motion.span>
          <motion.svg
            className={cn('w-5 h-5 text-gray-600 dark:text-neutral-400')}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className="mt-4 text-base font-normal text-gray-600 dark:text-neutral-400"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Accordion
