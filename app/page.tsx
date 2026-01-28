"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import ThemeToggle from "@/components/ThemeToggle"
import HeroSection from "@/components/sections/HeroSection"
import WorkSection from "@/components/sections/WorkSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import BlogSection from "@/components/sections/BlogSection"
import ContactSection from "@/components/sections/ContactSection"
import ContactPopup from "@/components/ContactPopup"

import personalInfoData from "@/data/personal-info.json"
import workExperienceData from "@/data/work-experience.json"
import projectsData from "@/data/projects.json"
import blogPostsData from "@/data/blog-posts.json"

export default function Home(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(true)
  const [activeSection, setActiveSection] = useState<string>("")
  const [isContactPopupOpen, setIsContactPopupOpen] = useState<boolean>(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = (): void => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative mb-6">
      <Navigation activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
        <HeroSection data={personalInfoData} sectionRef={(el) => (sectionsRef.current[0] = el)} />

        <WorkSection data={workExperienceData} sectionRef={(el) => (sectionsRef.current[1] = el)} className="mb-4"/>

        <ProjectsSection data={projectsData} sectionRef={(el) => (sectionsRef.current[2] = el)} className="mb-4"/>

        <BlogSection data={blogPostsData} sectionRef={(el) => (sectionsRef.current[3] = el)} className="mb-4"/>

        <ContactSection data={personalInfoData} sectionRef={(el) => (sectionsRef.current[4] = el)} />

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm text-muted-foreground">
                © 2025 {personalInfoData.name.first} {personalInfoData.name.last}. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">Built with Next.js and deployed on Vercel</div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />

      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  )
}
