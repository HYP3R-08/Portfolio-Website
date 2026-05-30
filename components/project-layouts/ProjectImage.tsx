'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProjectImageProps {
  src?: string
  alt: string
  gradient: string
  index: number
  className?: string
  aspectClass?: string
}

export default function ProjectImage({
  src,
  alt,
  gradient,
  index,
  className,
  aspectClass = 'aspect-video',
}: ProjectImageProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-elevated border border-white/[0.04]', aspectClass, className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <>
          <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
          <div className="absolute inset-0 grid-lines opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white/20" fill="none" viewBox="0 0 16 16">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
                <path d="M1 10l3.5-3 3 3 2.5-2.5L15 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[7px] tracking-[0.2em] text-white/15 uppercase">
              Photo {index + 1}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
