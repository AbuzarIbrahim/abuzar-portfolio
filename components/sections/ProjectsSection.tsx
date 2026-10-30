import type { Projects } from "@/types/data"
import { ExternalLink } from "lucide-react"

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

  const getLinkLabel = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

  return (
    <section id="projects" ref={sectionRef} className={`py-8 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-light">{data.title}</h2>
          {/* <div className="text-sm text-muted-foreground font-mono">{data.period}</div> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-xs sm:text-sm text-muted-foreground font-mono">
                <th className="py-3 pr-4 font-normal">PROJECT</th>
                <th className="py-3 pr-4 font-normal">STATUS</th>
                <th className="py-3 font-normal">LIVE LINK</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr
                  key={project.title}
                  className="border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <td className="py-4 pr-4 font-medium">{project.title}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                      <span className="text-sm text-muted-foreground">{project.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors duration-300"
                      >
                        {getLinkLabel(project.liveUrl)}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
