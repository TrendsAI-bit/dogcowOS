import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, MessageCircle, Gamepad2, Settings, Volume2, VolumeX } from 'lucide-react'
import DogCowAvatar from './DogCowAvatar'
import DogCowLogo from './DogCowLogo'
import DogCow3D from './DogCow3D'
import DogCow3DImproved from './DogCow3DImproved'
import ChatInterface from './ChatInterface'
import GameInterface from './GameInterface'
import { sendChatMessage, ChatMessage } from '../services/openai'

interface DogCowInterfaceProps {
  onClose: () => void
}

const DogCowInterface: React.FC<DogCowInterfaceProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'game' | 'settings'>('chat')
  const [dogCowMood, setDogCowMood] = useState<'happy' | 'excited' | 'thinking' | 'sleeping'>('happy')
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'dogcow', timestamp: Date}>>([
    {
      id: '1',
      text: "Moof! Welcome to DogCow OS! I'm Clarus, your friendly dogcow companion. How can I help you today?",
      sender: 'dogcow',
      timestamp: new Date()
    }
  ])

  const playMoofSound = () => {
    if (isSoundEnabled) {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 440 // A note
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const handleSendMessage = async (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setDogCowMood('thinking')
    playMoofSound()
    
    try {
      // Convert messages to ChatMessage format
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
      
      // Add the new user message
      chatMessages.push({
        role: 'user',
        content: message
      })
      
      // Get AI response
      const aiResponse = await sendChatMessage(chatMessages)
      
      const dogCowMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'dogcow' as const,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, dogCowMessage])
      setDogCowMood('happy')
      playMoofSound()
      
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Fallback response if API fails
      const fallbackResponse = "Moof! I'm having trouble connecting to my brain right now. But I'm still here to chat! Try asking me something else!"
      
      const dogCowMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'dogcow' as const,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, dogCowMessage])
      setDogCowMood('happy')
      playMoofSound()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <motion.div
        className="bg-gray-900/95 backdrop-blur-3xl rounded-3xl border border-gray-600 shadow-2xl w-full max-w-5xl h-5/6 flex flex-col overflow-hidden"
        layoutId="dogcow-window"
        style={{ 
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between p-5 border-b border-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
            <h2 className="text-white font-semibold text-xl">Clarus the DogCow</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - DogCow Avatar */}
          <div className="w-1/3 bg-gradient-to-b from-orange-500/25 to-orange-600/25 p-8 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <DogCowLogo mood={dogCowMood} size="large" onClick={() => playMoofSound()} />
              </div>
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-2">Clarus</h3>
                <p className="text-gray-300 text-base mb-4">Your AI DogCow Companion</p>
                <div className="flex items-center justify-center space-x-3 bg-black/20 rounded-full px-4 py-2">
                  <div className={`w-3 h-3 rounded-full ${dogCowMood === 'happy' ? 'bg-green-400' : dogCowMood === 'thinking' ? 'bg-yellow-400' : 'bg-blue-400'} animate-pulse`}></div>
                  <span className="text-sm text-gray-300 capitalize font-medium">{dogCowMood}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Interface */}
          <div className="flex-1 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 transition-colors ${
                  activeTab === 'chat' ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageCircle size={18} />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 transition-colors ${
                  activeTab === 'game' ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Gamepad2 size={18} />
                <span>Games</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 transition-colors ${
                  activeTab === 'settings' ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'chat' && (
                <ChatInterface 
                  messages={messages} 
                  onSendMessage={handleSendMessage}
                  setDogCowMood={setDogCowMood}
                />
              )}
              {activeTab === 'game' && (
                <GameInterface 
                  setDogCowMood={setDogCowMood}
                  playMoofSound={playMoofSound}
                />
              )}
              {activeTab === 'settings' && (
                <div className="p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Sound Effects</span>
                      <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className="flex items-center space-x-2 text-orange-400"
                      >
                        {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        <span>{isSoundEnabled ? 'On' : 'Off'}</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>DogCow Mood</span>
                      <select
                        value={dogCowMood}
                        onChange={(e) => setDogCowMood(e.target.value as any)}
                        className="bg-gray-800 text-white rounded px-2 py-1"
                      >
                        <option value="happy">Happy</option>
                        <option value="excited">Excited</option>
                        <option value="thinking">Thinking</option>
                        <option value="sleeping">Sleeping</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DogCowInterface
