"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ChevronLeft, Sun, Moon } from "lucide-react"

interface BlogPost {
  metadata: { [key: string]: any }
  content: any
}

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!post) {
    notFound()
  }

  const { metadata, content } = post

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 pt-6 sm:pt-8 pb-4">
        <Link
          href="/#thoughts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs sm:text-sm font-mono tracking-wider"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Back to thoughts
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
        {metadata.image && (
          <div className="mb-8 sm:mb-12 lg:mb-16 rounded-lg overflow-hidden">
            <Image
              src={metadata.image || "/placeholder.svg"}
              alt={metadata.title}
              width={800}
              height={400}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover"
            />
          </div>
        )}

        <header className="mb-8 sm:mb-12 lg:mb-16 space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">
            <time>{metadata.publishedAt}</time>
            <span className="hidden sm:inline">•</span>
            <span>5 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-tight font-mono">
            {metadata.title}
          </h1>

          {metadata.summary && (
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {metadata.summary}
            </p>
          )}
        </header>

        <article className="prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert max-w-none">
          <div className="space-y-6 sm:space-y-8 text-muted-foreground leading-relaxed [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-light [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:sm:mt-16 [&>h2]:mb-6 [&>h2]:sm:mb-8 [&>h2]:font-mono [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-medium [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:sm:mt-12 [&>h3]:mb-4 [&>h3]:sm:mb-6 [&>h3]:font-mono [&>p]:mb-4 [&>p]:sm:mb-6 [&>ul]:space-y-1 [&>ul]:sm:space-y-2 [&>ol]:space-y-1 [&>ol]:sm:space-y-2 [&>pre]:bg-muted [&>pre]:border [&>pre]:border-border [&>pre]:rounded-lg [&>pre]:p-3 [&>pre]:sm:p-4 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:sm:text-sm [&>pre]:overflow-x-auto [&>code]:bg-muted [&>code]:px-1.5 [&>code]:sm:px-2 [&>code]:py-0.5 [&>code]:sm:py-1 [&>code]:rounded [&>code]:text-xs [&>code]:sm:text-sm [&>code]:font-mono">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>

        <footer className="mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <Link
              href="/#thoughts"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono text-xs sm:text-sm tracking-wider"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              More thoughts
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="group p-2 sm:p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  ) : (
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  )}
                </button>
              )}

              <div className="text-xs sm:text-sm text-muted-foreground font-mono">© 2025 Mohd Abuzar Ibrahim</div>
            </div>
          </div>
        </footer>
      </main>

      {/* Gradient fade at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  )
}
