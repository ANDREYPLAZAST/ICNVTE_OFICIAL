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
  eficiencia: string | null
  penalizacionesGrandPrix: number | null
  valorParcial: number | null
  posiciones: number | null
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
    eficiencia: '120 | 80,75',
    penalizacionesGrandPrix: 10,
    valorParcial: 410,
    posiciones: 1
  },
  {
    ordenSalida: 2,
    equipo: 'KRATOS',
    mejorTiempo: '13,57',
    puntosAceleracion: 90,
    penalizacionesAceleracion: 0,
    agilidad: 70,
    ordenLlegada: 80,
    eficiencia: '180 | 106,75',
    penalizacionesGrandPrix: 15,
    valorParcial: 405,
    posiciones: 2
  },
  {
    ordenSalida: 3,
    equipo: 'FURTIVO I',
    mejorTiempo: '13,79',
    puntosAceleracion: 80,
    penalizacionesAceleracion: 0,
    agilidad: 90,
    ordenLlegada: 90,
    eficiencia: '100 | 70,35',
    penalizacionesGrandPrix: 0,
    valorParcial: 360,
    posiciones: 3
  },
  {
    ordenSalida: 4,
    equipo: 'SQUALO OMEGA',
    mejorTiempo: '13,86',
    puntosAceleracion: 70,
    penalizacionesAceleracion: 20,
    agilidad: 80,
    ordenLlegada: 70,
    eficiencia: '80 | 50,55',
    penalizacionesGrandPrix: 0,
    valorParcial: 280,
    posiciones: 6
  },
  {
    ordenSalida: 5,
    equipo: 'GORGONA VTECCI',
    mejorTiempo: '14,16',
    puntosAceleracion: 60,
    penalizacionesAceleracion: 0,
    agilidad: 80,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 10,
    valorParcial: 130,
    posiciones: 8
  },
  {
    ordenSalida: 6,
    equipo: 'HELLMEC',
    mejorTiempo: '14,46',
    puntosAceleracion: 50,
    penalizacionesAceleracion: 20,
    agilidad: 40,
    ordenLlegada: 40,
    eficiencia: '200 | 235,3',
    penalizacionesGrandPrix: 10,
    valorParcial: 300,
    posiciones: 4
  },
  {
    ordenSalida: 7,
    equipo: 'MILIRACING',
    mejorTiempo: '14,81',
    puntosAceleracion: 40,
    penalizacionesAceleracion: 0,
    agilidad: 40,
    ordenLlegada: 0,
    eficiencia: null,
    penalizacionesGrandPrix: 0,
    valorParcial: 80,
    posiciones: 9
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
    valorParcial: 50,
    posiciones: 10
  },
  {
    ordenSalida: 9,
    equipo: 'VTECCI',
    mejorTiempo: '15,45',
    puntosAceleracion: 20,
    penalizacionesAceleracion: 0,
    agilidad: 50,
    ordenLlegada: 60,
    eficiencia: '160 | 88,72',
    penalizacionesGrandPrix: 0,
    valorParcial: 290,
    posiciones: 5
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
    valorParcial: -5,
    posiciones: 13
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
    valorParcial: 0,
    posiciones: 12
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
    valorParcial: 20,
    posiciones: 11
  },
  {
    ordenSalida: 13,
    equipo: 'UNI SABANA',
    mejorTiempo: '19,89',
    puntosAceleracion: 0,
    penalizacionesAceleracion: 30,
    agilidad: 30,
    ordenLlegada: 50,
    eficiencia: '140 | 83,06',
    penalizacionesGrandPrix: 5,
    valorParcial: 185,
    posiciones: 7
  }
]

