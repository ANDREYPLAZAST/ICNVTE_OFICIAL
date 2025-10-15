'use client'

import SectionTitle from '@/components/cnvte/SectionTitle'
import Image from 'next/image'
import { Trophy, BadgeCheck, MapPin, Handshake } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

export default function IVCnvtePage() {
  const winners = [
    {
      team: "Escudería Bravo",
      university: "Universidad Pascual Bravo",
      image: "https://res.cloudinary.com/djhiec3yj/image/upload/v1760504033/winner-1_xom9wa.jpg"
    },
    {
      team: "Equipo Kratos",
      university: "Universidad EAFIT",
      image: "https://res.cloudinary.com/djhiec3yj/image/upload/v1760504034/winner-2_lerl1n.jpg"
    }
  ]

  const stats = [
    { icon: Handshake, label: "Equipos en Pista", value: 13 },
    { icon: BadgeCheck, label: "Voluntarios y jueces", value: 56 },
    { icon: MapPin, label: "Kilometros recorridos", value: 14 }
  ]

  // Estados para los contadores animados
  const [counts, setCounts] = useState([0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Efecto para detectar cuando la sección entra en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  // Función para animar los contadores
  const animateCounters = () => {
    const durations = [1500, 1800, 1600] // ms para cada contador
    const frameRate = 60 // frames por segundo
    const totalFrames = durations.map(duration => Math.floor(duration / (1000 / frameRate)))

    stats.forEach((stat, i) => {
      let currentFrame = 0
      const frames = totalFrames[i]
      
      const animate = () => {
        const progress = currentFrame / frames
        const easeOutProgress = 1 - Math.pow(1 - progress, 3) // Easing para suavizar
        const currentValue = Math.floor(easeOutProgress * stat.value)
        
        setCounts(prev => {
          const next = [...prev]
          next[i] = currentValue
          return next
        })
        
        currentFrame++
        
        if (currentFrame <= frames) {
          requestAnimationFrame(animate)
        } else {
          // Asegurar que llega al valor final
          setCounts(prev => {
            const next = [...prev]
            next[i] = stat.value
            return next
          })
        }
      }
      
      // Pequeño delay escalonado para que no todas empiecen al mismo tiempo
      setTimeout(() => {
        requestAnimationFrame(animate)
      }, i * 300)
    })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-32 pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IV-CNVTE 2024
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Cuarta Competencia Nacional de vehículos de tracción eléctrica
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Una edición exitosa que reunió a los mejores talentos del país para diseñar, construir y correr vehículos eléctricos de alto desempeño.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={sectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{counts[index]}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Equipos destacados IV-CNVTE 2024" 
            subtitle="Conoce a los equipos que se destacaron en la competencia"
          />
          <div className="max-w-6xl mx-auto space-y-8">
            {winners.map((winner, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden ring-4 ring-gray-400 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2">
                <div className="md:flex md:h-96">
                  <div className="md:w-1/2 relative h-80 md:h-full overflow-hidden">
                    <Image
                      src={winner.image}
                      alt={`${winner.team}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:w-1/2 py-12 pl-16 pr-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4 transition-colors duration-300 group-hover:text-blue-600">
                      {winner.team}
                    </h3>
                    <p className="text-xl text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                      {winner.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Momentos Destacados" 
            subtitle="Revive los mejores momentos de IV-CNVTE 2024"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={`/media/gallery/iv-cnvte-${i}.jpg`}
                  alt={`Momento ${i} IV-CNVTE`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/gallery"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Galería Completa
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Testimonios" 
            subtitle="Lo que dijeron los participantes sobre su experiencia"
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "María Iglesias",
                team: "MiliRacing Team",
                quote: "Como piloto del equipo Miliracing, viví una experiencia enriquecedora que combinó adrenalina, disciplina y trabajo en equipo. Cada vuelta representó el esfuerzo de meses de preparación y me permitió aportar retroalimentación técnica, tomar decisiones bajo presión y fortalecer mis habilidades en movilidad eléctrica, colaboración y liderazgo en entornos competitivos"
              },
              {
                name: "Santiago Corrales", 
                team: "Staff IV-CNVTE",
                quote: "Pude pulir habilidades blandas al interactuar con los estudiantes y docentes de las universidades que nos visitaban. Fue una oportunidad de no solo aplicar conocimientos de ingeniería sino de calidad humana."
              },
              {
                name: "Paula Lopez",
                team: "Hamilton Team", 
                quote: "El nivel de innovación en vehículos eléctricos fue impresionante. Aprendimos mucho de otros equipos y creamos conexiones valiosas para el futuro de la movilidad sostenible."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl text-blue-600 mb-4">&ldquo;</div>
                <p className="text-slate-700 mb-4 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.team}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}