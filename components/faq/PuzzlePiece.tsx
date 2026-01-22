import { motion } from 'framer-motion'
import Image from 'next/image'

interface PuzzlePieceProps {
  text: string
  color: string
  delay: number
}

function LaunchCard() {
  return (
    <div className="flex flex-col justify-center items-center rounded-lg h-full my-auto max-w-xs sm:max-w-sm w-full p-4">
      <div className="flex flex-col justify-center items-center rounded-lg h-full my-auto max-w-xs sm:max-w-sm">
        <Image
          src={'/images/icons/timeline.png'}
          alt=""
          width={100}
          height={100}
          className="sm:w-300 sm:h-300"
        />
        <h3 className="text-sm sm:text-xl xl:text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 my-3">
          Your vision, our expertise
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm px-2 sm:px-4 lg:px-8 mb-3">
          Time is valuable, and so is your project. We deliver quality websites
          on time—every time.
        </p>
        <p className="text-indigo-700 dark:text-indigo-400 text-sm sm:text-base hover:underline">
          www.yourwebsite.com
        </p>
      </div>
    </div>
  )
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = () => {
  return (
    <motion.div
      className={
        'h-full w-full flex justify-center items-center p-5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/70 dark:to-purple-900/70 rounded-lg shadow-sm  transition-all duration-300 ease-in-out'
      } // Added gradient background
    >
      <LaunchCard />
    </motion.div>
  )
}

export default PuzzlePiece
