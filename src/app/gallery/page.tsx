'use client'

import SectionTitle from '@/components/cnvte/SectionTitle'
import MasonryGallery from '@/components/cnvte/MasonryGallery'

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-32 pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Galería IV-CNVTE 2024
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Revive los mejores momentos de la competencia
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Desde presentaciones innovadoras hasta ceremonias de premiación, 
              descubre la pasión y creatividad de nuestros participantes en vehículos eléctricos.
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
    </main>
  )
}