export default function ResultadosPage() {
  const formatValue = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) return ''
    return value.toString()
  }

  const hasPenalty = (value: number | null | undefined): boolean => {
    return value !== null && value !== undefined && value > 0
  }

  const hasZeroOrder = (value: number | null | undefined): boolean => {
    return value !== null && value !== undefined && value === 0
  }

  const hasEmptyEfficiency = (value: string | null | undefined): boolean => {
    return value === null || value === undefined || value === ''
  }

  // Ordenar resultados por posiciones
  const resultadosOrdenados = [...resultados].sort((a, b) => {
    const posA = a.posiciones ?? 999
    const posB = b.posiciones ?? 999
    return posA - posB
  })

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
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionTitle 
            title="Tabla de Resultados" 
            subtitle="Resultados completos de la competencia"
          />
          
          <div className="mt-8 overflow-x-auto shadow-2xl rounded-xl border border-gray-300 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <th rowSpan={2} className="border-r border-slate-600 text-center font-bold py-4 px-3 text-sm whitespace-nowrap">
                    ORDEN DE<br />SALIDA
                  </th>
                  <th rowSpan={2} className="border-r border-slate-600 text-center font-bold py-4 px-4 text-sm min-w-[140px]">
                    EQUIPO
                  </th>
                  <th rowSpan={2} className="border-r border-slate-600 text-center font-bold py-4 px-3 text-sm whitespace-nowrap">
                    MEJOR<br />TIEMPO
                  </th>
                  <th colSpan={3} className="border-r border-slate-600 text-center font-bold bg-blue-600 py-3 px-2 text-sm">
                    ACELERACIÓN
                  </th>
                  <th colSpan={4} className="border-r border-slate-600 text-center font-bold bg-emerald-600 py-3 px-2 text-sm">
                    GRAND PRIX
                  </th>
                  <th rowSpan={2} className="text-center font-bold bg-emerald-700 py-4 px-4 text-sm whitespace-nowrap">
                    POSICIONES
                  </th>
                </tr>
                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <th className="border-r border-slate-600 text-center font-semibold bg-blue-600 py-3 px-2 text-xs">
                    PUNTOS
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-blue-600 py-3 px-2 text-xs">
                    PENALIZ.
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-blue-600 py-3 px-2 text-xs">
                    AGILIDAD
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-emerald-600 py-3 px-2 text-xs whitespace-nowrap">
                    ORDEN<br />LLEGADA
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-emerald-600 py-3 px-2 text-xs">
                    EFICIENCIA
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-emerald-600 py-3 px-2 text-xs">
                    PENALIZ.
                  </th>
                  <th className="border-r border-slate-600 text-center font-semibold bg-emerald-600 py-3 px-2 text-xs whitespace-nowrap">
                    VALOR<br />PARCIAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultadosOrdenados.map((resultado, index) => (
                  <tr 
                    key={index} 
                    className={`transition-colors duration-150 ${
                      index % 2 === 0 
                        ? 'bg-white hover:bg-blue-50' 
                        : 'bg-gray-50 hover:bg-blue-50'
                    }`}
                  >
                    <td className="border-r border-b border-gray-200 text-center font-semibold py-3 px-3 text-gray-700">
                      {resultado.ordenSalida}
                    </td>
                    <td className="border-r border-b border-gray-200 text-left font-bold py-3 px-4 text-gray-900">
                      {resultado.equipo}
                    </td>
                    <td className="border-r border-b border-gray-200 text-center font-mono py-3 px-3 text-gray-700">
                      {formatValue(resultado.mejorTiempo) || '-'}
                    </td>
                    <td className="border-r border-b border-gray-200 text-center font-semibold py-3 px-3 text-gray-800">
                      {formatValue(resultado.puntosAceleracion) || '-'}
                    </td>
                    <td 
                      className={`border-r border-b border-gray-200 text-center font-bold py-3 px-3 ${
                        hasPenalty(resultado.penalizacionesAceleracion)
                          ? 'bg-red-50 text-red-700' 
                          : 'text-gray-600'
                      }`}
                    >
                      {formatValue(resultado.penalizacionesAceleracion) || '0'}
                    </td>
                    <td className="border-r border-b border-gray-200 text-center font-medium py-3 px-3 text-gray-700">
                      {formatValue(resultado.agilidad) || '-'}
                    </td>
                    <td 
                      className={`border-r border-b border-gray-200 text-center font-semibold py-3 px-3 ${
                        hasZeroOrder(resultado.ordenLlegada)
                          ? 'bg-red-50 text-red-700' 
                          : 'text-gray-800'
                      }`}
                    >
                      {formatValue(resultado.ordenLlegada) || '-'}
                    </td>
                    <td 
                      className={`border-r border-b border-gray-200 text-center py-3 px-3 ${
                        hasEmptyEfficiency(resultado.eficiencia)
                          ? 'bg-red-50 text-gray-700' 
                          : 'text-gray-700'
                      }`}
                    >
                      {formatValue(resultado.eficiencia) || '-'}
                    </td>
                    <td 
                      className={`border-r border-b border-gray-200 text-center font-bold py-3 px-3 ${
                        hasPenalty(resultado.penalizacionesGrandPrix)
                          ? 'bg-red-50 text-red-700' 
                          : 'text-gray-600'
                      }`}
                    >
                      {formatValue(resultado.penalizacionesGrandPrix) || '0'}
                    </td>
                    <td className="border-r border-b border-gray-200 text-center font-bold text-lg py-3 px-4 text-slate-800 bg-blue-50">
                      {formatValue(resultado.valorParcial) || '-'}
                    </td>
                    <td className="border-b border-gray-200 text-center font-bold text-xl py-3 px-4 bg-emerald-100 text-emerald-800">
                      {formatValue(resultado.posiciones) || '-'}
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

