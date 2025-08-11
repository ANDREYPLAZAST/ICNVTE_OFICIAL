'use client'

import Image from 'next/image'
import { sponsors } from '@/data/sponsors'

export default function SponsorMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee space-x-16">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center w-48 h-24 bg-white rounded-lg p-4 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={160}
              height={60}
              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}