import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import TableOfContents from '@/components/cnvte/TableOfContents'
import { FileText, Users, Trophy, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reglamento | V-CNVTE 2024',
  description: 'Reglamento oficial de la Quinta Competencia Nacional de Videojuegos y Tecnología Educativa.',
}

export default function ReglamentoPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Reglamento V-CNVTE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Normas y directrices oficiales para la competencia 2024
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Lee cuidadosamente todas las reglas y requisitos antes de participar 
              en la quinta edición de nuestra competencia.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Fechas Clave</h3>
              <p className="text-sm text-slate-600">Mayo - Septiembre 2024</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Equipos</h3>
              <p className="text-sm text-slate-600">2 a 5 integrantes</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Categorías</h3>
              <p className="text-sm text-slate-600">6 categorías disponibles</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Entregables</h3>
              <p className="text-sm text-slate-600">Prototipo + Documentación</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 prose prose-slate max-w-none">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <section id="introduccion" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">1. Introducción</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    La V Competencia Nacional de Videojuegos y Tecnología Educativa (V-CNVTE) 
                    es un evento académico organizado por la Universidad Militar Nueva Granada 
                    que tiene como objetivo promover el desarrollo de videojuegos y tecnologías 
                    educativas innovadoras.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Esta competencia busca fomentar la creatividad, el trabajo en equipo y la 
                    aplicación de conocimientos técnicos en el desarrollo de soluciones 
                    educativas que contribuyan al proceso de enseñanza-aprendizaje.
                  </p>
                </section>

                <section id="objetivos" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">2. Objetivos</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Objetivo General</h3>
                      <p className="text-slate-700">
                        Promover el desarrollo de videojuegos y tecnologías educativas 
                        innovadoras que contribuyan al mejoramiento de los procesos de 
                        enseñanza-aprendizaje en Colombia.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-slate-800 mb-2">Objetivos Específicos</h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>Fomentar la creatividad e innovación en el desarrollo de tecnologías educativas</li>
                        <li>Promover el trabajo colaborativo entre estudiantes universitarios</li>
                        <li>Generar espacios de intercambio académico y tecnológico</li>
                        <li>Reconocer y premiar los mejores proyectos de videojuegos educativos</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="participantes" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">3. Participantes</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-3">Requisitos de Elegibilidad</h3>
                      <ul className="text-slate-700 space-y-2">
                        <li>• Estudiantes universitarios activos</li>
                        <li>• Equipos de 2 a 5 integrantes</li>
                        <li>• Al menos un integrante de ingeniería/sistemas</li>
                        <li>• Certificado de matrícula vigente</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-3">Restricciones</h3>
                      <ul className="text-slate-700 space-y-2">
                        <li>• Proyecto original y no comercializado</li>
                        <li>• No haber ganado en ediciones anteriores</li>
                        <li>• Cumplir con fechas de entrega</li>
                        <li>• Participar en presentación final</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="categorias" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">4. Categorías</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Videojuegos Educativos",
                        description: "Juegos digitales con propósito educativo específico",
                        color: "blue"
                      },
                      {
                        title: "Realidad Virtual/Aumentada",
                        description: "Experiencias inmersivas para el aprendizaje",
                        color: "purple"
                      },
                      {
                        title: "Aplicaciones Móviles",
                        description: "Apps educativas para dispositivos móviles",
                        color: "green"
                      },
                      {
                        title: "Plataformas Web",
                        description: "Sistemas web interactivos educativos",
                        color: "orange"
                      },
                      {
                        title: "Inteligencia Artificial",
                        description: "Soluciones educativas con IA",
                        color: "red"
                      },
                      {
                        title: "Gamificación",
                        description: "Sistemas que aplican mecánicas de juego",
                        color: "indigo"
                      }
                    ].map((category, index) => (
                      <div key={index} className={`bg-${category.color}-50 p-6 rounded-lg border border-${category.color}-200`}>
                        <h3 className={`font-semibold text-${category.color}-800 mb-2`}>{category.title}</h3>
                        <p className="text-slate-700">{category.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="cronograma" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">5. Cronograma</h2>
                  <div className="space-y-4">
                    {[
                      { date: "15 de Marzo", event: "Apertura de inscripciones", status: "completed" },
                      { date: "30 de Abril", event: "Cierre de inscripciones", status: "completed" },
                      { date: "15 de Mayo", event: "Inicio de desarrollo", status: "active" },
                      { date: "30 de Agosto", event: "Entrega de proyectos", status: "upcoming" },
                      { date: "15 de Septiembre", event: "Evaluación y selección", status: "upcoming" },
                      { date: "30 de Septiembre", event: "Ceremonia de premiación", status: "upcoming" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center p-4 bg-slate-50 rounded-lg">
                        <div className={`w-4 h-4 rounded-full mr-4 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-800">{item.event}</span>
                            <span className="text-sm text-slate-500">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="evaluacion" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">6. Criterios de Evaluación</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Innovación (25%)</h3>
                        <p className="text-slate-700 text-sm">Originalidad y creatividad del proyecto</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Funcionalidad (25%)</h3>
                        <p className="text-slate-700 text-sm">Calidad técnica y usabilidad</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">Impacto Educativo (25%)</h3>
                        <p className="text-slate-700 text-sm">Potencial pedagógico y didáctico</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-orange-800 mb-2">Presentación (25%)</h3>
                        <p className="text-slate-700 text-sm">Calidad de la documentación y demo</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="premios" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">7. Premios</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-xl text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">1er Lugar</h3>
                      <p className="text-3xl font-bold mb-2">$20,000,000</p>
                      <p className="text-yellow-100">+ Certificación + Mentoría</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-400 to-gray-600 text-white p-6 rounded-xl text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">2do Lugar</h3>
                      <p className="text-3xl font-bold mb-2">$15,000,000</p>
                      <p className="text-gray-100">+ Certificación</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-xl text-center">
                      <Trophy className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">3er Lugar</h3>
                      <p className="text-3xl font-bold mb-2">$10,000,000</p>
                      <p className="text-orange-100">+ Certificación</p>
                    </div>
                  </div>
                </section>

                <section id="contacto" className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">8. Información de Contacto</h2>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Coordinación General</h3>
                        <p className="text-slate-700 mb-2">Universidad Militar Nueva Granada</p>
                        <p className="text-slate-700 mb-2">Email: cnvte@unimilitar.edu.co</p>
                        <p className="text-slate-700">Teléfono: +57 (1) 650 0000</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Soporte Técnico</h3>
                        <p className="text-slate-700 mb-2">Facultad de Ingeniería</p>
                        <p className="text-slate-700 mb-2">Email: soporte.cnvte@unimilitar.edu.co</p>
                        <p className="text-slate-700">Horario: Lunes a Viernes 8:00 - 17:00</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}