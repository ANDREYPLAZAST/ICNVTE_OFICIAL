'use client'

import { Drill, BatteryCharging, Award, Beaker } from 'lucide-react'

export default function CompetitionOverview() {
  const overviewItems = [
    {
      icon: <Drill className="w-6 h-6 text-white" />,
      title: "Diseño & Construcción",
      description: "Equipos universitarios diseñan y construyen vehículos eléctricos tipo prototipo, aplicando conocimientos de ingeniería mecánica, eléctrica y electrónica.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-white" />,
      title: "Eficiencia Energética",
      description: "La competencia evalúa no solo la velocidad, sino la eficiencia energética y la innovación en sistemas de propulsión eléctrica.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Competencia Integral",
      description: "Pruebas de diseño, inspección técnica, pruebas habilitantes y dinámicas que evalúan todos los aspectos del vehículo.",
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  const competitionModes = [
    {
      number: 1,
      title: "Prueba de Agilidad",
      description: "Navegación en circuito con obstáculos",
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Prueba de Aceleración",
      description: "Velocidad máxima en línea recta",
      color: "bg-blue-500"
    },
    {
      number: 3,
      title: "Grand Prix",
      description: "Resistencia con eficiencia energética",
      color: "bg-blue-500"
    }
  ]

  return (
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
            {overviewItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Modalidades de Competencia
              </h3>
              <div className="space-y-6">
                {competitionModes.map((mode, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-4 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'white'
                    }}
                    onMouseEnter={(e) => {
                      const bgElement = e.currentTarget.querySelector('.bg-fill') as HTMLElement;
                      const titleElement = e.currentTarget.querySelector('.title-text') as HTMLElement;
                      const descElement = e.currentTarget.querySelector('.desc-text') as HTMLElement;
                      const circleElement = e.currentTarget.querySelector('.circle-bg') as HTMLElement;
                      
                      if (bgElement) {
                        bgElement.style.transform = 'translateX(0%)';
                      }
                      if (titleElement) {
                        titleElement.style.color = 'white';
                      }
                      if (descElement) {
                        descElement.style.color = 'rgb(191 219 254)'; // blue-100
                      }
                      if (circleElement) {
                        circleElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const bgElement = e.currentTarget.querySelector('.bg-fill') as HTMLElement;
                      const titleElement = e.currentTarget.querySelector('.title-text') as HTMLElement;
                      const descElement = e.currentTarget.querySelector('.desc-text') as HTMLElement;
                      const circleElement = e.currentTarget.querySelector('.circle-bg') as HTMLElement;
                      
                      if (bgElement) {
                        bgElement.style.transform = 'translateX(-100%)';
                      }
                      if (titleElement) {
                        titleElement.style.color = 'rgb(17 24 39)'; // gray-900
                      }
                      if (descElement) {
                        descElement.style.color = 'rgb(75 85 99)'; // gray-600
                      }
                      if (circleElement) {
                        circleElement.style.backgroundColor = ''; // volver al color original
                      }
                    }}
                  >
                    {/* Background fill animation */}
                    <div 
                      className="bg-fill absolute inset-0 rounded-xl transition-all duration-500 ease-out"
                      style={{
                        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                        transform: 'translateX(-100%)'
                      }}
                    ></div>
                    
                    <div className={`circle-bg w-8 h-8 ${mode.color} rounded-full flex items-center justify-center mr-4 text-white font-bold relative z-10 transition-all duration-500`}>
                      {mode.number}
                    </div>
                    <div className="relative z-10">
                      <h4 className="title-text text-lg font-semibold text-gray-900 transition-colors duration-500">
                        {mode.title}
                      </h4>
                      <p className="desc-text text-gray-600 text-sm transition-colors duration-500">{mode.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}