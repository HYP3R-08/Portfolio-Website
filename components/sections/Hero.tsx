'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SplitProps {
  text: string
  delay?: number
  className?: string
}

function SplitReveal({ text, delay = 0, className }: SplitProps) {
  return (
    <span className={cn('inline-flex', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '105%', opacity: 0, rotateX: -20 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'top center' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen overflow-hidden grid-lines"
      aria-label="Hero section"
    >
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full bg-accent blur-[140px] animate-pulse-glow" />
        <div
          className="absolute bottom-[5%] right-[10%] w-[350px] h-[350px] rounded-full blur-[120px] animate-pulse-glow"
          style={{ background: 'rgba(59, 130, 246, 0.08)', animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[600px] h-[600px] rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
          style={{ background: 'rgba(196, 165, 90, 0.04)', animationDelay: '3s' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-28"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-10 md:mb-14"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <h1
          className="font-display italic font-light leading-[0.88] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 9rem)' }}
        >
          <span className="clip-text block overflow-hidden">
            <SplitReveal text="Cristian" delay={0.55} />
          </span>
          <span className="clip-text block overflow-hidden ml-[0.06em] md:ml-[0.25em]">
            <SplitReveal text="Francesco" delay={0.68} className="text-accent" />
          </span>
          <span className="clip-text block overflow-hidden">
            <SplitReveal text="Pennino" delay={0.82} />
          </span>
        </h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7"
        >
          <div className="h-px w-10 bg-accent/40 flex-shrink-0" aria-hidden="true" />
          <p className="font-sans text-muted text-[14px] md:text-[15px] max-w-xs leading-[1.75]">
            Creative developer crafting digital experiences at the intersection
            of design and engineering.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-accent text-bg font-label text-[10px] tracking-[0.16em] uppercase rounded-full hover:bg-accent-light transition-all duration-300"
          >
            View work
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 12 12"
              aria-hidden="true"
            >
              <path
                d="M1 6h10M7 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-[rgba(255,255,255,0.1)] text-muted font-label text-[10px] tracking-[0.16em] uppercase rounded-full hover:text-text hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 right-7 md:right-14 z-10 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[8px] tracking-[0.35em] text-dim uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="absolute top-6 right-6 md:right-14 z-10 flex items-center gap-1.5"
        aria-label="Location: Italy, EU"
      >
        <svg
          className="w-2.5 h-2.5 text-dim"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <circle cx="12" cy="11" r="3" />
        </svg>
        <span className="font-mono text-[9px] tracking-[0.18em] text-dim uppercase">
          Italy, EU
        </span>
      </motion.div>
    </section>
  )
}
