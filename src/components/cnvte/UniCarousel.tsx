'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { universities } from '@/data/universities'

export default function UniCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      const animation = marqueeRef.current.getAnimations()[0]
      animation.playbackRate = 0.1
      setTimeout(() => {
        if (isPaused) {
          animation.pause()
        }
      }, 300)
    }
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      const animation = marqueeRef.current.getAnimations()[0]
      animation.playbackRate = 1
      animation.play()
    }
    setIsPaused(false)
  }

  // Triplicamos el array para asegurar una transición más suave
  const displayUniversities = [...universities, ...universities, ...universities]

  useEffect(() => {
    const marquee = marqueeRef.current
    if (marquee) {
      // Calculamos el ancho total del contenido
      const contentWidth = marquee.scrollWidth / 3
      
      // Creamos la animación con keyframes
      marquee.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${contentWidth}px)` }
        ],
        {
          duration: 40000, // 40 segundos para un movimiento más suave
          iterations: Infinity,
          easing: 'linear'
        }
      )
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={marqueeRef}
        className="flex space-x-8 animate-marquee whitespace-nowrap"
        style={{
          animationDuration: '30s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayUniversities.map((university, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-500 ease-out transform hover:shadow-xl"
          >
            <div className="md:flex">
              <div className="md:w-1/2 relative h-48">
                <Image
                  src={university.image}
                  alt={university.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-center bg-gradient-to-r from-white to-slate-50">
                <div className="mb-3 transform transition-all duration-500 ease-out hover:scale-110">
                  <Image
                    src={university.logo}
                    alt={`Logo ${university.name}`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {university.name}
                </h3>
                <div className="flex items-center text-sm text-slate-500">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {university.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}