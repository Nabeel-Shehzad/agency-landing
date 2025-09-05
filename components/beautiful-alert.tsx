"use client"

import { useState, useEffect } from "react"

interface AlertProps {
  message: string
  type: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
}

export default function BeautifulAlert({ message, type, isVisible, onClose }: AlertProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/10 text-green-400"
      case "error":
        return "border-red-500/30 bg-red-500/10 text-red-400"
      case "info":
        return "border-accent/30 bg-accent/10 text-accent"
      default:
        return "border-accent/30 bg-accent/10 text-accent"
    }
  }

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className={`border p-4 rounded-lg shadow-lg backdrop-blur-sm max-w-sm ${getAlertStyles()}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {type === "success" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            )}
            {type === "error" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            {type === "info" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="font-sans text-sm">{message}</p>
          </div>
          <button
            onClick={() => {
              setShow(false)
              setTimeout(onClose, 300)
            }}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
