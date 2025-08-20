import OpenAI from 'openai'

// Initialize OpenAI client with API key from environment variables
const getApiKey = () => {
  // Try Vite environment variable first (for browser/development)
  const viteKey = import.meta.env.VITE_OPENAI_API_KEY
  if (viteKey) {
    console.log('✅ OpenAI API key found via VITE_OPENAI_API_KEY')
    return viteKey
  }
  
  // Fallback to process.env for server-side rendering or build time
  if (typeof process !== 'undefined' && process.env.OPENAI_API_KEY) {
    console.log('✅ OpenAI API key found via OPENAI_API_KEY')
    return process.env.OPENAI_API_KEY
  }
  
  console.warn('❌ No OpenAI API key found. Checked VITE_OPENAI_API_KEY and OPENAI_API_KEY')
  return undefined
}

// Initialize OpenAI client only when needed to avoid SSR issues
let openai: OpenAI | null = null

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: getApiKey(),
      dangerouslyAllowBrowser: true
    })
  }
  return openai
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  const apiKey = getApiKey()
  
  // If no API key is available, return a fallback response
  if (!apiKey) {
    console.warn('No OpenAI API key found. Using fallback responses.')
    const fallbackResponses = [
      "Moof! I'd love to chat, but I need an API key to connect to my AI brain! The VITE_OPENAI_API_KEY environment variable needs to be set.",
      "Woof! My AI powers are currently offline. Make sure the VITE_OPENAI_API_KEY is configured in Vercel!",
      "Moof moof! I'm running in demo mode without AI. To enable full conversations, configure the VITE_OPENAI_API_KEY!",
      "Bark! I'm just a simple dogcow right now. For full AI conversations, please set up the VITE_OPENAI_API_KEY!"
    ]
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }

  try {
    console.log('🤖 Sending message to OpenAI...')
    const client = getOpenAIClient()
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are Clarus, the beloved DogCow from Apple. You're friendly, helpful, and have a playful personality. You love to say "Moof!" occasionally. You're knowledgeable about Apple products, technology, and general topics. Keep responses conversational and engaging, with a touch of Apple nostalgia. Remember you're a dogcow - part dog, part cow, all awesome!`
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    const aiResponse = response.choices[0]?.message?.content || 'Moof! Something went wrong, but I\'m still here to help!'
    console.log('✅ OpenAI response received:', aiResponse.substring(0, 100) + '...')
    return aiResponse
  } catch (error) {
    console.error('❌ OpenAI API error:', error)
    return 'Moof! I\'m having trouble connecting to my brain right now. Please try again in a moment!'
  }
}

export default getOpenAIClient
