import { motion, useAnimation } from 'framer-motion'
import { FaHome, FaUsers, FaCogs } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { IpadCard } from './Timeline/IpadCard'

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
      className="bg-gray-100 dark:bg-gray-800 p-2 md:p-4 md:pb-8 rounded-lg shadow-lg w-full"
    >
      <motion.div className="flex items-center mb-4">
        {icon}
        <h2 className=" text-[10px] sm:text-sm md:text-xl font-bold ml-2 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </motion.div>
      <div className="h-80">{children}</div>
    </motion.div>
  )
}

const Section = ({ title, delay }: { title: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-white dark:bg-gray-700 p-2 xl:py-3 xxl:py-2 rounded mb-2"
  >
    <h3 className="md:font-semibold text-gray-800 dark:text-gray-200 text-[9px] sm:text-xs  xxl:text-base ">
      {title}
    </h3>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '75%' }}
      transition={{ duration: 0.3 }}
      className="bg-gray-200 dark:bg-gray-600 h-1 md:h-2 xl:h-3 xxl:h-4 rounded mt-1"
    />
  </motion.div>
)

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
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-full">
          <div className="flex space-x-2 space-y-0 md:flex-row md:space-x-4 md:space-y-0 ">
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
              icon={<FaUsers className="text-green-500 dark:text-green-400" />}
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
              icon={<FaCogs className="text-purple-500 dark:text-purple-400" />}
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
    </IpadCard>
  )
}
