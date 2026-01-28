"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
// import ThemeToggle from "@/components/ThemeToggle";

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const sections = ["intro", "work", "projects", "thoughts", "connect"];
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  if (!mounted) {
    return (
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
          <button
            className="mt-4 p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <div className="w-4 h-4" />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-2 h-8 rounded-full transition-all duration-500 ${
              activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Navigate to ${section}`}
          />
        ))}

        {/* <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} /> */}
      </div>
    </nav>
  );
}
