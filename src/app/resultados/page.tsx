'use client'

import SectionTitle from '@/components/cnvte/SectionTitle'

interface ResultadoEquipo {
  ordenSalida: number
  equipo: string
  mejorTiempo: string | null
  puntosAceleracion: number | null
  penalizacionesAceleracion: number | null
  agilidad: number | null
  ordenLlegada: number | null
  eficiencia: number | null
  penalizacionesGrandPrix: number | null
  valorParcial: number | null
}

const resultados: ResultadoEquipo[] = [
  {
    ordenSalida: 1,
    equipo: 'EIA RACING',
    mejorTiempo: '13,49',
    puntosAceleracion: 100,
    penalizacionesAceleracion: 0,
    agilidad: 100,
    ordenLlegada: 100,
    eficiencia: null,
    penalizacionesGrandPrix: 10,
    valorParcial: 290
  },
  {
    ordenSalida: 2,
    equipo: 'KRATOS',
    mejorTiempo: '13,57',
    puntosAceleracion: 90,
    penalizacionesAceleracion: 0,
    agilidad: 70,
    ordenLlegada: 80,
    eficiencia: null,
    penalizacionesGrandPrix: 15,
    valorParcial: 225
  },
  {
    ordenSalida: 3,
    equipo: 'FURTIVO I',
    mejorTiempo: '13,79',
    puntosAceleracion: 80,
    penalizacionesAceleracion: 0,
    agilidad: 90,
    ordenLlegada: 90,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 260
  },
  {
    ordenSalida: 4,
    equipo: 'SQUALO OMEGA',
    mejorTiempo: '13,86',
    puntosAceleracion: 70,
    penalizacionesAceleracion: 20,
    agilidad: 80,
    ordenLlegada: 70,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 200
  },
  {
    ordenSalida: 5,
    equipo: 'GORGONA VTECCI',
    mejorTiempo: '14,16',
    puntosAceleracion: 60,
    penalizacionesAceleracion: 0,
    agilidad: 80,
    ordenLlegada: 0,
    eficiencia: 0,
    penalizacionesGrandPrix: 10,
    valorParcial: 130
  },
  {
    ordenSalida: 6,
    equipo: 'HELLMEC',
    mejorTiempo: '14,46',
    puntosAceleracion: 50,
    penalizacionesAceleracion: 0,
    agilidad: 40,
    ordenLlegada: 40,
    eficiencia: null,
    penalizacionesGrandPrix: 10,
    valorParcial: 120
  },
  {
    ordenSalida: 7,
    equipo: 'MILIRACING',
    mejorTiempo: '14,81',
    puntosAceleracion: 40,
    penalizacionesAceleracion: 0,
    agilidad: 40,
    ordenLlegada: 0,
    eficiencia: 0,
    penalizacionesGrandPrix: 0,
    valorParcial: 80
  },
  {
    ordenSalida: 8,
    equipo: 'UAO',
    mejorTiempo: '15,00',
    puntosAceleracion: 30,
    penalizacionesAceleracion: 20,
    agilidad: 60,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 20,
    valorParcial: 50
  },
  {
    ordenSalida: 9,
    equipo: 'VTECCI',
    mejorTiempo: '15,45',
    puntosAceleracion: 20,
    penalizacionesAceleracion: 0,
    agilidad: 50,
    ordenLlegada: 60,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 130
  },
  {
    ordenSalida: 10,
    equipo: 'HAMILTON',
    mejorTiempo: '15,65',
    puntosAceleracion: 10,
    penalizacionesAceleracion: 20,
    agilidad: 10,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 5,
    valorParcial: -5
  },
  {
    ordenSalida: 11,
    equipo: 'SQUALO GAMMA',
    mejorTiempo: '16,56',
    puntosAceleracion: 0,
    penalizacionesAceleracion: 0,
    agilidad: 0,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 0
  },
  {
    ordenSalida: 12,
    equipo: 'SIIMA',
    mejorTiempo: '17,44',
    puntosAceleracion: 0,
    penalizacionesAceleracion: 0,
    agilidad: 20,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 20
  },
  {
    ordenSalida: 13,
    equipo: 'UNI SABANA',
    mejorTiempo: '19,89',
    puntosAceleracion: 0,
    penalizacionesAceleracion: 30,
    agilidad: 30,
    ordenLlegada: 50,
    eficiencia: null,
    penalizacionesGrandPrix: 5,
    valorParcial: 45
  }
]

