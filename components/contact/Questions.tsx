'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  FaClock,
  FaCode,
  FaDollarSign,
  FaLifeRing,
  FaRocket,
  FaSearch,
} from 'react-icons/fa'
import { LetterPullUp } from './LetterPullup'

const tabs = [
  {
    id: 'one',
    question: 'What services does our web design agency offer?',
    answer: (
      <>
        <p className="mb-2">
          We provide a comprehensive suite of web solutions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Custom website design</li>
          <li>E-commerce solutions</li>
          <li>Responsive design</li>
          <li>UI/UX design</li>
          <li>Ongoing website maintenance</li>
        </ul>
        <p className="mt-2">
          Ready to bring your vision to life? Let&apos;s chat about your
          specific needs!
        </p>
      </>
    ),
    icon: <FaCode />,
  },
  {
    id: 'two',
    question: 'How long does it take to complete a website project?',
    answer: (
      <>
        <p>Project timelines vary based on complexity:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Standard websites: 4-8 weeks</li>
          <li>Complex projects: 8-12+ weeks</li>
        </ul>
        <p className="mt-2">
          For a personalized timeline, let&apos;s discuss your specific
          requirements!
        </p>
      </>
    ),
    icon: <FaClock />,
  },
  {
    id: 'three',
    question: 'What is your pricing structure?',
    answer: (
      <>
        <p>
          We offer customized pricing based on your unique needs and project
          scope. Our goal is to provide high-quality web design services that
          fit your budget.
        </p>
        <p className="mt-2">
          For a detailed quote, schedule a free consultation with our team.
          We&apos;re excited to learn about your business and how we can help
          you succeed online!
        </p>
      </>
    ),

    icon: <FaDollarSign />,
  },
  {
    id: 'four',
    question: 'Do you offer ongoing support after the website is launched?',
    answer: (
      <>
        <p>Absolutely! Our post-launch support includes:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Regular updates</li>
          <li>Security checks</li>
          <li>Performance optimization</li>
          <li>Content updates</li>
        </ul>
        <p className="mt-2">
          Let&apos;s discuss your long-term web presence strategy and keep your
          site running smoothly!
        </p>
      </>
    ),

    icon: <FaLifeRing />,
  },
  {
    id: 'five',
    question: 'How do I get started with your web design services?',
    answer: (
      <>
        <p>Getting started is easy! Here&apos;s how:</p>
        <ol className="list-decimal pl-5 space-y-1 mt-2">
          <li>Reach out via phone or our contact form</li>
          <li>Schedule a free consultation</li>
          <li>Discuss your business goals and project requirements</li>
          <li>Receive a customized proposal</li>
          <li>Begin your journey to an amazing web presence!</li>
        </ol>
        <p className="mt-2">
          Don&apos;t wait to elevate your online presence – contact us today!
        </p>
      </>
    ),

    icon: <FaRocket />,
  },
  {
    id: 'six',
    question: 'Can you help improve my website&apos;s search engine rankings?',
    answer: (
      <>
        <p>Yes, we&apos;re committed to boosting your online visibility:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>SEO best practices integrated into all web designs</li>
          <li>Dedicated SEO services available</li>
          <li>Strategies to improve organic traffic</li>
          <li>Regular performance analysis and optimization</li>
        </ul>
        <p className="mt-2">
          Ready to climb the search rankings? Let&apos;s discuss how we can
          enhance your website&apos;s SEO performance!
        </p>
      </>
    ),

    icon: <FaSearch />,
  },
]

function Questions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full mx-auto pb-10 pt-2">
      {/* <h1 className="uppercase text-black text-center text-4xl md:text-6xl font-bold py-10">
        QUESTIONS
      </h1> */}
      <LetterPullUp words="Questions" />
      <div className="border rounded-lg p-2 w-[90vw]">
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            className={`overflow-hidden ${index !== tabs.length - 1 ? 'border-b' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="p-3 px-2 cursor-pointer items-center transition-all font-semibold text-white dark:text-black flex gap-2">
              {tab.icon}
              <span>{tab.question}</span>
              <Plus
                className={`ml-auto ${activeIndex === index ? 'rotate-45' : 'rotate-0'} transition-transform ease-in-out w-5 h-5 text-gray-300 dark:text-gray-600`}
              />
            </div>
            <AnimatePresence mode="sync">
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    delay: 0.14,
                  }}
                >
                  <div className="text-white dark:text-black  p-3 pt-0">
                    {tab.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Questions
