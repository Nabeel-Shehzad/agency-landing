"use client"

import AIChatWidget from "../../components/ai-chat-widget"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-violet-100/40 to-violet-50/70 text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-violet-50/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-2">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Lumora Labs Logo"
              className="h-10 w-auto"
            />
          </a>
          <a href="/" className="p-2 text-foreground hover:text-accent transition-colors" aria-label="Back to home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </a>
        </div>
      </nav>

      <main className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-mono text-5xl md:text-7xl font-normal text-foreground leading-none tracking-tight mb-6">
              ./careers
            </h1>
            <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join us in building the future of intelligent software. We're looking for passionate individuals who want
              to shape how AI transforms business.
            </p>
          </div>

          <div className="space-y-12">
            <div className="border border-border p-8 hover:border-accent transition-colors group">
              <h2 className="font-mono text-2xl text-foreground mb-4 group-hover:text-accent transition-colors">
                AI/ML Engineer
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                Your bread and butter for building AI models, implementing algorithms, and handling data pipelines.
                Shape the core intelligence that powers our solutions.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-muted-foreground">Full-time • Remote</span>
                <button className="font-mono text-sm text-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent">
                  Apply →
                </button>
              </div>
            </div>

            <div className="border border-border p-8 hover:border-accent transition-colors group">
              <h2 className="font-mono text-2xl text-foreground mb-4 group-hover:text-accent transition-colors">
                Full-Stack Developer
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                Build the applications, APIs, and user interfaces that deliver our AI capabilities. Create seamless
                experiences that make complex technology feel simple.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-muted-foreground">Full-time • Remote</span>
                <button className="font-mono text-sm text-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent">
                  Apply →
                </button>
              </div>
            </div>

            <div className="border border-border p-8 hover:border-accent transition-colors group">
              <h2 className="font-mono text-2xl text-foreground mb-4 group-hover:text-accent transition-colors">
                Product Manager
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                Bridge technical and business needs, define requirements, and manage roadmaps. Guide our products from
                ambitious ideas to market-ready solutions.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-muted-foreground">Full-time • Remote</span>
                <button className="font-mono text-sm text-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent">
                  Apply →
                </button>
              </div>
            </div>

            <div className="border border-border p-8 hover:border-accent transition-colors group">
              <h2 className="font-mono text-2xl text-foreground mb-4 group-hover:text-accent transition-colors">
                Client Project Manager
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                Lead client relationships and project delivery from inception to completion. Ensure seamless
                communication between technical teams and clients while managing timelines, expectations, and project
                success.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-muted-foreground">Full-time • Remote</span>
                <button className="font-mono text-sm text-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent">
                  Apply →
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="font-sans text-muted-foreground mb-6">
              Don't see the right fit? We're always interested in talking to talented people.
            </p>
            <a
              href="mailto:hello@lumoralabs.ai"
              className="font-mono text-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent"
            >
              hello@lumoralabs.ai
            </a>
          </div>
        </div>
      </main>

      <AIChatWidget />
    </div>
  )
}
