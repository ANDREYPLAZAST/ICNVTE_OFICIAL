import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import MasonryGallery from '@/components/cnvte/MasonryGallery'
import { Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galería | V-CNVTE',
  description: 'Galería de fotos y momentos destacados de las competencias CNVTE.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Galería CNVTE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Revive los mejores momentos de nuestras competencias
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Desde presentaciones innovadoras hasta ceremonias de premiación, 
              descubre la pasión y creatividad de nuestros participantes.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Momentos Destacados" 
            subtitle="Explora nuestra colección de imágenes de todas las ediciones"
          />
          <MasonryGallery />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Fotos Capturadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-slate-600">Ediciones</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-600">Universidades</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-slate-600">Participantes</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}