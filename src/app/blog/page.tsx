import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import CardPost from '@/components/cnvte/CardPost'
import { blogPosts } from '@/data/blog'
import { Search, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | V-CNVTE',
  description: 'Noticias, artículos y actualizaciones sobre la Competencia Nacional de Videojuegos y Tecnología Educativa.',
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 6)

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog CNVTE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Noticias, artículos y actualizaciones de la competencia
            </p>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
              Mantente informado sobre las últimas novedades, consejos para participantes 
              y historias inspiradoras de nuestras competencias.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Todas las categorías</option>
                <option>Noticias</option>
                <option>Tutoriales</option>
                <option>Entrevistas</option>
                <option>Resultados</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Artículos Destacados" 
              subtitle="Los posts más importantes y relevantes"
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.map((post) => (
                <CardPost key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Artículos Recientes" 
            subtitle="Las últimas publicaciones del blog"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentPosts.map((post) => (
              <CardPost key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mantente Informado
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para recibir las últimas noticias 
            y actualizaciones sobre CNVTE directamente en tu correo.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}