import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | V-CNVTE',
  description: 'Ponte en contacto con el equipo organizador de la Competencia Nacional de Videojuegos y Tecnología Educativa.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-teal-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="h-16 w-16 text-green-300 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Estamos aquí para resolver todas tus dudas sobre V-CNVTE
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Nuestro equipo está disponible para ayudarte con información sobre 
              inscripciones, reglamentos, categorías y cualquier consulta técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Información de Contacto" 
            subtitle="Múltiples formas de comunicarte con nosotros"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Email General</h3>
              <p className="text-slate-600 text-sm mb-3">Para consultas generales</p>
              <a 
                href="mailto:cnvte@unimilitar.edu.co"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                cnvte@unimilitar.edu.co
              </a>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Teléfono</h3>
              <p className="text-slate-600 text-sm mb-3">Línea directa</p>
              <a 
                href="tel:+5716500000"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +57 (1) 650 0000
              </a>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Ubicación</h3>
              <p className="text-slate-600 text-sm mb-3">Campus principal</p>
              <p className="text-purple-600 font-medium text-sm">
                Carrera 11 No. 101-80<br />
                Bogotá, Colombia
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Horarios</h3>
              <p className="text-slate-600 text-sm mb-3">Atención</p>
              <p className="text-orange-600 font-medium text-sm">
                Lun - Vie<br />
                8:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              title="Envíanos un Mensaje" 
              subtitle="Completa el formulario y te responderemos pronto"
            />
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-slate-700 mb-2">
                      Universidad
                    </label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Tu universidad"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="inscripcion">Información sobre inscripción</option>
                      <option value="reglamento">Consultas sobre reglamento</option>
                      <option value="categorias">Dudas sobre categorías</option>
                      <option value="tecnico">Soporte técnico</option>
                      <option value="premios">Información sobre premios</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Describe tu consulta o mensaje..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm text-slate-600">
                    Acepto la{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                      política de privacidad
                    </a>{' '}
                    y el tratamiento de mis datos personales *
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
                  >
                    <Send className="h-5 w-5" />
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Preguntas Frecuentes" 
            subtitle="Respuestas rápidas a las consultas más comunes"
          />
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "¿Cuándo abren las inscripciones para V-CNVTE 2024?",
                answer: "Las inscripciones están abiertas desde el 15 de marzo hasta el 30 de abril de 2024."
              },
              {
                question: "¿Pueden participar estudiantes de cualquier carrera?",
                answer: "Sí, pero al menos un integrante del equipo debe ser de ingeniería, sistemas o carreras afines a la tecnología."
              },
              {
                question: "¿Cuál es el tamaño máximo del equipo?",
                answer: "Los equipos pueden tener entre 2 y 5 integrantes. No se permiten participaciones individuales."
              },
              {
                question: "¿Hay algún costo de inscripción?",
                answer: "No, la participación en V-CNVTE es completamente gratuita para todos los estudiantes universitarios."
              },
              {
                question: "¿Qué tecnologías puedo usar para mi proyecto?",
                answer: "Puedes usar cualquier tecnología o herramienta. No hay restricciones específicas, siempre que el proyecto sea original."
              },
              {
                question: "¿Cómo se evalúan los proyectos?",
                answer: "Los proyectos se evalúan en base a innovación (25%), funcionalidad (25%), impacto educativo (25%) y presentación (25%)."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">¿No encontraste la respuesta que buscabas?</p>
            <a
              href="mailto:cnvte@unimilitar.edu.co"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Contáctanos Directamente
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}