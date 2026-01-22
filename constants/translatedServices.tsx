'use client'

import { useIntl } from 'react-intl'
import { AiOutlineCode, AiOutlineRobot } from 'react-icons/ai'
import { BsUiChecks } from 'react-icons/bs'
import { BiRocket } from 'react-icons/bi'
import { FaMobile } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'

export const useTranslatedServices = () => {
  const intl = useIntl()

  return [
    {
      id: 0,
      title: intl.formatMessage({
        id: 'services.webDesign.title',
        defaultMessage: 'Web Design & Development',
      }),
      description: intl.formatMessage({
        id: 'services.webDesign.description',
        defaultMessage:
          'Custom websites built with modern technologies and best practices',
      }),
      icon: (
        <AiOutlineCode className="h-8 w-8 text-gray-500 dark:text-gray-300" />
      ),
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      id: 4,
      title: intl.formatMessage({
        id: 'services.aiAutomation.title',
        defaultMessage: 'AI Automation',
      }),
      description: intl.formatMessage({
        id: 'services.aiAutomation.description',
        defaultMessage:
          'Automate repetitive tasks and streamline your business processes with intelligent AI solutions',
      }),
      icon: (
        <AiOutlineRobot className="h-8 w-8 text-gray-500 dark:text-gray-300" />
      ),
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3],
        ],
      },
    },
    {
      id: 1,
      title: intl.formatMessage({
        id: 'services.branding.title',
        defaultMessage: 'Branding & Identity',
      }),
      description: intl.formatMessage({
        id: 'services.branding.description',
        defaultMessage:
          'Create a unique brand identity that resonates with your audience',
      }),
      icon: <BsUiChecks className="h-8 w-8 text-gray-500 dark:text-gray-300" />,
      pattern: {
        y: -6,
        squares: [
          [-1, 2],
          [1, 3],
        ],
      },
    },
    {
      id: 2,
      title: intl.formatMessage({
        id: 'services.ecommerce.title',
        defaultMessage: 'E-Commerce Solutions',
      }),
      description: intl.formatMessage({
        id: 'services.ecommerce.description',
        defaultMessage:
          'Complete online stores with payment processing and inventory management',
      }),
      icon: (
        <MdShoppingCart className="h-8 w-8 text-gray-500 dark:text-gray-300" />
      ),
      pattern: {
        y: 32,
        squares: [
          [0, 2],
          [1, 4],
        ],
      },
    },
    {
      id: 3,
      title: intl.formatMessage({
        id: 'services.marketing.title',
        defaultMessage: 'Digital Marketing',
      }),
      description: intl.formatMessage({
        id: 'services.marketing.description',
        defaultMessage:
          'Comprehensive marketing strategies to grow your online presence',
      }),
      icon: <FaMobile className="h-8 w-8 text-gray-500 dark:text-gray-300" />,
      pattern: {
        y: 22,
        squares: [[0, 1]],
      },
    },
    {
      id: 6,
      title: intl.formatMessage({
        id: 'services.support.title',
        defaultMessage: 'Ongoing Support',
      }),
      description: intl.formatMessage({
        id: 'services.support.description',
        defaultMessage:
          'Continuous maintenance and support to keep your website running smoothly',
      }),
      icon: (
        <BiRocket className="h-8 w-8 text-gray-500 dark:text-gray-300 stroke-gray-500 dark:stroke-gray-300" />
      ),
      pattern: {
        y: 32,
        squares: [
          [0, 2],
          [1, 4],
        ],
      },
    },
  ]
}
