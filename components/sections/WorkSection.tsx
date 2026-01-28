import type { WorkExperience } from "@/types/data"

interface WorkSectionProps {
  data: WorkExperience
  sectionRef: (el: HTMLElement | null) => void
  className?: string
}

export default function WorkSection({ data, sectionRef, className }: WorkSectionProps) {
  return (
    <section id="work" ref={sectionRef} className={`min-h-screen py-8 opacity-0 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-light">{data.title}</h2>
          {/* <div className="text-sm text-muted-foreground font-mono">{data.period}</div> */}
        </div>

        <div className="space-y-4">
          {data.experiences.map((job, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {job.year}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground">{job.company}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                {job.tech.map((tech) => (
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
    </section>
  )
}
