import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/data/blog'

interface CardPostProps {
  post: BlogPost
  featured?: boolean
}

export default function CardPost({ post, featured = false }: CardPostProps) {
  return (
    <article className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
      featured ? 'md:col-span-1' : ''
    }`}>
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={featured ? 600 : 400}
          height={featured ? 300 : 250}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            post.category === 'noticias' ? 'bg-blue-100 text-blue-800' :
            post.category === 'tutoriales' ? 'bg-green-100 text-green-800' :
            post.category === 'entrevistas' ? 'bg-purple-100 text-purple-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {post.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Destacado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <h3 className={`font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors ${
          featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-slate-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" />
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-2 transition-all"
          >
            Leer más
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}