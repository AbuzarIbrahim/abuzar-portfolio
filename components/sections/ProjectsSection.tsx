import type { Projects } from "@/types/data"
import { ExternalLink, Github } from "lucide-react"

interface ProjectsSectionProps {
  data: Projects
  sectionRef: (el: HTMLElement | null) => void
  className?: string
}

export default function ProjectsSection({ data, sectionRef, className }: ProjectsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500";
      case "Beta":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <section id="projects" ref={sectionRef} className={`py-8 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-light">{data.title}</h2>
          {/* <div className="text-sm text-muted-foreground font-mono">{data.period}</div> */}
        </div>

        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="group py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div>
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {project.year}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                    <span className="text-sm text-muted-foreground">{project.status}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{project.description}</p>

                <div className="flex items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {data.note && (
        <div className="mt-8 text-center text-lg text-muted-foreground font-semibold">
          {data.note}
        </div>
      )}
    </section>
  )
}
