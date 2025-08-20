import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DogCowAvatar from './DogCowAvatar'
import DogCowLogo from './DogCowLogo'
import DogCow3D from './DogCow3D'
import DogCow3DImproved from './DogCow3DImproved'

interface MacOSDesktopProps {
  isDogCowActive: boolean
  setIsDogCowActive: (active: boolean) => void
}

const MacOSDesktop: React.FC<MacOSDesktopProps> = ({ isDogCowActive, setIsDogCowActive }) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)

  return (
    <div className="flex-1 relative overflow-hidden pt-8 pb-28">
      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcomeMessage && !isDogCowActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ paddingBottom: '6rem' }}
          >
            <div className="text-center text-white">
              <motion.div
                className="mb-8"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-64 h-64 cursor-pointer flex items-center justify-center" onClick={() => setIsDogCowActive(true)}>
                  <DogCowLogo mood="happy" size="large" onClick={() => setIsDogCowActive(true)} />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Welcome to DogCow OS
                </h1>
                <p className="text-xl text-gray-100 mb-8">
                  Meet Clarus, your AI-powered dogcow companion
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <motion.button
                    onClick={() => setIsDogCowActive(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Talk to Clarus
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowWelcomeMessage(false)}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold text-lg backdrop-blur-sm border border-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Desktop
                  </motion.button>
                </div>
                
                <motion.div
                  className="mt-12 text-sm text-gray-300"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p>Click on Clarus to start chatting, playing games, and more!</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Content (when welcome is dismissed) */}
      <AnimatePresence>
        {!showWelcomeMessage && !isDogCowActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full relative"
          >
            {/* Floating DogCow */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-32 h-32 cursor-pointer flex items-center justify-center">
                <DogCowLogo 
                  mood="happy" 
                  size="large" 
                  onClick={() => setIsDogCowActive(true)}
                />
              </div>
            </motion.div>

            {/* Desktop Text */}
            <motion.div
              className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">DogCow OS Desktop</h2>
              <p className="text-gray-300">Click on Clarus or use the dock to get started</p>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-20 left-20 text-4xl opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              🐕
            </motion.div>
            
            <motion.div
              className="absolute top-32 right-32 text-4xl opacity-30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              🐄
            </motion.div>
            
            <motion.div
              className="absolute bottom-40 left-32 text-3xl opacity-30"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              💫
            </motion.div>
            
            <motion.div
              className="absolute bottom-52 right-20 text-3xl opacity-30"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Menu (Right-click functionality) */}
      <div 
        className="absolute inset-0 z-0"
        onContextMenu={(e) => {
          e.preventDefault()
          // Could implement context menu here
        }}
      />
    </div>
  )
}

export default MacOSDesktop
