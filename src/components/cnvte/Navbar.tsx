'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, ChevronDown, Zap, Target, Award, Users, BookOpen, Camera, FileText, MessageCircle, ArrowRight, Play, Calendar, Trophy } from 'lucide-react'
import MobileMenu from './MobileMenu'

const navigation = [
  { name: 'Inicio', href: '/', icon: Zap, color: 'from-slate-700 to-slate-800', desc: 'Página principal' },
  { name: 'IV-CNVTE', href: '/iv-cnvte', icon: Target, color: 'from-gray-700 to-gray-800', desc: 'Edición anterior' },
  { name: 'V-CNVTE', href: '/v-cnvte', icon: Award, color: 'from-blue-700 to-blue-800', desc: 'Competencia actual' },
  { name: 'Galería', href: '/gallery', icon: Camera, color: 'from-slate-600 to-slate-700', desc: 'Fotos y videos' },
  { name: 'Reglamento', href: '/reglamento', icon: FileText, color: 'from-gray-600 to-gray-700', desc: 'Normas oficiales' },
  { name: 'Blog', href: '/blog', icon: BookOpen, color: 'from-slate-600 to-slate-700', desc: 'Noticias' },
  { name: 'Contacto', href: '/contacto', icon: MessageCircle, color: 'from-gray-600 to-gray-700', desc: 'Información' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Inicio')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollY / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
      
      // Determine active section based on scroll position
      const sections = navigation.map(item => item.name)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.toLowerCase())
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Minimal Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200' 
          : 'bg-white/90'
      } backdrop-blur-sm`}>
        
        {/* Professional Top Bar */}
        <div className="bg-slate-800 text-white border-b border-slate-700">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">V-CNVTE 2025</span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Competencia Nacional de Vehículos Eléctricos</span>
                </div>
                <div className="hidden lg:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-xs text-gray-300">Activo</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-4 text-xs">
                  <span className="text-gray-400">Estado:</span>
                  <span className="text-blue-400 font-medium">Inscripciones Abiertas</span>
                </div>
                <div className="bg-blue-600 px-3 py-1 rounded text-xs font-medium text-white">
                  Fase: Registro
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Main Navigation */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-3" aria-label="Global">
          
          {/* Professional Logo Section */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                {/* Simple Logo Container */}
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shadow-lg border border-slate-700 group-hover:bg-slate-700 transition-colors duration-200">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800">
                  V-CNVTE
                </span>
                <span className="text-xs font-medium text-gray-600 tracking-wide uppercase">
                  COMPETENCIA 2025
                </span>
              </div>
            </Link>
          </div>
          
          {/* Professional Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:text-slate-800 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú principal</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Professional Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-1">
            {navigation.map((item) => {
              const IconComponent = item.icon
              const isActive = activeSection === item.name
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-slate-800 shadow-md' 
                      : 'text-gray-700 hover:text-slate-800 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`} />
                  <span>{item.name}</span>
                  
                  {/* Simple Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </Link>
              )
            })}
          </div>
          
          {/* Professional CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/v-cnvte"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Participar Ahora
            </Link>
          </div>
        </nav>
        
        {/* Simple Bottom Border */}
        <div className="h-px bg-gray-200" />
      </header>
      
      <MobileMenu 
        open={mobileMenuOpen} 
        setOpen={setMobileMenuOpen} 
        navigation={navigation}
      />
    </>
  )
}