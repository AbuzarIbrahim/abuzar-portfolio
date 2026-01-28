import { readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

// Get all blog posts
export function getBlogPosts() {
  const posts = [
    "future-of-web-development",
    "design-systems-at-scale",
    "performance-first-development",
    "art-of-code-review",
  ]

  return posts
    .map((slug) => {
      try {
        const fullPath = join(process.cwd(), "content", "blogs", `${slug}.mdx`)
        const fileContents = readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          metadata: data,
          content,
        }
      } catch {
        return null
      }
    })
    .filter(Boolean)
}
