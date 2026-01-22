import { AiOutlineCode, AiOutlineSearch } from 'react-icons/ai'
import { BiRocket } from 'react-icons/bi'
import { BsUiChecks } from 'react-icons/bs'
import { FaMobile } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'

export const services = [
  {
    id: 0,
    title: 'Website Development',
    description:
      'Enterprise-grade websites built with cutting-edge technologies. Scalable, secure, and optimized for maximum performance and user engagement.',
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
    id: 1,
    title: 'UI/UX Design',
    description:
      'Data-driven design solutions that convert visitors into customers. Strategic user experience optimization backed by industry best practices.',
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
    title: 'Ecommerce Solutions',
    description:
      'Complete online store development with integrated payment systems, inventory management, and conversion optimization for maximum revenue generation.',
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
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications designed for optimal performance across iOS and Android devices with seamless user experiences.',
    icon: <FaMobile className="h-8 w-8 text-gray-500 dark:text-gray-300" />,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    id: 4,
    title: 'SEO Services',
    description:
      'Strategic search engine optimization that drives organic traffic and improves search rankings through technical optimization and content strategy.',
    icon: (
      <AiOutlineSearch className="h-8 w-8 text-gray-500 dark:text-gray-300" />
    ),
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  // {
  //   id: 5,
  //   title: 'AI Integration & Automation',
  //   description: `Intelligent automation solutions powered by artificial intelligence to streamline operations, reduce costs, and enhance business efficiency.`,
  //   icon: (
  //     <AiOutlineRobot className="h-8 w-8 text-gray-500 dark:text-gray-300" />
  //   ),
  //   pattern: {
  //     y: -6,
  //     squares: [
  //       [-1, 2],
  //       [1, 3],
  //     ],
  //   },
  // },
  {
    id: 6,
    title: 'Cloud Deployment & Hosting',
    description:
      'Reliable cloud infrastructure solutions with automated deployments, 99.9% uptime guarantee, and scalable hosting architecture.',
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
  // {
  //   id: 7,
  //   title: 'Website Maintenance',
  //   description: `Comprehensive maintenance services ensuring optimal performance, security updates, and continuous monitoring for uninterrupted operations.`,
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-8 h-8 text-gray-500 dark:text-gray-300 stroke-gray-500 dark:stroke-gray-300"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
  //       />
  //     </svg>
  //   ),
  //   pattern: {
  //     y: 22,
  //     squares: [[0, 1]],
  //   },
  // }
]
