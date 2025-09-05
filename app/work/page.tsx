"use client"

import AIChatWidget from "../../components/ai-chat-widget"

export default function WorkPage() {
  const projects = [
    {
      title: "FinTech Automation Platform",
      client: "Regional Bank",
      year: "2024",
      description:
        "AI-powered transaction monitoring system that reduced manual review time by 75% while improving fraud detection accuracy.",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
      category: "AI Implementation",
    },
    {
      title: "Customer Service AI Agent",
      client: "E-commerce Startup",
      year: "2024",
      description:
        "Intelligent chatbot that handles 80% of customer inquiries automatically, with seamless handoff to human agents when needed.",
      technologies: ["Node.js", "OpenAI API", "React", "MongoDB"],
      category: "AI Agents",
    },
    {
      title: "Inventory Management System",
      client: "Manufacturing Company",
      year: "2023",
      description:
        "Custom software solution that streamlined inventory tracking and reduced stockouts by 60% through predictive analytics.",
      technologies: ["Next.js", "Python", "PostgreSQL", "Docker"],
      category: "Custom Software",
    },
    {
      title: "Data Analytics Dashboard",
      client: "Healthcare Provider",
      year: "2023",
      description:
        "Real-time analytics platform that helps medical staff make data-driven decisions and improve patient outcomes.",
      technologies: ["React", "D3.js", "Python", "AWS"],
      category: "Technical Consulting",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-violet-100/40 to-violet-50/70 text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-violet-50/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-2">
          <a href="/" className="font-mono text-xl font-semibold text-foreground hover:text-accent transition-colors">
            Lls
          </a>
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </a>
        </div>
      </nav>

      <section className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="font-mono text-6xl md:text-8xl font-normal text-foreground mb-6 leading-none">./work</h1>
            <div className="w-24 h-px bg-accent mb-8"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Selected projects where we've helped businesses transform their operations through intelligent software
              solutions.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <div key={index} className="border-b border-border pb-16 last:border-b-0">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      <div className="font-mono text-sm text-accent">{project.category}</div>
                      <h2 className="font-sans text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                        {project.title}
                      </h2>
                      <div className="space-y-2 text-sm font-mono text-muted-foreground">
                        <div>{project.client}</div>
                        <div>{project.year}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <p className="font-sans text-lg text-muted-foreground leading-relaxed">{project.description}</p>

                    <div>
                      <div className="font-mono text-sm text-muted-foreground mb-3">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 border border-border font-mono text-xs text-muted-foreground hover:border-accent hover:text-foreground transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="font-sans text-lg text-muted-foreground mb-8">Ready to start your next project?</p>
            <a
              href="/"
              className="group relative inline-block px-8 py-3 border border-border hover:border-foreground transition-all duration-300"
            >
              <span className="text-foreground group-hover:text-foreground transition-colors font-sans text-sm">
                Get in Touch
              </span>
            </a>
          </div>
        </div>
      </section>

      <AIChatWidget />
    </div>
  )
}
