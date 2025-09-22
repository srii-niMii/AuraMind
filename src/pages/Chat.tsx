import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Heart, Calendar, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  showBookingPrompt?: boolean
  riskDetected?: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm here to provide support and coping strategies. How are you feeling today? You can share as much or as little as you'd like - this conversation is completely confidential.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const quickResponses = [
    "I'm feeling stressed about exams",
    "I'm having trouble sleeping",
    "I feel anxious about the future",
    "I'm struggling with motivation",
    "I feel overwhelmed",
  ]

  const copingStrategies = {
    stress: "Here are some immediate stress relief techniques:\n\n• Take 5 deep breaths (4 counts in, 6 counts out)\n• Try the 5-4-3-2-1 grounding technique\n• Take a 10-minute walk outside\n• Listen to calming music\n\nRemember: It's normal to feel stressed during exams. You're capable of handling this.",
    anxiety: "For anxiety, try these techniques:\n\n• Practice mindfulness meditation (even 5 minutes helps)\n• Challenge negative thoughts - are they realistic?\n• Focus on what you can control right now\n• Reach out to a friend or family member\n\nYou're not alone in feeling this way. Many students experience anxiety.",
    sleep: "Sleep troubles are common among students. Try:\n\n• Set a consistent bedtime routine\n• Avoid screens 1 hour before bed\n• Try progressive muscle relaxation\n• Keep your room cool and dark\n\nGood sleep is crucial for mental health and academic performance.",
    overwhelmed: "When feeling overwhelmed:\n\n• Break large tasks into smaller steps\n• Prioritize what's most important today\n• It's okay to say no to additional commitments\n• Take regular breaks\n\nRemember: You don't have to do everything perfectly.",
    motivation: "For motivation struggles:\n\n• Start with just 5 minutes of the task\n• Celebrate small accomplishments\n• Connect your work to your bigger goals\n• Change your environment\n\nLow motivation doesn't mean you're failing - it's temporary."
  }

  const detectConcern = (message: string): { strategy: string; riskLevel: 'low' | 'moderate' | 'high' } => {
    const lowerMessage = message.toLowerCase()
    
    // High risk keywords
    if (lowerMessage.includes('hurt myself') || lowerMessage.includes('suicide') || lowerMessage.includes('end it all') || lowerMessage.includes('not worth living')) {
      return { strategy: 'crisis', riskLevel: 'high' }
    }
    
    // Moderate risk
    if (lowerMessage.includes('hopeless') || lowerMessage.includes('can\'t go on') || lowerMessage.includes('no point')) {
      return { strategy: 'support', riskLevel: 'moderate' }
    }
    
    // Common concerns
    if (lowerMessage.includes('stress') || lowerMessage.includes('exam')) {
      return { strategy: 'stress', riskLevel: 'low' }
    }
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry')) {
      return { strategy: 'anxiety', riskLevel: 'low' }
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return { strategy: 'sleep', riskLevel: 'low' }
    }
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much')) {
      return { strategy: 'overwhelmed', riskLevel: 'low' }
    }
    if (lowerMessage.includes('motivation') || lowerMessage.includes('procrastinating') || lowerMessage.includes('focus')) {
      return { strategy: 'motivation', riskLevel: 'low' }
    }
    
    return { strategy: 'general', riskLevel: 'low' }
  }

  const generateBotResponse = (userMessage: string): Message => {
    const concern = detectConcern(userMessage)
    
    if (concern.strategy === 'crisis') {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis helpline immediately:\n\n🆘 National Suicide Prevention Lifeline: 988\n🆘 Crisis Text Line: Text HOME to 741741\n\nYou deserve support and there are people who want to help you through this.",
        timestamp: new Date(),
        riskDetected: true,
        showBookingPrompt: true
      }
    }
    
    if (concern.strategy === 'support') {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I hear that you're going through a really difficult time. These feelings can be overwhelming, but you don't have to face them alone.\n\nIt might be helpful to speak with a counselor who can provide personalized support. Would you like me to help you book an appointment?",
        timestamp: new Date(),
        showBookingPrompt: true
      }
    }
    
    const strategy = copingStrategies[concern.strategy as keyof typeof copingStrategies]
    
    if (strategy) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: strategy + (concern.riskLevel === 'moderate' ? "\n\nIf these feelings persist or get worse, please consider speaking with a counselor." : ""),
        timestamp: new Date(),
        showBookingPrompt: concern.riskLevel === 'moderate'
      }
    }
    
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "Thank you for sharing that with me. It takes courage to reach out. Can you tell me more about what's been bothering you? I'm here to listen and provide support.\n\nSome things I can help with:\n• Stress and anxiety management\n• Sleep difficulties\n• Study motivation\n• General emotional support",
      timestamp: new Date()
    }
  }

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim()
    if (!messageContent) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageContent)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-wellness rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-[#57c9e0]" />
                </div>
              </div>
              <CardTitle className="text-2xl">AI Support Chat</CardTitle>
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="secondary">Confidential</Badge>
                <Badge variant="secondary">24/7 Available</Badge>
                <Badge variant="secondary">Immediate Support</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-primary' : 'bg-wellness'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                        {message.riskDetected && (
                          <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <div className="flex items-center gap-2 text-destructive">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="font-semibold">Crisis Support Needed</span>
                            </div>
                          </div>
                        )}
                        {message.showBookingPrompt && (
                          <div className="mt-3 p-3 bg-calm/10 border border-calm/20 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">
                              Would you like to speak with a professional counselor?
                            </p>
                            <Link to="/bookings">
                              <Button size="sm" variant="outline" className="w-full">
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Counseling Session
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-wellness rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Responses */}
            {messages.length === 1 && (
              <div className="px-6 py-2 border-t">
                <p className="text-sm text-muted-foreground mb-3">Quick responses:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response) => (
                    <Button
                      key={response}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(response)}
                      className="text-xs"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... (Press Enter to send)"
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This chat is confidential and secure. If you're having thoughts of self-harm, please reach out to a crisis helpline immediately.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}