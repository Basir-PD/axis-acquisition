import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import checkmarkAnimation from '@/public/images/projectWalkthrough/checkmark.json'

export function SuccessState() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: checkmarkAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    animationSpeed: 1.5,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center sm:text-left"
    >
      <Lottie options={defaultOptions} height={100} width={100} />

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-700 animate-pulse">
        Awesome! Your submission is in the books! 🎉
      </h2>
      <p className="mb-4 text-blue-600 animate-fade-in">
        We&apos;ve captured your brilliant insights and are already cooking up
        something amazing for you!
      </p>
    </motion.div>
  )
}
