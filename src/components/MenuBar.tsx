import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Apple, Wifi, Battery, Volume2, Search } from 'lucide-react'

interface MenuBarProps {
  currentTime: Date
  wallpaper: string
  setWallpaper: (wallpaper: string) => void
}

const MenuBar: React.FC<MenuBarProps> = ({ currentTime, wallpaper, setWallpaper }) => {
  const [showAppleMenu, setShowAppleMenu] = useState(false)
  const [showControlCenter, setShowControlCenter] = useState(false)

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const wallpaperOptions = [
    { id: 'ventura-default', name: 'Ventura Default', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'ventura-dark', name: 'Ventura Dark', preview: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
    { id: 'ventura-light', name: 'Ventura Light', preview: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 'dogcow-theme', name: 'DogCow Theme', preview: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' }
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-7 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium">
      {/* Left side - Apple menu and app menus */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            <Apple size={14} fill="currentColor" />
          </button>
          
          <AnimatePresence>
            {showAppleMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-0 mt-1 w-64 bg-gray-800/95 backdrop-blur-xl rounded-lg border border-gray-700 shadow-xl py-2"
              >
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="font-semibold">DogCow OS</h3>
                  <p className="text-xs text-gray-400">Version 1.0 (Clarus Edition)</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    About This Mac
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    System Preferences...
                  </button>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    App Store...
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    Recent Items
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    Force Quit...
                  </button>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    Sleep
                  </button>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    Restart...
                  </button>
                  <button className="w-full text-left px-4 py-1 hover:bg-gray-700/50 transition-colors">
                    Shut Down...
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <span className="font-bold">DogCow OS</span>
        <span className="text-gray-300">File</span>
        <span className="text-gray-300">Edit</span>
        <span className="text-gray-300">View</span>
        <span className="text-gray-300">Window</span>
        <span className="text-gray-300">Help</span>
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowControlCenter(!showControlCenter)}
            className="flex items-center space-x-3 hover:bg-white/10 p-1 rounded transition-colors"
          >
            <Search size={14} />
            <Volume2 size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </button>
          
          <AnimatePresence>
            {showControlCenter && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-1 w-80 bg-gray-800/95 backdrop-blur-xl rounded-lg border border-gray-700 shadow-xl p-4"
              >
                <h3 className="font-semibold mb-4">Control Center</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Wallpaper</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {wallpaperOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setWallpaper(option.id)
                            setShowControlCenter(false)
                          }}
                          className={`p-2 rounded-lg border-2 transition-colors ${
                            wallpaper === option.id 
                              ? 'border-orange-400' 
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <div 
                            className="w-full h-8 rounded mb-1"
                            style={{ background: option.preview }}
                          ></div>
                          <p className="text-xs">{option.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Wi-Fi</span>
                        <Wifi size={16} className="text-blue-400" />
                      </div>
                      <p className="text-xs text-gray-400">DogCow Network</p>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Battery</span>
                        <Battery size={16} className="text-green-400" />
                      </div>
                      <p className="text-xs text-gray-400">87% Charged</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <span className="font-mono text-xs">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  )
}

export default MenuBar
