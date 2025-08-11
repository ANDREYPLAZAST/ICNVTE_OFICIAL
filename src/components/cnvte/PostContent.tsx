import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { BlogPost } from '@/data/blog'

interface PostContentProps {
  post: BlogPost
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <main className="min-h-screen pt-20">
      {/* Back Navigation */}
      <div className="bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                post.category === 'noticias' ? 'bg-blue-100 text-blue-800' :
                post.category === 'tutoriales' ? 'bg-green-100 text-green-800' :
                post.category === 'entrevistas' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} min de lectura</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              <span className="text-slate-600 font-medium">Compartir:</span>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-slate-800 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-slate-800 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(item => item.startsWith('- '))
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-slate-700">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('```')) {
                  const code = paragraph.replace(/```\w*\n?/, '').replace(/```$/, '')
                  return (
                    <pre key={index} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
                      <code>{code}</code>
                    </pre>
                  )
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-slate-800 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                return (
                  <p key={index} className="text-slate-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="h-5 w-5 text-slate-400" />
                <span className="text-slate-600 font-medium">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Artículos Relacionados
            </h2>
            <div className="text-center text-slate-600">
              <p>Próximamente: artículos relacionados basados en categorías y tags similares.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}