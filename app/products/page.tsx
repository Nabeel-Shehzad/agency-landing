"use client"

import AIChatWidget from "../../components/ai-chat-widget"

export default function ProductsPage() {
  const products = [
    {
      name: "AutoFlow",
      category: "AI Agent",
      description:
        "Intelligent workflow automation that learns from your team's patterns and optimizes processes in real-time.",
      status: "Available",
      features: ["Smart task routing", "Pattern recognition", "Real-time optimization", "Team integration"],
    },
    {
      name: "DataMind",
      category: "Analytics AI",
      description: "Transform raw data into actionable insights with natural language queries and automated reporting.",
      status: "Available",
      features: ["Natural language queries", "Automated reports", "Predictive analytics", "Custom dashboards"],
    },
    {
      name: "CodeAssist",
      category: "Developer Tool",
      description: "AI-powered code review and optimization tool that helps teams write better, more efficient code.",
      status: "Available",
      features: ["Code analysis", "Performance optimization", "Security scanning", "Team collaboration"],
    },
    {
      name: "CustomerIQ",
      category: "CRM AI",
      description: "Intelligent customer relationship management with predictive insights and automated engagement.",
      status: "Available",
      features: ["Predictive scoring", "Automated outreach", "Sentiment analysis", "Integration ready"],
    },
    {
      name: "LeadGen AI",
      category: "AI Chat Assistant",
      description: "Real-time visitor engagement system that qualifies leads, captures contact information, and schedules appointments automatically.",
      status: "Available",
      features: ["Real-time visitor engagement", "Lead qualification", "Immediate scheduling", "Contact capture"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-violet-100/40 to-violet-50/70 text-foreground">
      {/* Header */}
      <header className="py-8 px-8 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Lumora Labs Logo"
              className="h-10 w-auto"
            />
          </a>
          <nav className="flex gap-8 font-sans text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <span className="text-foreground">Products</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="font-mono text-5xl md:text-7xl font-normal text-foreground leading-none tracking-tight">
            ./products
          </h1>
          <div className="w-24 h-px bg-accent mx-auto"></div>
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered tools designed to transform how you work, think, and create.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div key={index} className="group border border-border p-8 hover:border-accent transition-colors">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-mono text-2xl text-foreground mb-2">{product.name}</h3>
                      <span className="font-sans text-sm text-muted-foreground">{product.category}</span>
                    </div>
                    <span
                      className={`font-sans text-xs px-3 py-1 border ${product.status === "Available"
                        ? "border-green-500/30 text-green-400 bg-green-500/10"
                        : product.status === "Beta"
                          ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                          : "border-muted-foreground/30 text-muted-foreground bg-muted-foreground/10"
                        }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <p className="font-sans text-muted-foreground leading-relaxed">{product.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-sans text-sm font-semibold text-foreground">Key Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="font-sans text-sm text-muted-foreground flex items-center">
                          <span className="w-1 h-1 bg-accent rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button className="group/btn relative overflow-hidden">
                      <span className="relative z-10 px-6 py-2 block text-foreground group-hover/btn:text-background transition-colors duration-300 font-sans text-sm">
                        {product.status === "Available"
                          ? "Learn More"
                          : product.status === "Beta"
                            ? "Join Beta"
                            : "Get Notified"}
                      </span>
                      <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-mono text-3xl md:text-4xl font-normal text-foreground leading-tight">
            Need something custom?
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build bespoke AI solutions tailored to your specific needs and challenges.
          </p>
          <a href="/" className="group relative overflow-hidden inline-block">
            <span className="relative z-10 px-8 py-3 block text-foreground group-hover:text-background transition-colors duration-300 font-sans">
              Let's Talk
            </span>
            <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-mono text-2xl text-foreground">lumoralabs</div>
          <div className="font-sans text-sm text-muted-foreground">© 2025</div>
        </div>
      </footer>

      <AIChatWidget />
    </div>
  )
}
