'use client'

import { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/data/gallery'
import { Filter, X } from 'lucide-react'

export default function MasonryGallery() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filters = [
    { id: 'all', label: 'Todas' },
    { id: '2024', label: 'V-CNVTE 2024' },
    { id: '2023', label: 'IV-CNVTE 2023' },
    { id: '2022', label: 'III-CNVTE 2022' },
    { id: 'ceremonies', label: 'Ceremonias' },
    { id: 'presentations', label: 'Presentaciones' },
    { id: 'workshops', label: 'Talleres' }
  ]

  const filteredImages = selectedFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedFilter)

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedFilter === filter.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedImage(image.src)}
          >
            <div className="relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={image.height}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-1">{image.title}</h3>
              <p className="text-sm text-slate-600">{image.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {image.year}
                </span>
                <span className="text-xs text-slate-500">{image.university}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}