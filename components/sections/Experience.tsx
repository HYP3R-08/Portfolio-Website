'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealLine, RevealParagraph } from '@/components/Animate'

interface ExperienceItem {
  period: string
  role: string
  company: string
  type: string
  description: string
  highlights: string[]
}

const experiences: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Senior Frontend Developer',
    company: 'Company Name',
    type: 'Full-time',
    description:
      'Leading frontend architecture for a B2B SaaS platform serving thousands of users. Drove design system adoption and significantly improved performance and developer experience.',
    highlights: ['Design system · 60+ components', 'Bundle size −40%', 'Team of 4'],
  },
  {
    period: '2023 — 2024',
    role: 'Full-Stack Developer',
    company: 'Digital Agency',
    type: 'Full-time',
    description:
      'Crafted digital experiences for clients across fintech, e-commerce, and media. Owned the full product lifecycle from discovery through production deployment.',
    highlights: ['8 projects shipped', 'CI/CD pipeline', 'TypeScript migration'],
  },
  {
    period: '2022 — 2023',
    role: 'Frontend Developer',
    company: 'Early-Stage Startup',
    type: 'Full-time',
    description:
      'Joined as the first frontend hire. Built the entire UI layer from scratch, establishing architecture patterns and workflows that scaled as the team grew.',
    highlights: ['0→1 product build', 'Mobile-first redesign', '+200% engagement'],
  },
  {
    period: '2020 — 2022',
    role: 'Freelance Developer & Designer',
    company: 'Self-employed',
    type: 'Freelance',
    description:
      'Independent practice serving SMBs and digital agencies. Developed strong client communication, technical range, and an instinct for shipping high-quality work under pressure.',
    highlights: ['15+ clients', 'Full-service studio', 'E-commerce focus'],
  },
]

function ExperienceRow({ exp, i }: { exp: ExperienceItem; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -70px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row gap-4 md:gap-0 pb-12 last:pb-0"
    >
      {/* Period */}
      <div className="md:w-[152px] md:pr-8 md:text-right flex-shrink-0 pt-0.5">
        <span className="font-mono text-[9px] tracking-[0.18em] text-muted uppercase whitespace-nowrap">
          {exp.period}
        </span>
      </div>

      {/* Dot */}
      <div
        className="absolute left-[-4.5px] md:left-[147.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-bg border-2 border-accent/30 flex-shrink-0"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="pl-6 md:pl-10 flex-1">
        <h3 className="font-label text-[15px] font-semibold text-text mb-0.5">
          {exp.role}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-sans text-[13px] text-accent">{exp.company}</span>
          <span className="text-dim text-xs" aria-hidden="true">·</span>
          <span className="font-mono text-[8px] tracking-widest text-dim uppercase">{exp.type}</span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: i * 0.06 + 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[13px] text-muted leading-[1.8] mb-4"
        >
          {exp.description}
        </motion.p>

        <div className="flex flex-wrap gap-2" role="list">
          {exp.highlights.map((h, hi) => (
            <motion.span
              key={h}
              role="listitem"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.45,
                delay: i * 0.06 + 0.25 + hi * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md bg-elevated border border-[rgba(255,255,255,0.04)] text-dim"
            >
              {h}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' })

  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <section
      id="experience"
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="experience-heading"
    >
      <div className="flex items-center gap-3.5 mb-16" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">04</span>
        <div className="h-px w-7 bg-accent/30" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">Experience</span>
      </div>

      <div ref={headerRef} className="mb-16">
        <h2
          id="experience-heading"
          className="font-display italic font-light text-text leading-[1.0]"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          <RevealLine delay={0}>The journey</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-accent">so far.</span>
          </RevealLine>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative" ref={lineRef}>
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={lineInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 md:left-[152px] top-2 bottom-0 w-px bg-gradient-to-b from-accent/25 via-accent/08 to-transparent origin-top"
          aria-hidden="true"
        />

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
