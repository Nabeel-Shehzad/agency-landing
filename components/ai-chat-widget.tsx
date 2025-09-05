"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

interface CustomerData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  project: string
  budget: string
  timeline: string
  date: string
  time: string
  scheduled: boolean
  chatHistory: Message[]
}

interface AIChatWidgetProps {
  onOpenScheduler?: (customerData?: CustomerData) => void
}

export default function AIChatWidget({ onOpenScheduler }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project: "",
    budget: "",
    timeline: "",
    date: "",
    time: "",
    scheduled: false,
    chatHistory: []
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Load customer data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('lumora_customer_data')
    if (savedData) {
      setCustomerData(JSON.parse(savedData))
    }
  }, [])

  // Save customer data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lumora_customer_data', JSON.stringify(customerData))
  }, [customerData])

  // Auto-open chat after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true)
        addBotMessage("👋 Hi! I'm the AI assistant for Lumora Labs. I'm here to help you find the perfect AI solution for your business. What brings you to our website today?")
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return

    addUserMessage(currentInput)
    const userMessage = currentInput
    setCurrentInput("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsTyping(false)
      handleBotResponse(userMessage)
    }, 1000 + Math.random() * 2000)
  }

  const handleBotResponse = (userMessage: string) => {
    switch (step) {
      case 0:
        // Initial greeting handled above
        setStep(1)
        addBotMessage("Great! I'd love to understand your needs better. Could you tell me your name and what company you work for?")
        break
      case 1:
        // Parse name and company
        const words = userMessage.split(' ')
        const name = words.slice(0, 2).join(' ')
        const company = words.slice(2).join(' ') || 'Not specified'

        setCustomerData(prev => ({ ...prev, name, company }))
        setStep(2)
        addBotMessage(`Nice to meet you ${name}! What type of AI solution are you looking for? We specialize in AI agents, automation, custom software, and AI implementation.`)
        break
      case 2:
        setCustomerData(prev => ({ ...prev, service: userMessage }))
        setStep(3)
        addBotMessage("Excellent choice! Can you tell me more about your project? What specific challenges are you trying to solve?")
        break
      case 3:
        setCustomerData(prev => ({ ...prev, project: userMessage }))
        setStep(4)
        addBotMessage("Thanks for sharing that! What's your budget range for this project? (e.g., $10k-$25k, $25k-$50k, $50k-$100k, $100k+)")
        break
      case 4:
        setCustomerData(prev => ({ ...prev, budget: userMessage }))
        setStep(5)
        addBotMessage("Got it! What's your timeline for this project? Are you looking to start immediately, within 1-3 months, or 3-6 months?")
        break
      case 5:
        setCustomerData(prev => ({ ...prev, timeline: userMessage }))
        setStep(6)
        addBotMessage("Perfect! To provide you with the best assistance, may I have your email address and phone number?")
        break
      case 6:
        // Parse email and phone
        const emailMatch = userMessage.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
        const phoneMatch = userMessage.match(/(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/)

        setCustomerData(prev => ({
          ...prev,
          email: emailMatch ? emailMatch[0] : "",
          phone: phoneMatch ? phoneMatch[0] : ""
        }))

        setStep(7)
        addBotMessage(`Thanks ${customerData.name}! Based on what you've shared, I think our ${customerData.service} solution would be perfect for your ${customerData.project} needs. Would you like me to help you schedule a consultation call with our team?`)
        break
      case 7:
        if (userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("schedule") || userMessage.toLowerCase().includes("call")) {
          if (onOpenScheduler) {
            const dataWithChat = { ...customerData, chatHistory: messages }
            onOpenScheduler(dataWithChat)
            setStep(8)
            addBotMessage("Perfect! I've opened our scheduling calendar for you. Please select your preferred date and time, and I'll handle the rest!")
          } else {
            setStep(8)
            addBotMessage("Great! Let me help you schedule that. What day works best for you this week?")
          }
        } else {
          setStep(9)
          addBotMessage("No problem! I've saved all your information. Our team will reach out to you within 24 hours. Is there anything else I can help you with?")
        }
        break
      case 8:
        // This will be handled by the scheduler component
        addBotMessage("I've noted your scheduling request. Once you select a time, I'll send you a confirmation email!")
        break
      case 9:
        addBotMessage("Thanks for chatting with me! Feel free to reach out anytime. Have a great day! 😊")
        break
      default:
        addBotMessage("I'm here to help! Feel free to ask me anything about our AI services, pricing, or scheduling.")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-accent text-background p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          aria-label="Open AI Chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            AI
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-background border border-border shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-violet-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-sm font-semibold text-foreground">AI Assistant</div>
                <div className="font-sans text-xs text-muted-foreground">Lumora Labs</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                    ? "bg-accent text-background"
                    : "bg-muted text-foreground"
                    }`}
                >
                  <p className="font-sans text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none transition-colors"
                suppressHydrationWarning
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentInput.trim()}
                className="bg-accent text-background p-2 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22,2 15,22 11,13 2,9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
