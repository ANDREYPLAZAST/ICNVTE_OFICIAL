import HeroVideo from '@/components/cnvte/HeroVideo'
import CompetitionOverview from '@/components/cnvte/CompetitionOverview'
import UniCarousel from '@/components/cnvte/UniCarousel'
import TechnicalSpecs from '@/components/cnvte/TechnicalSpecs'
import Timeline from '@/components/cnvte/Timeline'
import SectionTitle from '@/components/cnvte/SectionTitle'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'V-CNVTE 2025 | Competencia Nacional de Vehículos de Tracción Eléctrica',
  description: 'La competencia más importante de vehículos eléctricos en Colombia. Equipos universitarios diseñan, construyen y compiten con prototipos eléctricos innovadores.',
  keywords: 'vehículos eléctricos, movilidad sostenible, competencia universitaria, ingeniería, CNVTE, tracción eléctrica, prototipo, eficiencia energética',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroVideo />
      
      {/* Competencia Overview Section */}
      <CompetitionOverview />

      {/* Universities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Universidades Participantes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las mejores instituciones de educación superior compitiendo por la excelencia en movilidad eléctrica
            </p>
          </div>
          <UniCarousel />
        </div>
      </section>

      {/* Technical Specifications */}
      <TechnicalSpecs />

      {/* Timeline Section */}
      <Timeline />
    </main>
  )
}