export default function ResultadosPage() {
  const formatValue = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) return 'Pendiente'
    return value.toString()
  }

  const hasPenalty = (value: number | null | undefined): boolean => {
    return value !== null && value !== undefined && value > 0
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-32 pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Resultados V-CNVTE 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Clasificación y puntuaciones de la competencia
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Consulta los resultados de aceleración, agilidad y Grand Prix de todos los equipos participantes.
            </p>
          </div>
        </div>
      </section>

      {/* Results Table Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Tabla de Resultados" 
            subtitle="Resultados completos de la competencia"
          />
          
          <div className="mt-8 overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th rowSpan={2} className="border border-gray-300 text-center font-bold py-3 px-4">
                    ORDEN DE SALIDA
                  </th>
                  <th rowSpan={2} className="border border-gray-300 text-center font-bold py-3 px-4">
                    EQUIPO
                  </th>
                  <th rowSpan={2} className="border border-gray-300 text-center font-bold py-3 px-4">
                    MEJOR TIEMPO
                  </th>
                  <th colSpan={3} className="border border-gray-300 text-center font-bold bg-blue-50 py-3 px-4">
                    ACELERACIÓN
                  </th>
                  <th colSpan={4} className="border border-gray-300 text-center font-bold bg-green-50 py-3 px-4">
                    GRAND PRIX
                  </th>
                </tr>
                <tr className="bg-slate-100">
                  <th className="border border-gray-300 text-center font-semibold bg-blue-50 py-2 px-4">
                    PUNTOS
                  </th>
                  <th className="border border-gray-300 text-center font-semibold bg-blue-50 py-2 px-4">
                    PENALIZACIONES
                  </th>
                  <th className="border border-gray-300 text-center font-semibold py-2 px-4">
                    AGILIDAD
                  </th>
                  <th className="border border-gray-300 text-center font-semibold bg-green-50 py-2 px-4">
                    ORDEN DE LLEGADA
                  </th>
                  <th className="border border-gray-300 text-center font-semibold bg-green-50 py-2 px-4">
                    EFICIENCIA
                  </th>
                  <th className="border border-gray-300 text-center font-semibold bg-green-50 py-2 px-4">
                    PENALIZACIONES
                  </th>
                  <th className="border border-gray-300 text-center font-semibold bg-green-50 py-2 px-4">
                    VALOR PARCIAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 text-center font-medium py-3 px-4">
                      {resultado.ordenSalida}
                    </td>
                    <td className="border border-gray-300 text-center font-semibold py-3 px-4">
                      {resultado.equipo}
                    </td>
                    <td className="border border-gray-300 text-center py-3 px-4">
                      {formatValue(resultado.mejorTiempo) || ''}
                    </td>
                    <td className="border border-gray-300 text-center py-3 px-4">
                      {formatValue(resultado.puntosAceleracion) || ''}
                    </td>
                    <td 
                      className={`border border-gray-300 text-center py-3 px-4 ${
                        hasPenalty(resultado.penalizacionesAceleracion)
                          ? 'bg-red-100 text-red-700 font-semibold' 
                          : ''
                      }`}
                    >
                      {formatValue(resultado.penalizacionesAceleracion)}
                    </td>
                    <td 
                      className={`border border-gray-300 text-center py-3 px-4 ${
                        resultado.equipo === 'VTECCI' && resultado.agilidad === 50
                          ? 'bg-red-100 text-red-700' 
                          : ''
                      }`}
                    >
                      {formatValue(resultado.agilidad) || ''}
                    </td>
                    <td className="border border-gray-300 text-center py-3 px-4">
                      {formatValue(resultado.ordenLlegada) || ''}
                    </td>
                    <td className="border border-gray-300 text-center py-3 px-4">
                      {formatValue(resultado.eficiencia) || ''}
                    </td>
                    <td className="border border-gray-300 text-center py-3 px-4">
                      {formatValue(resultado.penalizacionesGrandPrix) || ''}
                    </td>
                    <td className="border border-gray-300 text-center bg-blue-100 font-semibold py-3 px-4">
                      {formatValue(resultado.valorParcial) || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

