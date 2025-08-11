'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { universities } from '@/data/universities'

export default function UniCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === universities.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Main Carousel */}
      <div className="flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {universities.map((university, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-80">
                  <Image
                    src={university.image}
                    alt={university.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <Image
                      src={university.logo}
                      alt={`Logo ${university.name}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {university.name}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {university.description}
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {university.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {universities.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        onClick={() => setCurrentIndex(currentIndex === 0 ? universities.length - 1 : currentIndex - 1)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        onClick={() => setCurrentIndex(currentIndex === universities.length - 1 ? 0 : currentIndex + 1)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}