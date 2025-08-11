import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostContent from '@/components/cnvte/PostContent'
import { blogPosts } from '@/data/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post no encontrado | Blog CNVTE'
    }
  }

  return {
    title: `${post.title} | Blog CNVTE`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <PostContent post={post} />
}