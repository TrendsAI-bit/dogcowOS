import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MacOSDesktop from './components/MacOSDesktop'
import DogCowInterface from './components/DogCowInterface'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDogCowActive, setIsDogCowActive] = useState(false)
  const [wallpaper, setWallpaper] = useState('ventura-dark')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    // Simulate loading time to ensure everything is ready
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    
    return () => {
      clearInterval(timer)
      clearTimeout(loadingTimer)
    }
  }, [])

  const wallpapers = {
    'ventura-default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'ventura-dark': 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    'ventura-light': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'dogcow-theme': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
  }

  if (isLoading) {
    try {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {/* Apple-style background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
        
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center text-white z-10 space-y-8">
          {/* Apple Logo Style - Clarus Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src="/Logo.png"
              alt="Clarus the DogCow"
              className="w-20 h-20 mx-auto"
              style={{
                filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))'
              }}
            />
          </motion.div>

          {/* Apple-style loading bar */}
          <motion.div
            className="w-80 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Loading bar background */}
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 3.5, 
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.7, 1],
                  values: ["0%", "15%", "45%", "85%", "100%"]
                }}
              />
            </div>
            
            {/* Loading progress indicator dots */}
            <div className="flex justify-center mt-4 space-x-1">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-gray-500 rounded-full"
                  animate={{
                    backgroundColor: ["#6b7280", "#ffffff", "#6b7280"],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Apple-style system text */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-sm text-gray-400 font-light tracking-wide"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Starting up DogCow OS...
            </motion.p>
            
            {/* Boot sequence messages */}
            <motion.div
              className="text-xs text-gray-500 font-mono space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Initializing Clarus AI...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Loading system resources...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                Connecting to OpenAI API...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 3.2, duration: 0.5 }}
              >
                Preparing desktop environment...
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Apple copyright style */}
        <motion.div
          className="absolute bottom-8 text-center text-xs text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>DogCow OS • Powered by Clarus</p>
        </motion.div>
      </div>
      )
    } catch (error) {
      console.error('Loading screen error:', error)
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="text-4xl mb-4">🐕🐄</div>
            <h1 className="text-2xl mb-4">Loading DogCow OS...</h1>
            <p className="text-sm opacity-70">If this takes too long, please refresh the page</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: wallpapers[wallpaper as keyof typeof wallpapers] }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
          const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white opacity-10 rounded-full"
              animate={{
                x: [Math.random() * screenWidth, Math.random() * screenWidth],
                y: [Math.random() * screenHeight, Math.random() * screenHeight],
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: Math.random() * screenWidth,
                top: Math.random() * screenHeight,
              }}
            />
          )
        })}
      </div>

      {/* Menu Bar */}
      <MenuBar currentTime={currentTime} wallpaper={wallpaper} setWallpaper={setWallpaper} />

      {/* Main Desktop */}
      <MacOSDesktop 
        isDogCowActive={isDogCowActive} 
        setIsDogCowActive={setIsDogCowActive}
      />

      {/* DogCow Interface */}
      <AnimatePresence>
        {isDogCowActive && (
          <DogCowInterface onClose={() => setIsDogCowActive(false)} />
        )}
      </AnimatePresence>

      {/* Dock */}
      <Dock 
        onDogCowClick={() => setIsDogCowActive(true)}
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
      />
    </div>
  )
}

export default App
