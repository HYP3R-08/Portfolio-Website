'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { FadeUp, RevealHeading, RevealParagraph, RevealLine } from '@/components/Animate'

const stats = [
  { value: '8+', label: 'Competitions' },
  { value: '3', label: 'National awards' },
  { value: '1', label: 'International award' },
  { value: '10+', label: 'Technologies' },
]

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '0px 0px -60px 0px' })

  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="about-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-3.5 mb-16 md:mb-20" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">01</span>
        <div className="h-px w-7 bg-accent/30" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">About</span>
      </div>

      <div className="grid md:grid-cols-[1fr_0.85fr] gap-16 lg:gap-28 items-start">
        {/* Left */}
        <div>
          {/* Heading — word reveal */}
          <h2
            id="about-heading"
            className="font-display italic font-light text-text leading-[1.06] mb-10"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            <RevealLine delay={0}>Building with{' '}</RevealLine>
            <RevealLine delay={0.08}>
              <span className="text-accent">intention</span>,
            </RevealLine>
            <RevealLine delay={0.16}>shipping with</RevealLine>
            <RevealLine delay={0.24}>precision.</RevealLine>
          </h2>

          {/* Paragraphs */}
          <RevealParagraph
            delay={0.1}
            className="font-sans text-muted text-[14px] md:text-[15px] leading-[1.85] mb-5"
          >
            I&apos;m a developer based in Sicily, Italy, with a passion for
            embedded systems, cybersecurity, and web development. From STM32
            microcontrollers to full-stack web apps, I enjoy working across
            the full spectrum — hardware-close firmware and polished browser
            interfaces alike.
          </RevealParagraph>

          <RevealParagraph
            delay={0.2}
            className="font-sans text-muted text-[14px] md:text-[15px] leading-[1.85] mb-12"
          >
            I&apos;ve competed nationally in cybersecurity (OliCyber, CyberChallenge),
            algorithmic programming (OII/OIS), embedded IoT (STMicroelectronics),
            and robotics (RoboCup), earning multiple awards along the way.
            Outside competitions, I build web projects that prioritize clean
            design and solid engineering.
          </RevealParagraph>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={
                  statsInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.05 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-l border-accent/20 pl-4"
              >
                <div className="font-display text-[2rem] italic font-light text-accent leading-none mb-1.5">
                  {s.value}
                </div>
                <div className="font-label text-[9px] tracking-[0.16em] text-muted uppercase leading-snug">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — profile visual */}
        <div ref={imageRef} className="relative mt-4 md:mt-0">
          <div className="relative aspect-[4/5] max-w-[340px] mx-auto md:mx-0 md:ml-auto">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                  : {}
              }
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full rounded-[20px] overflow-hidden relative"
            >
              <Image
                src="/cristian.png"
                alt="Cristian Francesco Pennino"
                fill
                className="object-cover object-top"
                style={{ filter: 'grayscale(0.1) contrast(1.05) brightness(0.9)' }}
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
            </motion.div>

            {/* Badge — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={imageInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 -left-5 bg-elevated border border-[rgba(255,255,255,0.08)] rounded-[14px] px-4 py-3 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="font-mono text-[9px] tracking-widest text-dim uppercase mb-1">Currently</div>
              <div className="font-label text-xs text-text font-semibold">Open to work</div>
            </motion.div>

            {/* Badge — top-right */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={imageInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 -right-4 bg-accent/10 border border-accent/25 rounded-[14px] px-4 py-2.5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-widest text-accent uppercase">Italy, EU</span>
              </div>
            </motion.div>

            {/* Corner accents */}
            <span className="absolute top-4 left-4 w-5 h-5 border-l border-t border-accent/20" aria-hidden="true" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-accent/20" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
