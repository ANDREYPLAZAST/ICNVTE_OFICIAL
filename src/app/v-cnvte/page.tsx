import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import { Calendar, Users, Trophy, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'V-CNVTE 2024 | Participa en la Competencia',
  description: 'Información completa sobre la quinta edición de la Competencia Nacional de Videojuegos y Tecnología Educativa.',
}

export default function VCnvtePage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              V-CNVTE 2024
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Quinta Competencia Nacional de Videojuegos y Tecnología Educativa
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Calendar className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Duración</h3>
                <p className="text-blue-100">Mayo - Septiembre 2024</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Participantes</h3>
                <p className="text-blue-100">Estudiantes universitarios</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Trophy className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Premios</h3>
                <p className="text-blue-100">$50M en premios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Categorías de Competencia" 
            subtitle="Elige la categoría que mejor se adapte a tu proyecto"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Videojuegos Educativos",
                description: "Desarrollo de videojuegos con propósito educativo para diferentes niveles académicos",
                icon: "🎮",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Realidad Virtual/Aumentada",
                description: "Experiencias inmersivas para el aprendizaje usando tecnologías VR/AR",
                icon: "🥽",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Aplicaciones Móviles",
                description: "Apps educativas para dispositivos móviles con enfoque pedagógico",
                icon: "📱",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Plataformas Web",
                description: "Sistemas web interactivos para la gestión del aprendizaje",
                icon: "💻",
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Inteligencia Artificial",
                description: "Soluciones educativas potenciadas por IA y machine learning",
                icon: "🤖",
                color: "from-red-500 to-red-600"
              },
              {
                title: "Gamificación",
                description: "Sistemas que aplican mecánicas de juego al proceso educativo",
                icon: "🏆",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Requisitos de Participación" 
            subtitle="Asegúrate de cumplir con todos los requisitos antes de inscribirte"
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Elegibilidad</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Estudiantes universitarios activos
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Equipos de 2 a 5 integrantes
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Al menos un integrante de ingeniería/sistemas
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Proyecto original y no comercializado
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Trophy className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Entregables</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Prototipo funcional del proyecto
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Documentación técnica completa
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Video demo de 3-5 minutos
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Presentación ejecutiva (pitch)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Participar?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Las inscripciones están abiertas. No pierdas la oportunidad de ser parte 
            de la competencia más importante de videojuegos educativos en Colombia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reglamento"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Leer Reglamento
            </a>
            <a
              href="mailto:cnvte@unimilitar.edu.co"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Inscribirse Ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}