"use client"

import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
      )}
    </button>
  )
}
