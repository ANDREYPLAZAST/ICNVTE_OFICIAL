'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/cnvte/SectionTitle'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function ContactoPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [faqVisible, setFaqVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFaqVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const faqSection = document.getElementById('faq-section')
    if (faqSection) {
      observer.observe(faqSection)
    }

    return () => {
      if (faqSection) {
        observer.unobserve(faqSection)
      }
    }
  }, [])
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-32 pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Estamos aquí para resolver todas tus dudas sobre V-CNVTE
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Nuestro equipo está disponible para ayudarte con información sobre 
              inscripciones, reglamentos, categorías y cualquier consulta técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact-info" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Información de Contacto" 
            subtitle="Múltiples formas de comunicarte con nosotros"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className={`text-center p-6 bg-blue-50 rounded-xl transform transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-blue-100 cursor-pointer group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0ms' }}>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300 group-hover:animate-pulse">
                <Mail className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors">Email General</h3>
              <p className="text-slate-600 text-sm mb-3 group-hover:text-slate-700">Para consultas generales</p>
              <a 
                href="mailto:cnvte@unimilitar.edu.co"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:underline"
              >
                cnvte@unimilitar.edu.co
              </a>
            </div>

            <div className={`text-center p-6 bg-blue-50 rounded-xl transform transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-blue-100 cursor-pointer group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '150ms' }}>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300 group-hover:animate-pulse">
                <Phone className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors">Teléfono</h3>
              <p className="text-slate-600 text-sm mb-3 group-hover:text-slate-700">Línea directa</p>
              <a 
                href="tel:+5716500000"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:underline"
              >
                +57 310 809 0139
              </a>
            </div>

            <div className={`text-center p-6 bg-blue-50 rounded-xl transform transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-blue-100 cursor-pointer group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300 group-hover:animate-pulse">
                <MapPin className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors">Ubicación</h3>
              <p className="text-slate-600 text-sm mb-3 group-hover:text-slate-700">Universidad Militar Nueva Granada, Sede Calle 100</p>
              <p className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                Carrera 11 No. 101-80<br />
                Bogotá, Colombia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`transform transition-all duration-1000 ${
            faqVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <SectionTitle 
              title="Preguntas Frecuentes" 
              subtitle="Respuestas rápidas a las consultas más comunes"
            />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "¿Cuándo y dónde es la competencia?",
                answer: "Se realizará del 5 al 7 de noviembre de 2025 en el Autódromo XRP (Cajicá)."
              },
              {
                question: "¿Cuáles son los canales oficiales de comunicación?",
                answer: "Instagram @cnvte_umng, correo cnvte@unimilitar.edu.coy la web oficial."
              },
              {
                question: "¿Cuáles son los hitos y fechas clave?",
                answer: "Preinscripción hasta 5 de junio de 2025; Inscripción hasta 22 de julio de 2025; envío de Informe Final hasta 16 de octubre de 2025."
              },
              {
                question: "¿Quiénes pueden participar?",
                answer: "Equipos de IES con programas técnicos, tecnológicos o universitarios (no se aceptan vehículos independientes). Todos los miembros deben ser estudiantes activos con seguro estudiantil vigente el día del evento."
              },
              {
                question: "¿La inscripción tiene costo y qué documentos piden?",
                answer: "No tiene costo. Debes cargar aval institucional, listados de integrantes con seguro estudiantil, aceptación del reglamento y evidencias del diseño (fotos o modelo CAD con simulaciones)."
              },
              {
                question: "¿Qué incluye la Revisión de Diseño/Inspección técnica?",
                answer: "Se compara la documentación con el vehículo y se revisan condiciones habilitantes usando una lista de chequeo."
              },
              {
                question: "¿Cuál es el límite de potencia y cómo se mide?",
                answer: "La potencia neta máxima permitida es 500 W. El DIME (sistema de medición) integra voltage, corriente, odómetro y GPS; sus líneas deben llevarse a una caja DIME (150×100×70 mm) accesible desde un lado del vehículo."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`bg-slate-50 rounded-lg p-6 transform transition-all duration-700 hover:bg-slate-100 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group border border-transparent hover:border-blue-200 ${
                  faqVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <span className="text-blue-600 font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-3 group-hover:text-blue-800 transition-colors duration-300 text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}