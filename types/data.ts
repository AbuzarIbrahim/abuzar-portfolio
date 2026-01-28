export interface PersonalInfo {
  name: {
    first: string
    last: string
  }
  title: string
  status: {
    available: boolean
    text: string
    location: string
  }
  current: {
    role: string
    company: string
    period: string
  }
  skills: string[]
  contact: {
    email: string
  }
  social: Array<{
    name: string
    handle: string
    url: string
  }>
  resume?: {
    url: string
  }
}

export interface WorkExperience {
  title: string
  period: string
  experiences: Array<{
    year: string
    role: string
    company: string
    description: string
    tech: string[]
  }>
}

export interface Projects {
  title: string
  period: string
  projects: Array<{
    year: string
    title: string
    description: string
    tech: string[]
    status: string
    liveUrl?: string
    githubUrl?: string
  }>
}

export interface BlogPosts {
  title: string
  posts: Array<{
    title: string
    excerpt: string
    date: string
    readTime: string
    slug: string
  }>
}
