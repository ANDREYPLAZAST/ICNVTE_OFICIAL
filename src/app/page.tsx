import HeroVideo from '@/components/cnvte/HeroVideo'
import UniCarousel from '@/components/cnvte/UniCarousel'
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Qué es la V-CNVTE?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              La <span className="text-blue-600 font-semibold">Competencia Nacional de Vehículos de Tracción Eléctrica</span> donde la innovación y la ingeniería se unen
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Diseño & Construcción</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Equipos universitarios diseñan y construyen vehículos eléctricos tipo prototipo, aplicando conocimientos de ingeniería mecánica, eléctrica y electrónica.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Eficiencia Energética</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  La competencia evalúa no solo la velocidad, sino la eficiencia energética y la innovación en sistemas de propulsión eléctrica.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Competencia Integral</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Pruebas de diseño, inspección técnica, pruebas habilitantes y dinámicas que evalúan todos los aspectos del vehículo.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Modalidades de Competencia</h3>
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-white rounded-xl border border-blue-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">1</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Prueba de Agilidad</h4>
                      <p className="text-gray-600 text-sm">Navegación en circuito con obstáculos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-xl border border-blue-100">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">2</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Prueba de Aceleración</h4>
                      <p className="text-gray-600 text-sm">Velocidad máxima en línea recta</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-xl border border-blue-100">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">3</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Grand Prix</h4>
                      <p className="text-gray-600 text-sm">Resistencia con eficiencia energética</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Especificaciones Técnicas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estándares de diseño que garantizan seguridad, eficiencia e innovación
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sistema Eléctrico</h3>
              <p className="text-gray-600 text-sm">Voltaje máximo, seguridad eléctrica y eficiencia energética</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Seguridad</h3>
              <p className="text-gray-600 text-sm">Estructuras antivuelco, cinturones y sistemas de emergencia</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dimensiones</h3>
              <p className="text-gray-600 text-sm">Límites de peso, tamaño y configuración del vehículo</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mecánica</h3>
              <p className="text-gray-600 text-sm">Sistemas de frenado, dirección y suspensión</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cronograma 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fechas importantes para la próxima edición de la competencia
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { date: 'Febrero 2025', event: 'Apertura de inscripciones', status: 'upcoming' },
                { date: 'Marzo 2025', event: 'Registro de equipos', status: 'upcoming' },
                { date: 'Mayo 2025', event: 'Entrega de documentación técnica', status: 'upcoming' },
                { date: 'Julio 2025', event: 'Inspección técnica virtual', status: 'upcoming' },
                { date: 'Septiembre 2025', event: 'Competencia presencial', status: 'upcoming' },
                { date: 'Octubre 2025', event: 'Ceremonia de premiación', status: 'upcoming' },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.event}</h3>
                          <p className="text-blue-600 font-medium">{item.date}</p>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                          <span className="text-blue-600 text-sm font-medium">Próximamente</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < 5 && (
                    <div className="absolute left-8 top-20 w-1 h-6 bg-gradient-to-b from-blue-500 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}