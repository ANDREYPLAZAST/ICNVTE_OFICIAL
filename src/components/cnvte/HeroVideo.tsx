'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay fails
        console.log('Autoplay prevented')
      })
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video_home/webPageLoopVcnvte.mp4"
      >
        <source src="/video_home/webPageLoopVcnvte.mp4" type="video/mp4" />
      </video>
      
      {/* Professional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-white/20" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto mt-24">
        
        {/* Spacing for top content */}
        <div className="mb-6"></div>
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            V-CNVTE
          </span>
        </h1>
        
        {/* Year */}
        <div className="text-3xl md:text-4xl font-semibold mb-14 text-blue-100 mb-2">
          2025
        </div>
        
        {/* Subtitle */}
        <div className="text-xl md:text-2xl mb-8 font-medium text-white max-w-4xl mx-auto">
          Competencia Nacional de Vehículos de Tracción Eléctrica
        </div>
        
        {/* Description */}
        <p className="text-lg md:text-xl mb-16 text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
          Donde la innovación, la eficiencia energética y la ingeniería de vanguardia 
          <span className="text-blue-200 font-medium"> se unen para crear el futuro de la movilidad eléctrica</span>
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/v-cnvte"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span className="relative z-10">Participar Ahora</span>
          </a>
          
          <a
            href="/reglamento"
            className="group relative px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
          >
            Ver Reglamento
          </a>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-sm text-white/80 font-medium">Equipos Participantes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-sm text-white/80 font-medium">Universidades</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100</div>
            <div className="text-sm text-white/80 font-medium">km/h Máx</div>
          </div>
        </div>
      </div>
    </section>
  )
}