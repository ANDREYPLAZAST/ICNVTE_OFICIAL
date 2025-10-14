'use client'

import { Zap, ShieldHalf, Ruler, Settings } from 'lucide-react'

export default function TechnicalSpecs() {
  const specs = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Sistema Eléctrico",
      description: "Voltaje máximo, eficiencia energética y propulsión eléctrica controlada",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <ShieldHalf className="w-6 h-6 text-white" />,
      title: "Seguridad",
      description: "Protección integral del piloto ante volcamientos y accidentes.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Ruler className="w-6 h-6 text-white" />,
      title: "Dimensiones",
      description: "Tamaño optimizado para agilidad y maniobrabilidad.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      title: "Mecánica",
      description: "Sistema de frenos y manejo preciso para máxima seguridad.",
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  return (
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
          {specs.map((spec, index) => (
            <div 
              key={index}
              className="h-48 group"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700 cursor-pointer"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(0deg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotateY(180deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateY(0deg)';
                }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 bg-white p-6 rounded-2xl border border-gray-200 shadow-lg text-center flex flex-col justify-center items-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${spec.gradient} rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform duration-300`}>
                    {spec.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300">
                    {spec.title}
                  </h3>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg text-center flex flex-col justify-center items-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${spec.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    {spec.icon}
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}