import { Metadata } from 'next'
import SectionTitle from '@/components/cnvte/SectionTitle'
import Image from 'next/image'
import { Trophy, Users, Calendar, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IV-CNVTE 2023 | Resultados y Ganadores',
  description: 'Conoce los resultados y ganadores de la cuarta edición de la Competencia Nacional de Videojuegos y Tecnología Educativa.',
}

export default function IVCnvtePage() {
  const winners = [
    {
      place: "1er Lugar",
      team: "EduGamers",
      university: "Universidad Nacional",
      project: "MathQuest VR",
      prize: "$20,000,000",
      description: "Juego de realidad virtual para el aprendizaje de matemáticas en educación básica"
    },
    {
      place: "2do Lugar", 
      team: "TechLearners",
      university: "Universidad de los Andes",
      project: "CodeAcademy Kids",
      prize: "$15,000,000",
      description: "Plataforma gamificada para enseñar programación a niños"
    },
    {
      place: "3er Lugar",
      team: "InnovaEdu",
      university: "Pontificia Universidad Javeriana",
      project: "HistoryAR",
      prize: "$10,000,000", 
      description: "Aplicación de realidad aumentada para explorar eventos históricos"
    }
  ]

  const stats = [
    { icon: Users, label: "Equipos Participantes", value: "127" },
    { icon: Calendar, label: "Universidades", value: "23" },
    { icon: Trophy, label: "Proyectos Finalistas", value: "15" },
    { icon: Award, label: "Total en Premios", value: "$50M" }
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IV-CNVTE 2023
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Cuarta Competencia Nacional de Videojuegos y Tecnología Educativa
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Una edición exitosa que reunió a los mejores talentos del país en el desarrollo 
              de tecnologías educativas innovadoras.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
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
            title="Ganadores IV-CNVTE 2023" 
            subtitle="Conoce a los equipos que se destacaron en la competencia"
          />
          <div className="max-w-6xl mx-auto space-y-8">
            {winners.map((winner, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                index === 0 ? 'ring-4 ring-yellow-400' : 
                index === 1 ? 'ring-4 ring-gray-400' : 
                'ring-4 ring-orange-400'
              }`}>
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={`/media/winners/winner-${index + 1}.jpg`}
                      alt={`${winner.team} - ${winner.place}`}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-500' :
                      'bg-orange-500'
                    }`}>
                      {winner.place}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          {winner.project}
                        </h3>
                        <p className="text-lg text-blue-600 font-semibold">
                          Equipo {winner.team}
                        </p>
                        <p className="text-slate-600">{winner.university}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {winner.prize}
                        </div>
                        <div className="text-sm text-slate-500">Premio</div>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {winner.description}
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
            subtitle="Revive los mejores momentos de IV-CNVTE 2023"
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
                name: "María González",
                team: "EduGamers",
                quote: "Participar en IV-CNVTE fue una experiencia transformadora. Nos permitió aplicar nuestros conocimientos en un proyecto real con impacto social."
              },
              {
                name: "Carlos Rodríguez", 
                team: "TechLearners",
                quote: "La competencia nos desafió a pensar fuera de la caja y desarrollar soluciones innovadoras para problemas educativos reales."
              },
              {
                name: "Ana Martínez",
                team: "InnovaEdu", 
                quote: "El nivel de los proyectos fue impresionante. Aprendimos mucho de otros equipos y creamos conexiones valiosas para el futuro."
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