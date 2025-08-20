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
  const [wallpaper, setWallpaper] = useState('ventura-default')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    // Simulate loading time to ensure everything is ready
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
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
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white opacity-20 rounded-full"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: Math.random() * window.innerWidth,
                top: Math.random() * window.innerHeight,
              }}
            />
          ))}
        </div>
        
        <div className="text-center text-white z-10">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <img 
              src="/Logo.png" 
              alt="Clarus the DogCow" 
              className="w-32 h-32 mx-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255, 107, 53, 0.6))'
              }}
            />
          </motion.div>
          
          {/* Text Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              DogCow OS
            </h1>
            <motion.p 
              className="text-xl opacity-80 mb-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Booting up Clarus...
            </motion.p>
          </motion.div>
          
          {/* Loading Bar */}
          <motion.div
            className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.p 
            className="text-sm opacity-60 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Initializing AI companion...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: wallpapers[wallpaper as keyof typeof wallpapers] }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-10 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
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
