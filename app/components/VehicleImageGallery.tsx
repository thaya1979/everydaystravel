'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  images:      string[]
  vehicleName: string
}

export default function VehicleImageGallery({ images, vehicleName }: Props) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col gap-3">

      {/* Main hero — no text, clean */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0D1221]" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[selected]}
              alt={vehicleName}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            aria-label={`View image ${i + 1}`}
            className={[
              'relative rounded-xl overflow-hidden border-2 transition-all duration-200',
              i === selected
                ? 'border-[#EBBA6F] shadow-[0_0_0_1px_rgba(235,186,111,0.3)]'
                : 'border-transparent hover:border-white/25 opacity-60 hover:opacity-100',
            ].join(' ')}
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={img}
              alt={`${vehicleName} view ${i + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  )
}
