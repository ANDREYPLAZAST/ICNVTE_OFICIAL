'use client'

export default function Timeline() {
  const timelineItems = [
    { date: '5 de Junio 2025', event: 'Cierre proceso de preinscripción', targetDate: '2025-06-05' },
    { date: '2 de Julio 2025', event: 'Reunión técnica virtual', targetDate: '2025-07-02' },
    { date: '22 de Julio 2025', event: 'Cierre de proceso de inscripción', targetDate: '2025-07-22' },
    { date: '16 de Octubre 2025', event: 'Inspección técnica virtual', targetDate: '2025-10-16' },
    { date: '5 de Noviembre 2025', event: '1er día de la competencia, Inspección técnica', targetDate: '2025-11-05' },
    { date: '6 de Noviembre 2025', event: '2do día de la competencia, Pruebas de pista', targetDate: '2025-11-06' },
    { date: '7 de Noviembre 2025', event: '3er día de la competencia, Grand Prix y Ceremonia de premiación', targetDate: '2025-11-07' },
  ]

  // Función para calcular el estado basado en la fecha actual
  const getStatusBasedOnDate = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return 'completed' // Fecha ya pasó
    } else if (diffDays <= 14) {
      return 'in-progress' // Próximas dos semanas
    } else {
      return 'upcoming' // Fecha futura
    }
  }

  // Función para obtener el texto y estilo del status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { 
          text: 'Próximamente', 
          bgClass: 'from-blue-50 to-indigo-50', 
          textClass: 'text-blue-600', 
          borderClass: 'border-blue-200',
          circleClass: 'from-blue-500 to-blue-600'
        }
      case 'completed':
        return { 
          text: 'Completado', 
          bgClass: 'from-green-50 to-emerald-50', 
          textClass: 'text-green-600', 
          borderClass: 'border-green-200',
          circleClass: 'from-green-500 to-green-600'
        }
      case 'in-progress':
        return { 
          text: 'Muy Pronto', 
          bgClass: 'from-orange-50 to-amber-50', 
          textClass: 'text-orange-600', 
          borderClass: 'border-orange-200',
          circleClass: 'from-orange-500 to-orange-600'
        }
      default:
        return { 
          text: 'Próximamente', 
          bgClass: 'from-blue-50 to-indigo-50', 
          textClass: 'text-blue-600', 
          borderClass: 'border-blue-200',
          circleClass: 'from-blue-500 to-blue-600'
        }
    }
  }

  return (
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
            {timelineItems.map((item, index) => {
              const status = getStatusBasedOnDate(item.targetDate)
              const statusInfo = getStatusInfo(status)
              
              return (
                <div key={index} className="relative">
                  <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 bg-gradient-to-r ${statusInfo.circleClass} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
                            {item.event}
                          </h3>
                          <p className="text-blue-600 font-medium">{item.date}</p>
                        </div>
                        <div className={`px-4 py-2 bg-gradient-to-r ${statusInfo.bgClass} rounded-full border ${statusInfo.borderClass}`}>
                          <span className={`${statusInfo.textClass} text-sm font-medium`}>{statusInfo.text}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}