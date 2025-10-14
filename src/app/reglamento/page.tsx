'use client'

import { FileText } from 'lucide-react'

export default function ReglamentoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-32 pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Reglamento V-CNVTE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Normas y directrices oficiales para la competencia 2024
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Lee cuidadosamente todas las reglas y requisitos antes de participar 
              en la quinta edición de nuestra competencia.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* PDF Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Reglamento Oficial</h2>
                      <p className="text-slate-300">V-CNVTE 2025 - Documento completo</p>
                    </div>
                  </div>
                  <a 
                    href="/documents/reglamento-v-cnvte-2025.pdf" 
                    download
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Descargar PDF</span>
                  </a>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="relative">
                <iframe
                  src="/documents/reglamento-v-cnvte-2025.pdf#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH"
                  className="w-full h-[800px] border-0"
                  title="Reglamento V-CNVTE 2025"
                  loading="lazy"
                />
                
                {/* Fallback message */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 hidden" id="pdf-fallback">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No se puede mostrar el PDF</h3>
                    <p className="mb-4">Tu navegador no soporta la visualización de PDFs.</p>
                    <a 
                      href="/documents/reglamento-v-cnvte-2025.pdf" 
                      download
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Descargar Reglamento</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* PDF Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center space-x-4">
                    <span>📄 Documento oficial</span>
                    <span>📅 Actualizado: Octubre 2025</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>🔒 Versión final</span>
                    <span className="text-blue-600 font-medium">PDF interactivo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}