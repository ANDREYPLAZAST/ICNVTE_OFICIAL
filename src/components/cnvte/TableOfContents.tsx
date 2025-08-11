'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'introduccion', title: '1. Introducción' },
  { id: 'objetivos', title: '2. Objetivos' },
  { id: 'participantes', title: '3. Participantes' },
  { id: 'categorias', title: '4. Categorías' },
  { id: 'cronograma', title: '5. Cronograma' },
  { id: 'evaluacion', title: '6. Evaluación' },
  { id: 'premios', title: '7. Premios' },
  { id: 'contacto', title: '8. Contacto' }
]

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Tabla de Contenidos</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}