import { motion } from 'framer-motion'
import Image from 'next/image'
import PropTypes from 'prop-types' // Add this import

interface CardAnimationProps {
  text: string
  color?: string
  delay?: number
}

const CardAnimation: React.FC<CardAnimationProps> = ({
  text,
  color,
  delay,
}) => {
  return (
    <motion.div
      className="puzzle-piece w-full h-[250px] md:w-[95%] md:h-[600px] md:mt-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, 20, -10, 0] }}
      transition={{ duration: 1, delay: delay }}
      style={{
        // Set a specific height
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={text} alt="" fill className="rounded-xl object-cover" />
    </motion.div>
  )
}

// Add prop types validation
CardAnimation.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  delay: PropTypes.number,
}

export default CardAnimation
