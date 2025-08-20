import React from 'react'
import { motion } from 'framer-motion'

interface DogCowAvatarProps {
  mood: 'happy' | 'excited' | 'thinking' | 'sleeping'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const DogCowAvatar: React.FC<DogCowAvatarProps> = ({ mood, size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const getEyeState = () => {
    switch (mood) {
      case 'happy': return 'open'
      case 'excited': return 'wide'
      case 'thinking': return 'squint'
      case 'sleeping': return 'closed'
      default: return 'open'
    }
  }

  const getAnimationProps = () => {
    switch (mood) {
      case 'excited':
        return {
          animate: { 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0]
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
            y: [0, 2, 0]
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

  const eyeState = getEyeState()

  return (
    <motion.div
      className={`${sizeClasses[size]} cursor-pointer select-none relative`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...getAnimationProps()}
    >
      {/* Main DogCow SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        style={{
          filter: mood === 'excited' ? 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.6))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}
      >
        {/* Body */}
        <ellipse cx="100" cy="120" rx="45" ry="35" fill="#2D2D2D" stroke="#000" strokeWidth="3"/>
        
        {/* Head */}
        <ellipse cx="100" cy="70" rx="35" ry="30" fill="#F5F5F5" stroke="#000" strokeWidth="3"/>
        
        {/* Ears (Dog) */}
        <ellipse cx="80" cy="50" rx="12" ry="18" fill="#2D2D2D" stroke="#000" strokeWidth="2" transform="rotate(-30 80 50)"/>
        <ellipse cx="120" cy="50" rx="12" ry="18" fill="#2D2D2D" stroke="#000" strokeWidth="2" transform="rotate(30 120 50)"/>
        
        {/* Horns (Cow) */}
        <path d="M 85 45 Q 80 35 75 30" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 115 45 Q 120 35 125 30" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Eyes */}
        {eyeState === 'open' && (
          <>
            <circle cx="90" cy="65" r="4" fill="#000"/>
            <circle cx="110" cy="65" r="4" fill="#000"/>
            <circle cx="91" cy="63" r="1" fill="#FFF"/>
            <circle cx="111" cy="63" r="1" fill="#FFF"/>
          </>
        )}
        {eyeState === 'wide' && (
          <>
            <circle cx="90" cy="65" r="6" fill="#000"/>
            <circle cx="110" cy="65" r="6" fill="#000"/>
            <circle cx="91" cy="62" r="2" fill="#FFF"/>
            <circle cx="111" cy="62" r="2" fill="#FFF"/>
          </>
        )}
        {eyeState === 'squint' && (
          <>
            <path d="M 86 65 L 94 65" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 106 65 L 114 65" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </>
        )}
        {eyeState === 'closed' && (
          <>
            <path d="M 86 65 Q 90 62 94 65" stroke="#000" strokeWidth="2" fill="none"/>
            <path d="M 106 65 Q 110 62 114 65" stroke="#000" strokeWidth="2" fill="none"/>
          </>
        )}
        
        {/* Nose */}
        <ellipse cx="100" cy="75" rx="3" ry="2" fill="#000"/>
        
        {/* Mouth */}
        <path d="M 100 78 Q 95 82 90 80" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 100 78 Q 105 82 110 80" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Spots */}
        <circle cx="85" cy="110" r="8" fill="#2D2D2D"/>
        <circle cx="115" cy="125" r="6" fill="#2D2D2D"/>
        <circle cx="95" cy="135" r="5" fill="#2D2D2D"/>
        
        {/* Legs */}
        <rect x="75" y="145" width="8" height="20" fill="#2D2D2D" stroke="#000" strokeWidth="2"/>
        <rect x="90" y="145" width="8" height="20" fill="#2D2D2D" stroke="#000" strokeWidth="2"/>
        <rect x="102" y="145" width="8" height="20" fill="#2D2D2D" stroke="#000" strokeWidth="2"/>
        <rect x="117" y="145" width="8" height="20" fill="#2D2D2D" stroke="#000" strokeWidth="2"/>
        
        {/* Hooves */}
        <ellipse cx="79" cy="167" rx="6" ry="3" fill="#000"/>
        <ellipse cx="94" cy="167" rx="6" ry="3" fill="#000"/>
        <ellipse cx="106" cy="167" rx="6" ry="3" fill="#000"/>
        <ellipse cx="121" cy="167" rx="6" ry="3" fill="#000"/>
        
        {/* Tail */}
        <path d="M 145 115 Q 155 110 160 120 Q 155 130 150 125" fill="#2D2D2D" stroke="#000" strokeWidth="2"/>
        
        {/* Udder */}
        <ellipse cx="100" cy="140" rx="15" ry="8" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
        <circle cx="95" cy="145" r="2" fill="#FF69B4"/>
        <circle cx="105" cy="145" r="2" fill="#FF69B4"/>
      </svg>

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

export default DogCowAvatar
