import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { PersonalInfo } from "@/types/data"

interface ContactSectionProps {
  data: PersonalInfo
  sectionRef: (el: HTMLElement | null) => void
}

export default function ContactSection({ data, sectionRef }: ContactSectionProps) {
  return (
    <section id="connect" ref={sectionRef} className="py-8 opacity-0">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-light">Let's Connect</h2>

          <div className="space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities, collaborations, and conversations about technology and design.
            </p>

            <div className="space-y-4">
              <Link
                href={`mailto:${data.contact.email}`}
                className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                <span className="text-lg">{data.contact.email}</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

          <div className="grid grid-cols-2 gap-4">
            {data.social.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                    {social.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{social.handle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
