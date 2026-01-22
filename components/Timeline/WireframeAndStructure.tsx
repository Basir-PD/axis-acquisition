import { motion, useAnimation } from 'framer-motion'
import { FaHome, FaUsers, FaCogs } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { IpadCard } from './IpadCard'
import { useInView } from 'react-intersection-observer'

// Variants for section animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const Page = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-gray-800 p-2 md:p-4 md:pb-8 rounded-lg shadow-lg w-full min-h-[240px] flex flex-col"
    >
      <motion.div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xs sm:text-sm md:text-lg font-bold ml-1 md:ml-2 whitespace-nowrap text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </motion.div>
      <div className="flex-1">{children}</div>
    </motion.div>
  )
}

const Section = ({ title }: { title: string; delay: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  })

  // Create elegant placeholder patterns for mobile
  const getPlaceholderPattern = (title: string) => {
    const patterns = {
      Navigation: { width: '80%', bars: 1 },
      'Hero Header': { width: '90%', bars: 2 },
      'Featured Products': { width: '85%', bars: 2 },
      'About Us Summary': { width: '75%', bars: 1 },
      Footer: { width: '70%', bars: 1 },
      'Company History': { width: '85%', bars: 2 },
      'Our Mission': { width: '80%', bars: 1 },
      'Team Members': { width: '90%', bars: 2 },
      'Services Overview': { width: '85%', bars: 2 },
      'Core Offerings': { width: '90%', bars: 2 },
      'Pricing Plans': { width: '75%', bars: 1 },
    }
    return patterns[title as keyof typeof patterns] || { width: '80%', bars: 1 }
  }

  const pattern = getPlaceholderPattern(title)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={sectionVariants}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div className="bg-white dark:bg-gray-700 p-1.5 md:p-3 rounded mb-1 md:mb-2 shadow-sm">
        {/* Desktop: Show actual titles */}
        <h3 className="hidden md:block font-semibold text-gray-800 dark:text-gray-200 text-sm">
          {title}
        </h3>

        {/* Mobile: Show elegant placeholder patterns */}
        <div className="md:hidden space-y-1">
          {Array.from({ length: pattern.bars }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ width: 0 }}
              animate={{ width: index === 0 ? pattern.width : '60%' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-gray-300 dark:bg-gray-500 rounded ${
                index === 0 ? 'h-2' : 'h-1.5'
              }`}
            />
          ))}
        </div>

        {/* Progress bar - visible on both mobile and desktop */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gray-200 dark:bg-gray-600 h-1 md:h-2 rounded mt-1 md:mt-2"
        />
      </motion.div>
    </motion.section>
  )
}

export default function Component() {
  const [step, setStep] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 5) setStep(step + 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const pageContent = {
    home: [
      { title: 'Navigation', delay: 0.2 },
      { title: 'Hero Header', delay: 0.4 },
      { title: 'Featured Products', delay: 0.6 },
      { title: 'About Us Summary', delay: 0.8 },
      { title: 'Footer', delay: 1 },
    ],
    about: [
      { title: 'Navigation', delay: 0.2 },
      { title: 'Company History', delay: 0.4 },
      { title: 'Our Mission', delay: 0.6 },
      { title: 'Team Members', delay: 0.8 },
      { title: 'Footer', delay: 1 },
    ],
    services: [
      { title: 'Navigation', delay: 0.2 },
      { title: 'Services Overview', delay: 0.4 },
      { title: 'Core Offerings', delay: 0.6 },
      { title: 'Pricing Plans', delay: 0.8 },
      { title: 'Footer', delay: 1 },
    ],
  }

  return (
    <IpadCard>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full">
            <div className="p-1 grid grid-cols-3 gap-2 md:gap-4">
              <Page
                title="Home"
                icon={<FaHome className="text-blue-500 dark:text-blue-400" />}
              >
                {pageContent.home.slice(0, step + 1).map((section) => (
                  <Section
                    key={section.title}
                    title={section.title}
                    delay={section.delay}
                  />
                ))}
              </Page>
              <Page
                title="About Us"
                icon={
                  <FaUsers className="text-green-500 dark:text-green-400" />
                }
              >
                {pageContent.about.slice(0, step + 1).map((section) => (
                  <Section
                    key={section.title}
                    title={section.title}
                    delay={section.delay}
                  />
                ))}
              </Page>
              <Page
                title="Services"
                icon={
                  <FaCogs className="text-purple-500 dark:text-purple-400" />
                }
              >
                {pageContent.services.slice(0, step + 1).map((section) => (
                  <Section
                    key={section.title}
                    title={section.title}
                    delay={section.delay}
                  />
                ))}
              </Page>
            </div>
          </div>
        </div>
      </motion.section>
    </IpadCard>
  )
}
