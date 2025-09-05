"use client"

import { useState, useEffect } from "react"
import AIChatWidget from "../components/ai-chat-widget"
import BeautifulAlert from "../components/beautiful-alert"

export default function HomePage() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("") // New state for selected time
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0)
  const [calendarView, setCalendarView] = useState("list") // "list" or "monthly"
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertState, setAlertState] = useState<{ message: string; type: "success" | "error" | "info"; isVisible: boolean }>({
    message: "",
    type: "info",
    isVisible: false
  })

  // Handle hydration mismatch by ensuring client-side state is consistent
  useEffect(() => {
    // This effect runs only on the client side
    setShowCalendar(false)
    setShowMobileMenu(false)
  }, [])

  const services = ["AI Agents & Automation", "Custom Software", "AI Implementation", "Technical Consulting"]

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        })
      }
    }
    return dates
  }

  const generateMonthlyCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isPast = date < today
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isAvailable = isCurrentMonth && !isPast && !isWeekend

      days.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        isCurrentMonth,
        isAvailable,
        isPast,
        isWeekend,
      })
    }

    return days
  }

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const availableDates = generateAvailableDates()
  const monthlyDays = generateMonthlyCalendar()

  const heroButtons = [
    { label: "Contact", action: () => handleScheduleCall() },
    { label: "Products", action: () => (window.location.href = "/products") },
    { label: "Work", action: () => (window.location.href = "/work") }, // Added navigation to work page
  ]

  const handleScheduleCall = (customerData?: any) => {
    setShowCalendar(true)

    // If customer data is passed from chat widget, populate the form
    if (customerData) {
      setCustomerName(customerData.name || "")
      setCustomerEmail(customerData.email || "")
      setProjectDescription(customerData.project || "")
      if (customerData.service) {
        setSelectedService(customerData.service)
      }
      if (customerData.chatHistory) {
        setChatHistory(customerData.chatHistory)
      }
    }
  }

  const handleSwipeLeft = () => {
    setCurrentButtonIndex((prev) => (prev + 1) % heroButtons.length)
  }

  const handleSwipeRight = () => {
    setCurrentButtonIndex((prev) => (prev - 1 + heroButtons.length) % heroButtons.length)
  }

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirmBooking = async () => {
    const missingFields = []

    if (!selectedService) missingFields.push("service type")
    if (!selectedDate) missingFields.push("date")
    if (!selectedTime) missingFields.push("time")
    if (!customerName.trim()) missingFields.push("name")
    if (!customerEmail.trim()) missingFields.push("email")

    if (missingFields.length > 0) {
      setAlertState({
        message: `Please fill in the following required fields: ${missingFields.join(", ")}`,
        type: "error",
        isVisible: true
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Sending email with chat history:', chatHistory.length, 'messages')
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          email: customerEmail,
          service: selectedService,
          project: projectDescription,
          date: selectedDate,
          time: selectedTime,
          phone: "", // Add phone field if needed
          chatHistory: chatHistory
        }),
      })

      if (response.ok) {
        setAlertState({
          message: "Appointment booked successfully! Check your email for confirmation.",
          type: "success",
          isVisible: true
        })
        setShowCalendar(false)
        // Reset form
        setSelectedService("")
        setSelectedDate("")
        setSelectedTime("")
        setCustomerName("")
        setCustomerEmail("")
        setProjectDescription("")
        setChatHistory([])

        // Clear localStorage
        localStorage.removeItem('lumora_customer_data')
      } else {
        setAlertState({
          message: "Failed to book appointment. Please try again.",
          type: "error",
          isVisible: true
        })
      }
    } catch (error) {
      console.error('Booking error:', error)
      setAlertState({
        message: "Failed to book appointment. Please try again.",
        type: "error",
        isVisible: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeAlert = () => {
    setAlertState((prev: { message: string; type: "success" | "error" | "info"; isVisible: boolean }) => ({ ...prev, isVisible: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-violet-100/40 to-violet-50/70 text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-violet-50/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="font-mono text-xl font-semibold text-foreground">Lls</div>
          <button
            onClick={() => setShowMobileMenu(true)}
            className="p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-background border-r border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-12">
                <div className="font-mono text-xl font-semibold text-foreground">lumoralabs</div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-8">
                <button
                  onClick={() => {
                    handleScheduleCall()
                    setShowMobileMenu(false)
                  }}
                  className="block w-full text-left font-sans text-lg text-foreground hover:text-accent transition-colors"
                >
                  Contact
                </button>
                <a
                  href="/products"
                  onClick={() => setShowMobileMenu(false)}
                  className="block font-sans text-lg text-foreground hover:text-accent transition-colors"
                >
                  Products
                </a>
                <a
                  href="/about"
                  onClick={() => setShowMobileMenu(false)}
                  className="block font-sans text-lg text-foreground hover:text-accent transition-colors"
                >
                  About
                </a>
                <a // Changed from button to link for work navigation
                  href="/work"
                  onClick={() => setShowMobileMenu(false)}
                  className="block font-sans text-lg text-foreground hover:text-accent transition-colors"
                >
                  Work
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-mono text-2xl text-foreground">./schedule</h2>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block font-sans text-sm text-muted-foreground mb-4">Service Type <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 border text-left transition-colors font-sans text-sm ${selectedService === service
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                          }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block font-sans text-sm text-muted-foreground">Select Date <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalendarView("list")}
                        className={`px-3 py-1 text-xs font-mono transition-colors ${calendarView === "list"
                          ? "text-foreground border-b border-accent"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        Next 2 Weeks
                      </button>
                      <button
                        onClick={() => setCalendarView("monthly")}
                        className={`px-3 py-1 text-xs font-mono transition-colors ${calendarView === "monthly"
                          ? "text-foreground border-b border-accent"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        Monthly View
                      </button>
                    </div>
                  </div>

                  {calendarView === "list" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableDates.map((dateObj) => (
                        <button
                          key={dateObj.date}
                          onClick={() => setSelectedDate(dateObj.date)}
                          className={`p-3 border text-center transition-colors font-mono text-sm ${selectedDate === dateObj.date
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                            }`}
                        >
                          {dateObj.display}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="15,18 9,12 15,6"></polyline>
                          </svg>
                        </button>
                        <h3 className="font-mono text-lg text-foreground">
                          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h3>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="9,18 15,12 9,6"></polyline>
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="p-2 text-center text-xs font-mono text-muted-foreground">
                            {day}
                          </div>
                        ))}
                        {monthlyDays.map((day, index) => (
                          <button
                            key={index}
                            onClick={() => day.isAvailable && setSelectedDate(day.date)}
                            disabled={!day.isAvailable}
                            className={`p-2 text-center text-sm font-mono transition-colors ${!day.isCurrentMonth
                              ? "text-muted-foreground/30"
                              : day.isAvailable
                                ? selectedDate === day.date
                                  ? "bg-accent/20 border border-accent text-foreground"
                                  : "text-foreground hover:bg-accent/10 hover:border hover:border-accent"
                                : "text-muted-foreground/50 cursor-not-allowed"
                              }`}
                          >
                            {day.day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedDate && (
                  <div>
                    <label className="block font-sans text-sm text-muted-foreground mb-4">Select Time <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelection(time)}
                          className={`p-3 border border-border text-center transition-colors font-mono text-sm text-muted-foreground hover:border-accent hover:text-foreground ${selectedTime === time ? "bg-accent/10 border-accent text-foreground" : ""
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-border pb-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none transition-colors font-sans"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-border pb-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none transition-colors font-sans"
                      suppressHydrationWarning
                    />
                  </div>
                  <textarea
                    placeholder="Brief description of your project (optional)"
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-border pb-3 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none transition-colors resize-none font-sans"
                    suppressHydrationWarning
                  />
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full disabled:opacity-50"
                >
                  <span className="relative z-10 px-8 py-4 block text-foreground group-hover:text-background transition-colors duration-300 font-sans">
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </span>
                  <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="min-h-screen flex items-center justify-center px-8 pt-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="font-mono text-6xl md:text-8xl lg:text-9xl font-normal text-foreground leading-none tracking-tight">
              lumoralabs
            </h1>
            <div className="w-24 h-px bg-accent mx-auto"></div>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Software that Thinks Ahead
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="hidden sm:flex gap-8 text-sm font-sans">
              <button
                onClick={heroButtons[0].action}
                className="group relative px-8 py-3 border border-border hover:border-foreground transition-all duration-300"
              >
                <span className="text-foreground group-hover:text-foreground transition-colors font-sans text-sm">
                  {heroButtons[0].label}
                </span>
              </button>
              <a
                href="/products"
                className="group relative px-8 py-3 border border-border hover:border-foreground transition-all duration-300"
              >
                <span className="text-foreground group-hover:text-foreground transition-colors font-sans text-sm">
                  {heroButtons[1].label}
                </span>
              </a>
              <a
                href="/work"
                className="group relative px-8 py-3 border border-border hover:border-foreground transition-all duration-300"
              >
                <span className="text-foreground group-hover:text-foreground transition-colors font-sans text-sm">
                  {heroButtons[2].label}
                </span>
              </a>
            </div>

            <div className="sm:hidden relative w-full max-w-xs">
              <div
                className="overflow-hidden"
                onTouchStart={(e) => {
                  const startX = e.touches[0].clientX
                  const handleTouchEnd = (endEvent: TouchEvent) => {
                    const endX = endEvent.changedTouches[0].clientX
                    const diff = startX - endX
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) handleSwipeLeft()
                      else handleSwipeRight()
                    }
                    document.removeEventListener("touchend", handleTouchEnd)
                  }
                  document.addEventListener("touchend", handleTouchEnd)
                }}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentButtonIndex * 100}%)` }}
                >
                  {heroButtons.map((button, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <button
                        onClick={button.action}
                        className="group relative w-full px-8 py-3 border border-border hover:border-foreground transition-all duration-300"
                      >
                        <span className="text-foreground group-hover:text-foreground transition-colors font-sans text-sm">
                          {button.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {heroButtons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentButtonIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentButtonIndex ? "bg-accent" : "bg-border"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-mono text-4xl md:text-5xl font-normal text-foreground mb-8 leading-tight">
                ./services
              </h2>
            </div>
            <div className="space-y-12">
              <div className="group">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  AI Agents & Automation
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Custom AI agents that work alongside your team, automate complex workflows, and help businesses
                  harness the power of artificial intelligence to scale operations.
                </p>
              </div>
              <div className="group">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  Custom Software
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Human-centered applications designed to empower your team and grow with your business—not just tools,
                  but partners in progress.
                </p>
              </div>
              <div className="group">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  AI Implementation
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Help businesses and individuals adopt AI technologies, from strategy and training to building custom
                  AI solutions that fit your specific needs.
                </p>
              </div>
              <div className="group">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  Technical Consulting
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Strategic guidance on AI implementation, technology architecture, and digital transformation to turn
                  ambitious ideas into reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-mono text-4xl md:text-5xl font-normal text-foreground mb-8 leading-tight">./about</h2>
            </div>
            <div className="space-y-6">
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                We're a collective of engineers and data scientists who've navigated the full spectrum—from fast-moving
                startups to enterprise financial institutions. We've seen what works, what doesn't, and what's possible
                when technology meets human ambition.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Now we're building something different. We believe technology should amplify human potential, not
                replace it. Every solution we craft combines cutting-edge AI with human-centered design, creating
                software that doesn't just work—it evolves, learns, and grows alongside your vision.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                This is software that thinks ahead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="font-mono text-4xl md:text-5xl font-normal text-foreground mb-6 md:mb-8 leading-tight">
                ./connect
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                Ready to build something extraordinary? Let's turn your vision into intelligent reality.
              </p>
              <div className="space-y-3 md:space-y-4 font-mono text-muted-foreground">
                <div>hello@lumoralabs.com</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="name"
                  className="w-full bg-transparent border-0 border-b border-border/20 pb-2 text-foreground placeholder-muted-foreground/60 focus:border-accent focus:outline-none transition-all duration-500 font-mono text-sm tracking-wide focus:placeholder-transparent"
                  suppressHydrationWarning
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="email"
                  className="w-full bg-transparent border-0 border-b border-border/20 pb-2 text-foreground placeholder-muted-foreground/60 focus:border-accent focus:outline-none transition-all duration-500 font-mono text-sm tracking-wide focus:placeholder-transparent"
                  suppressHydrationWarning
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="project details"
                  rows={3}
                  className="w-full bg-transparent border-0 border-b border-border/20 pb-2 text-foreground placeholder-muted-foreground/60 focus:border-accent focus:outline-none transition-all duration-500 resize-none font-mono text-sm tracking-wide focus:placeholder-transparent"
                  suppressHydrationWarning
                />
              </div>
              <button onClick={handleScheduleCall} className="group relative mt-6 md:mt-8">
                <span className="font-mono text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  ./schedule_call
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="font-mono text-2xl text-foreground mb-4">lumoralabs</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Software that thinks ahead</p>
            </div>

            <div>
              <h3 className="font-mono text-lg text-foreground mb-4">Pages</h3>
              <nav className="space-y-2">
                <a
                  href="/about"
                  className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
                <a
                  href="/products"
                  className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Products
                </a>
                <a
                  href="/work"
                  className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Work
                </a>
              </nav>
            </div>

            <div>
              <h3 className="font-mono text-lg text-foreground mb-4">Company</h3>
              <nav className="space-y-2">
                <a
                  href="/careers"
                  className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
                <button
                  onClick={handleScheduleCall}
                  className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex justify-between items-center">
            <div className="font-sans text-sm text-muted-foreground">© 2025 lumoralabs</div>
            <div className="font-mono text-sm text-muted-foreground">./end</div>
          </div>
        </div>
      </footer>

      <AIChatWidget onOpenScheduler={handleScheduleCall} />
      <BeautifulAlert
        message={alertState.message}
        type={alertState.type}
        isVisible={alertState.isVisible}
        onClose={closeAlert}
      />
    </div>
  )
}
