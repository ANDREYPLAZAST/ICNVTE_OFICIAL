'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { Menu, Calendar, Trophy } from 'lucide-react'
import MobileMenu from './MobileMenu'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

import { Home, Archive, ImageIcon, FileText, Mail } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '/', icon: Home, color: 'from-slate-700 to-slate-800', desc: 'Página principal' },
  { name: 'IV-CNVTE', href: '/iv-cnvte', icon: Archive, color: 'from-gray-700 to-gray-800', desc: 'Edición anterior' },
  { name: 'Galería', href: '/gallery', icon: ImageIcon, color: 'from-slate-600 to-slate-700', desc: 'Fotos y videos' },
  { name: 'Reglamento', href: '/reglamento', icon: FileText, color: 'from-gray-600 to-gray-700', desc: 'Normas oficiales' },
  { name: 'Contacto', href: '/contacto', icon: Mail, color: 'from-gray-600 to-gray-700', desc: 'Información' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Inicio')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDarkPage, setIsDarkPage] = useState(false)

  useEffect(() => {
    // Check if current page has dark background
    const checkDarkPage = () => {
      const pathname = window.location.pathname
      setIsDarkPage(pathname === '/iv-cnvte')
    }
    
    checkDarkPage()
    
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
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-[60]">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        
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
                  <span className="text-blue-400 font-medium">Inscripciones Cerradas</span>
                </div>
                <div className="bg-blue-600 px-3 py-1 rounded text-xs font-medium text-white">
                  Fase: Espera de competencia
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
                <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                  {/* Logo para fondo transparente */}
                  <Image
                    src="/media/logo.png"
                    alt="VCNVTE Logo"
                    width={48}
                    height={48}
                    className={`w-full h-full object-contain transition-opacity duration-300 absolute top-0 left-0 ${
                      isScrolled ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Logo para fondo blanco */}
                  <Image
                    src="/media/logo-dark.png"
                    alt="VCNVTE Logo"
                    width={48}
                    height={48}
                    className={`w-full h-full object-contain transition-opacity duration-300 absolute top-0 left-0 ${
                      isScrolled ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-slate-800' : (isDarkPage ? 'text-white' : 'text-white')
                }`}>
                  V-CNVTE
                </span>
                <span className={`text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : (isDarkPage ? 'text-gray-200' : 'text-gray-200')
                }`}>
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
              const isActive = activeSection === item.name
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${spaceGrotesk.className} ${
                    isScrolled
                      ? 'text-blue-600 hover:text-blue-800 hover:bg-gray-100'
                      : isDarkPage
                      ? 'text-white hover:text-gray-200 hover:bg-white/10'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Professional CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/v-cnvte"
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                isScrolled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : isDarkPage
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/50'
              }`}
            >
              Participar Ahora
            </Link>
          </div>
        </nav>
      </header>
      
      <MobileMenu 
        open={mobileMenuOpen} 
        setOpen={setMobileMenuOpen} 
        navigation={navigation}
      />
    </>
  )
}