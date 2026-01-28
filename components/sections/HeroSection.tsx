import type { PersonalInfo } from "@/types/data"
import { ExternalLink } from "lucide-react"

interface HeroSectionProps {
  data: PersonalInfo
  sectionRef: (el: HTMLElement | null) => void
}

export default function HeroSection({ data, sectionRef }: HeroSectionProps) {
  return (
    <header id="intro" ref={sectionRef} className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2026</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
              {data.name.first}
              <br />
              <span className="text-muted-foreground">{data.name.last}</span>
            </h1>
          </div>

          <div className="space-y-4 lg:space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {data.title.split(" ").map((word, index) => {
                const highlightWords = ["design", "technology", "human behavior"]
                const isHighlight = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))
                return (
                  <span key={index} className={isHighlight ? "text-foreground" : ""}>
                    {word}{" "}
                  </span>
                )
              })}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${data.status.available ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                />
                {data.status.text}
              </div>
              <div className="hidden sm:block">•</div>
              <div>{data.status.location}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-4 lg:space-y-8">
          {data.resume?.url && (
            <div className="flex">
              <a
                href={data.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border hover:border-foreground transition-colors duration-300 group"
              >
                <span>View Resume</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}

          <div className="space-y-3 lg:space-y-4">
            <div className="text-xs sm:text-sm text-muted-foreground font-mono">CURRENTLY</div>
            <div className="space-y-1 lg:space-y-2">
              <div className="text-sm sm:text-base text-foreground">{data.current.role}</div>
              <div className="text-sm sm:text-base text-muted-foreground">@ {data.current.company}</div>
              <div className="text-xs text-muted-foreground">{data.current.period}</div>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <div className="text-xs sm:text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 sm:px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
