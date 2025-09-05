"use client"

import { useState } from "react"
import AIChatWidget from "../../components/ai-chat-widget"

export default function AboutPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-violet-100/40 to-violet-50/70 text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-violet-50/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-2">
          <a href="/" className="font-mono text-xl font-semibold text-foreground">
            Lls
          </a>
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
                <a
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="block font-sans text-lg text-foreground hover:text-accent transition-colors"
                >
                  Home
                </a>
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
              </nav>
            </div>
          </div>
        </div>
      )}

      <section className="min-h-screen flex items-center justify-center px-8 pt-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h1 className="font-mono text-5xl md:text-7xl font-normal text-foreground leading-none tracking-tight">
              ./about_us
            </h1>
            <div className="w-24 h-px bg-accent mx-auto"></div>
            <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The minds behind the mission
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-mono text-3xl md:text-4xl font-normal text-foreground mb-8 leading-tight">
                  ./our_story
                </h2>
              </div>
              <div className="space-y-6">
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  Founded by two engineers who understand that great software comes from real-world experience. We've
                  built systems that handle millions of transactions and crafted solutions that solve everyday problems.
                </p>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  Our focus is simple: create AI-powered tools that make businesses more efficient and help people
                  accomplish more with less effort. We build software that learns, adapts, and delivers results.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start border-t border-border pt-16">
              <div>
                <h2 className="font-mono text-3xl md:text-4xl font-normal text-foreground mb-8 leading-tight">
                  ./founders
                </h2>
              </div>
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-semibold text-foreground">Joseph Semple</h3>
                    <p className="font-mono text-sm text-accent">CoFounder & Engineer</p>
                  </div>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Joseph brings extensive engineering experience from both the financial technology sector and
                    high-growth startups including Grubhub and Fetch Rewards. His background spans building robust
                    financial systems and developing scalable consumer applications that serve millions of users.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-semibold text-foreground">Nabeel Shahzad</h3>
                    <p className="font-mono text-sm text-accent">CoFounder & Lead Engineer</p>
                  </div>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Nabeel is a software engineer specializing in AI agent development and full-stack application
                    design. His expertise in building intelligent automation systems and custom software solutions has
                    helped numerous clients streamline their operations and unlock new capabilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start border-t border-border pt-16">
              <div>
                <h2 className="font-mono text-3xl md:text-4xl font-normal text-foreground mb-8 leading-tight">
                  ./approach
                </h2>
              </div>
              <div className="space-y-6">
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  We believe the best technology solutions are built through understanding real business challenges.
                  Every project starts with listening, learning, and identifying where AI can create the most impact.
                </p>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  Our development process combines proven engineering practices with cutting-edge AI capabilities,
                  ensuring solutions that are both innovative and reliable.
                </p>
                <p className="font-sans text-lg text-accent font-medium">Building tomorrow's tools, today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="font-mono text-2xl text-foreground">
            lumoralabs
          </a>
          <div className="font-sans text-sm text-muted-foreground">© 2025</div>
        </div>
      </footer>

      <AIChatWidget />
    </div>
  )
}
