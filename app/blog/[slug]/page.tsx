import { readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"
import BlogPostClient from "./BlogPostClient"

// Get all blog posts
function getBlogPosts() {
  const posts = [
    "getting-started-with-dotnet",
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

// Get single blog post
function getBlogPost(slug: string) {
  const posts = getBlogPosts()
  return posts.find((post) => post?.slug === slug)
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts
    .map((post) => ({
      slug: post?.slug,
    }))
    .filter(Boolean)
}

import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) {
    notFound()
  }
  const compiledContent = await compileMDX({ source: post.content })
  return <BlogPostClient post={{ ...post, content: compiledContent }} />
}
