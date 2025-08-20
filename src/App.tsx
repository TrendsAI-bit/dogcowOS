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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const wallpapers = {
    'ventura-default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'ventura-dark': 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    'ventura-light': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'dogcow-theme': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: wallpapers[wallpaper as keyof typeof wallpapers] }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
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
