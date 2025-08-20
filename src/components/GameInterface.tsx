import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Target, Zap } from 'lucide-react'

interface GameInterfaceProps {
  setDogCowMood: (mood: 'happy' | 'excited' | 'thinking' | 'sleeping') => void
  playMoofSound: () => void
}

const GameInterface: React.FC<GameInterfaceProps> = ({ setDogCowMood, playMoofSound }) => {
  const [activeGame, setActiveGame] = useState<'memory' | 'clicker' | 'riddle' | null>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, symbol: string, flipped: boolean, matched: boolean}>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [memoryMoves, setMemoryMoves] = useState(0)

  // Clicker Game State
  const [clickerCount, setClickerCount] = useState(0)
  const [clickerMultiplier, setClickerMultiplier] = useState(1)
  const [clickerUpgrades, setClickerUpgrades] = useState(0)

  // Riddle Game State
  const [currentRiddle, setCurrentRiddle] = useState(0)
  const [riddleAnswer, setRiddleAnswer] = useState('')
  const [riddleCorrect, setRiddleCorrect] = useState<boolean | null>(null)

  const riddles = [
    {
      question: "I'm part dog, part cow, and I say 'Moof!' What am I?",
      answer: "dogcow",
      hint: "You're talking to me right now!"
    },
    {
      question: "What sound does a dogcow make when it's happy?",
      answer: "moof",
      hint: "It's my signature sound!"
    },
    {
      question: "In what year was the dogcow first created?",
      answer: "1987",
      hint: "The late 80s, when computers were becoming popular!"
    },
    {
      question: "Who created the original dogcow icon?",
      answer: "susan kare",
      hint: "A famous Apple designer!"
    }
  ]

  const initializeMemoryGame = () => {
    const symbols = ['🐕', '🐄', '🌟', '🎵', '🎮', '💎', '🍎', '🚀']
    const cards = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false
    }))
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    
    setMemoryCards(cards)
    setFlippedCards([])
    setMemoryMoves(0)
    setScore(0)
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || memoryCards[cardId].flipped || memoryCards[cardId].matched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)
    
    const newCards = memoryCards.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    )
    setMemoryCards(newCards)

    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1)
      const [firstCard, secondCard] = newFlippedCards
      
      if (newCards[firstCard].symbol === newCards[secondCard].symbol) {
        // Match found
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === firstCard || card.id === secondCard 
              ? { ...card, matched: true }
              : card
          ))
          setFlippedCards([])
          setScore(prev => prev + 10)
          setDogCowMood('excited')
          playMoofSound()
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === firstCard || card.id === secondCard 
              ? { ...card, flipped: false }
              : card
          ))
          setFlippedCards([])
          setDogCowMood('thinking')
        }, 1000)
      }
    }
  }

  const handleClickerClick = () => {
    setClickerCount(prev => prev + clickerMultiplier)
    setScore(prev => prev + clickerMultiplier)
    setDogCowMood('excited')
    playMoofSound()
  }

  const buyUpgrade = () => {
    const cost = (clickerUpgrades + 1) * 50
    if (clickerCount >= cost) {
      setClickerCount(prev => prev - cost)
      setClickerUpgrades(prev => prev + 1)
      setClickerMultiplier(prev => prev + 1)
      setDogCowMood('happy')
    }
  }

  const checkRiddleAnswer = () => {
    const correct = riddleAnswer.toLowerCase().trim() === riddles[currentRiddle].answer.toLowerCase()
    setRiddleCorrect(correct)
    
    if (correct) {
      setScore(prev => prev + 25)
      setDogCowMood('excited')
      playMoofSound()
      setTimeout(() => {
        if (currentRiddle < riddles.length - 1) {
          setCurrentRiddle(prev => prev + 1)
          setRiddleAnswer('')
          setRiddleCorrect(null)
        }
      }, 2000)
    } else {
      setDogCowMood('thinking')
    }
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  const startGame = (gameType: 'memory' | 'clicker' | 'riddle') => {
    setActiveGame(gameType)
    setScore(0)
    setDogCowMood('excited')
    
    if (gameType === 'memory') {
      initializeMemoryGame()
    } else if (gameType === 'clicker') {
      setClickerCount(0)
      setClickerMultiplier(1)
      setClickerUpgrades(0)
    } else if (gameType === 'riddle') {
      setCurrentRiddle(0)
      setRiddleAnswer('')
      setRiddleCorrect(null)
    }
  }

  const resetGame = () => {
    setActiveGame(null)
    setScore(0)
    setDogCowMood('happy')
  }

  if (!activeGame) {
    return (
      <div className="p-6 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">DogCow Games</h3>
          <p className="text-gray-300">Choose a game to play with Clarus!</p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={20} />
              <span>High Score: {highScore}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <motion.button
            onClick={() => startGame('memory')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🧠</div>
              <div className="text-left">
                <h4 className="font-bold">Memory Match</h4>
                <p className="text-sm opacity-80">Match pairs of cards</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => startGame('clicker')}
            className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Zap className="text-3xl" />
              <div className="text-left">
                <h4 className="font-bold">Moof Clicker</h4>
                <p className="text-sm opacity-80">Click to make Clarus moof!</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => startGame('riddle')}
            className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🤔</div>
              <div className="text-left">
                <h4 className="font-bold">DogCow Riddles</h4>
                <p className="text-sm opacity-80">Test your DogCow knowledge</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 text-white">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold capitalize">{activeGame} Game</h3>
          <p className="text-gray-300">Score: {score}</p>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCcw size={16} />
          <span>Back</span>
        </button>
      </div>

      {/* Memory Game */}
      {activeGame === 'memory' && (
        <div>
          <div className="mb-4 text-center">
            <p>Moves: {memoryMoves}</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {memoryCards.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-2xl flex items-center justify-center ${
                  card.flipped || card.matched 
                    ? 'bg-white text-black' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={card.matched}
              >
                {card.flipped || card.matched ? card.symbol : '?'}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Clicker Game */}
      {activeGame === 'clicker' && (
        <div className="text-center">
          <div className="mb-6">
            <p className="text-3xl font-bold mb-2">{clickerCount} Moofs</p>
            <p className="text-gray-300">Multiplier: x{clickerMultiplier}</p>
          </div>
          
          <motion.button
            onClick={handleClickerClick}
            className="bg-orange-500 hover:bg-orange-600 w-32 h-32 rounded-full text-6xl mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🐄
          </motion.button>
          
          <div>
            <button
              onClick={buyUpgrade}
              disabled={clickerCount < (clickerUpgrades + 1) * 50}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg transition-colors"
            >
              Upgrade (+1 per click) - Cost: {(clickerUpgrades + 1) * 50} moofs
            </button>
          </div>
        </div>
      )}

      {/* Riddle Game */}
      {activeGame === 'riddle' && (
        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Question {currentRiddle + 1} of {riddles.length}</p>
            <h4 className="text-lg mb-4">{riddles[currentRiddle].question}</h4>
            
            <div className="space-y-4">
              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                placeholder="Your answer..."
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onKeyPress={(e) => e.key === 'Enter' && checkRiddleAnswer()}
              />
              
              <button
                onClick={checkRiddleAnswer}
                disabled={!riddleAnswer.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
              >
                Submit Answer
              </button>
            </div>

            <AnimatePresence>
              {riddleCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-lg ${riddleCorrect ? 'bg-green-600' : 'bg-red-600'}`}
                >
                  {riddleCorrect ? (
                    <p>🎉 Correct! Great job!</p>
                  ) : (
                    <div>
                      <p>❌ Not quite right.</p>
                      <p className="text-sm mt-2">Hint: {riddles[currentRiddle].hint}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameInterface
