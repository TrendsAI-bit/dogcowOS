import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Finder, 
  MessageCircle, 
  Camera, 
  Music, 
  Calendar,
  Settings,
  Globe,
  Terminal,
  Trash2
} from 'lucide-react'
import DogCowAvatar from './DogCowAvatar'

interface DockProps {
  onDogCowClick: () => void
  wallpaper: string
  setWallpaper: (wallpaper: string) => void
}

const Dock: React.FC<DockProps> = ({ onDogCowClick, wallpaper, setWallpaper }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showTrash, setShowTrash] = useState(false)

  const dockItems = [
    { id: 'finder', icon: Finder, label: 'Finder', color: 'text-blue-400' },
    { id: 'dogcow', icon: null, label: 'Clarus the DogCow', color: 'text-orange-400', special: true },
    { id: 'messages', icon: MessageCircle, label: 'Messages', color: 'text-green-400' },
    { id: 'camera', icon: Camera, label: 'Camera', color: 'text-gray-400' },
    { id: 'music', icon: Music, label: 'Music', color: 'text-red-400' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', color: 'text-red-500' },
    { id: 'safari', icon: Globe, label: 'Safari', color: 'text-blue-500' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'text-black' },
    { id: 'settings', icon: Settings, label: 'System Preferences', color: 'text-gray-500' },
  ]

  const handleItemClick = (itemId: string) => {
    switch (itemId) {
      case 'dogcow':
        onDogCowClick()
        break
      case 'finder':
        // Could open a file browser
        break
      case 'settings':
        // Could open settings panel
        break
      default:
        // Placeholder for other apps
        console.log(`Clicked ${itemId}`)
    }
  }

  const getItemScale = (itemId: string) => {
    if (hoveredItem === itemId) return 1.4
    if (hoveredItem && Math.abs(dockItems.findIndex(item => item.id === hoveredItem) - dockItems.findIndex(item => item.id === itemId)) === 1) {
      return 1.2
    }
    return 1
  }

  return (
    <>
      {/* Dock */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl px-3 py-2">
          <div className="flex items-end space-x-1">
            {dockItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                animate={{ 
                  scale: getItemScale(item.id),
                  y: hoveredItem === item.id ? -8 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors relative overflow-hidden ${
                    item.special 
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.special ? (
                    <DogCowAvatar mood="happy" size="small" />
                  ) : (
                    item.icon && <item.icon size={24} className={item.color} />
                  )}
                  
                  {/* Running indicator */}
                  {(item.id === 'dogcow' || item.id === 'finder') && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </motion.button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -10, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900/90 text-white text-xs rounded-lg backdrop-blur-sm whitespace-nowrap"
                    >
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Separator */}
            <div className="w-px h-8 bg-white/20 mx-1"></div>

            {/* Trash */}
            <motion.div
              className="relative flex flex-col items-center"
              onMouseEnter={() => {
                setHoveredItem('trash')
                setShowTrash(true)
              }}
              onMouseLeave={() => {
                setHoveredItem(null)
                setShowTrash(false)
              }}
              animate={{ 
                scale: hoveredItem === 'trash' ? 1.4 : 1,
                y: hoveredItem === 'trash' ? -8 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.button
                className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={24} className="text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {showTrash && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900/90 text-white text-xs rounded-lg backdrop-blur-sm whitespace-nowrap"
                  >
                    Trash (Empty)
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Icons */}
      <div className="fixed top-8 right-4 space-y-4 z-20">
        <motion.div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          onClick={onDogCowClick}
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <DogCowAvatar mood="happy" size="small" />
          </div>
          <span className="text-white text-xs text-center font-medium">Clarus</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Finder size={32} className="text-blue-400" />
          </div>
          <span className="text-white text-xs text-center font-medium">Finder</span>
        </motion.div>
      </div>
    </>
  )
}

export default Dock
