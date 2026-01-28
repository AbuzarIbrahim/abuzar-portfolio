import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPosts } from "@/types/data";

interface BlogSectionProps {
  data: BlogPosts;
  sectionRef: (el: HTMLElement | null) => void;
  className?: string;
}

interface BlogPostCardProps {
  post: BlogPosts["posts"][0];
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer block"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogSection({ data, sectionRef }: BlogSectionProps) {
  return (
    <section id="thoughts" ref={sectionRef} className="py-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-light">{data.title}</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {data.posts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
