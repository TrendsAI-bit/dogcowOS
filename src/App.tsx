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
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="text-center text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-4"
          >
            🐕🐄
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">DogCow OS</h1>
          <p className="text-xl opacity-80">Loading Clarus...</p>
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
