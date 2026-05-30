'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

const ROLES = [
  'Embedded Engineer',
  'Security Researcher',
  'Creative Developer',
  'Robotics Competitor',
]

// ── Character-by-character mask reveal ───────────────────────────────────────
interface SplitProps {
  text: string
  delay?: number
  className?: string
}

function SplitReveal({ text, delay = 0, className }: SplitProps) {
  return (
    <span className={cn('inline-flex justify-center', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0, rotateX: -35 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.95, delay: delay + i * 0.03, ease: EASE }}
          className="inline-block"
          style={{ transformOrigin: 'top center' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ── Vertical-flip role rotator ───────────────────────────────────────────────
function RoleRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="block text-accent"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Scrolling background word band ───────────────────────────────────────────
function MarqueeBand({
  text,
  reverse = false,
  className,
}: {
  text: string
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('flex whitespace-nowrap select-none', className)}
      aria-hidden="true"
    >
      <div
        className="flex shrink-0 animate-marquee"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="font-display italic text-outline px-8"
            style={{ fontSize: 'clamp(5rem, 16vw, 15rem)', lineHeight: 1 }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Subtle pointer parallax on the centered content
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 })
  const py = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 })
  // Background drifts opposite for depth
  const bx = useSpring(useTransform(mx, [-1, 1], [18, -18]), { stiffness: 40, damping: 22 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden grid-lines flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* ── Atmospheric orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[12%] left-[12%] w-[460px] h-[460px] rounded-full bg-accent blur-[150px] animate-pulse-glow" />
        <div
          className="absolute bottom-[8%] right-[14%] w-[380px] h-[380px] rounded-full blur-[130px] animate-pulse-glow"
          style={{ background: 'rgba(59, 130, 246, 0.07)', animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[620px] h-[620px] rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
          style={{ background: 'rgba(196, 165, 90, 0.05)', animationDelay: '3s' }}
        />
      </div>

      {/* ── Scrolling background word bands ── */}
      <motion.div
        style={{ x: bx }}
        className="absolute inset-0 flex flex-col justify-between py-[8vh] pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        >
          <MarqueeBand text="DEVELOPER · DESIGNER · ENGINEER · " />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          <MarqueeBand text="SECURITY · EMBEDDED · ROBOTICS · " reverse />
        </motion.div>
      </motion.div>

      {/* ── Radial vignette to focus center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(7,7,12,0.55) 70%, rgba(7,7,12,0.9) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Centered content ── */}
      <motion.div
        style={{ y, opacity, x: px, translateY: py }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Name — full-bleed centered */}
        <h1
          className="font-display italic font-light leading-[0.85] tracking-[-0.02em] text-balance"
          style={{ fontSize: 'clamp(3rem, 10.5vw, 10rem)', perspective: '800px' }}
        >
          <span className="clip-text">
            <SplitReveal text="Cristian" delay={0.5} />
          </span>
          <span className="clip-text">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.66, ease: EASE }}
              className="text-shimmer inline-block"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #C4A55A 0%, #E8C47A 45%, #fff7e6 50%, #E8C47A 55%, #C4A55A 100%)',
              }}
            >
              Francesco
            </motion.span>
          </span>
          <span className="clip-text">
            <SplitReveal text="Pennino" delay={0.84} />
          </span>
        </h1>

        {/* Role rotator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.45, ease: EASE }}
          className="mt-7 flex items-center gap-4"
        >
          <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
          <span className="font-label text-[13px] md:text-[15px] tracking-[0.04em] text-muted">
            <RoleRotator />
          </span>
          <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 1.6, ease: EASE }}
          className="mt-6 max-w-md font-sans text-muted text-[13px] md:text-[14px] leading-[1.75]"
        >
          Crafting digital experiences at the intersection of design and
          engineering — from microcontrollers to the modern web.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.75, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-bg font-label text-[10px] tracking-[0.16em] uppercase rounded-full hover:bg-accent-light transition-all duration-300"
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
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-[rgba(255,255,255,0.12)] text-muted font-label text-[10px] tracking-[0.16em] uppercase rounded-full hover:text-text hover:border-[rgba(255,255,255,0.25)] transition-all duration-300"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* ── Availability indicator — bottom left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.9 }}
        className="absolute bottom-8 left-8 z-10 hidden md:flex items-center gap-2.5"
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <span className="font-mono text-[9px] tracking-[0.22em] text-muted uppercase">
          Available for work
        </span>
      </motion.div>

      {/* ── Corner marks ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 w-6 h-6 border-l border-t border-accent/25 hidden md:block"
        aria-hidden="true"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-accent/25 hidden md:block"
        aria-hidden="true"
      />

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="font-mono text-[8px] tracking-[0.35em] text-dim uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9 bg-gradient-to-b from-accent/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
