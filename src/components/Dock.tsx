import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, 
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
import DogCowLogo from './DogCowLogo'
import DogCow3DImproved from './DogCow3DImproved'

interface DockProps {
  onDogCowClick: () => void
  wallpaper: string
  setWallpaper: (wallpaper: string) => void
}

const Dock: React.FC<DockProps> = ({ onDogCowClick, wallpaper, setWallpaper }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showTrash, setShowTrash] = useState(false)

  const dockItems = [
    { id: 'finder', icon: Folder, label: 'Finder', color: 'text-blue-400' },
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
        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl px-4 py-3" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <div className="flex items-end justify-center space-x-2">
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
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative overflow-hidden shadow-lg ${
                    item.special 
                      ? 'bg-gradient-to-br from-orange-400/80 to-orange-600/80 backdrop-blur-sm' 
                      : 'bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: item.special 
                      ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.8), rgba(247, 147, 30, 0.8))' 
                      : 'rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {item.special ? (
                    <DogCow3DImproved mood="happy" size="small" autoRotate={false} />
                  ) : (
                    item.icon && <item.icon size={28} className={item.color} />
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
            <div className="w-px h-10 bg-white/30 mx-2 self-center"></div>

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
                className="w-14 h-14 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={28} className="text-gray-300" />
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
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-lg">
            <DogCow3DImproved mood="happy" size="small" autoRotate={true} />
          </div>
          <span className="text-white text-xs text-center font-medium drop-shadow-sm">Clarus</span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-lg">
            <Folder size={36} className="text-blue-400" />
          </div>
          <span className="text-white text-xs text-center font-medium drop-shadow-sm">Finder</span>
        </motion.div>
      </div>
    </>
  )
}

export default Dock
