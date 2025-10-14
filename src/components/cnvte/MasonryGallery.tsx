'use client'

import { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/data/gallery'
import { X } from 'lucide-react'

export default function MasonryGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedImage(image.src)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={image.height}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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