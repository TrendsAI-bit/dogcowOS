import React from 'react'
import { motion } from 'framer-motion'

interface DogCowLogoProps {
  mood: 'happy' | 'excited' | 'thinking' | 'sleeping'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const DogCowLogo: React.FC<DogCowLogoProps> = ({ mood, size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const getAnimationProps = () => {
    switch (mood) {
      case 'excited':
        return {
          animate: { 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          },
          transition: { 
            duration: 0.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case 'thinking':
        return {
          animate: { 
            rotate: [0, 2, -2, 0]
          },
          transition: { 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      case 'sleeping':
        return {
          animate: { 
            y: [0, 2, 0],
            opacity: [1, 0.8, 1]
          },
          transition: { 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      default:
        return {
          animate: { 
            y: [0, -4, 0]
          },
          transition: { 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
    }
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} cursor-pointer select-none relative flex items-center justify-center`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...getAnimationProps()}
      style={{
        filter: mood === 'excited' ? 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.6))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
      }}
    >
      <img 
        src="/Logo.png" 
        alt="Clarus the DogCow" 
        className="w-full h-full object-contain rounded-lg"
        style={{
          imageRendering: 'crisp-edges',
          WebkitImageRendering: 'crisp-edges'
        }}
      />

      {/* Mood indicators */}
      {mood === 'thinking' && (
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div className="text-xs">💭</div>
          </div>
        </motion.div>
      )}
      
      {mood === 'excited' && (
        <motion.div
          className="absolute -top-1 left-1/2 transform -translate-x-1/2"
          animate={{ y: [-5, -15, -5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="text-yellow-400 text-lg">✨</div>
        </motion.div>
      )}
      
      {mood === 'sleeping' && (
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-blue-300 text-sm">💤</div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DogCowLogo
