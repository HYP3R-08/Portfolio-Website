'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealLine, RevealParagraph } from '@/components/Animate'
import { cn } from '@/lib/utils'

interface ExperienceItem {
  period: string
  role: string
  company: string
  type: string
  description: string
  highlights: string[]
  featured?: boolean
}

const experiences: ExperienceItem[] = [
  {
    period: '2023 — 2024',
    role: 'Participant',
    company: 'CyberChallenge.IT',
    type: 'Training',
    description:
      'National cybersecurity program at the University of Catania. Intensive track covering ethical hacking, cryptography, network security, and Capture The Flag (CTF) competitions. Focused on problem solving, teamwork, and the development of advanced skills in information security.',
    highlights: ['Ethical hacking', 'Cryptography', 'CTF competitions', 'Unict'],
  },
  {
    period: '2023 — 2024',
    role: 'Participant',
    company: 'OIS & OII — Italian Olympiad in Informatics',
    type: 'Competition',
    description:
      'Participation in the regional rounds of the Italian Olympiad in Informatics, both individually (OII) and as a team (OIS). Track centered on algorithmic problem solving, competitive programming, algorithm optimization, and data structures — combining rigorous logical reasoning with team collaboration.',
    highlights: ['Problem solving', 'Algorithms & data structures', 'Team & individual', 'Competitive programming'],
  },
  {
    period: '2023 — 2024',
    role: 'Finalist · 3rd place',
    company: 'STMicroelectronics — Build the Future with STM32ODE',
    type: 'Contest',
    description:
      'Finalist and 3rd-place winner of the national contest promoted by STMicroelectronics. Project "Smart Packaging": an embedded and IoT solution based on STM32 microcontrollers, covering hardware/software design, electronic prototyping, and a final presentation — with a focus on applied technological innovation.',
    highlights: ['STM32 · Embedded', 'IoT', 'HW/SW prototyping', '3rd place national'],
  },
  {
    period: '2023 — 2024',
    role: 'Finalist · 65th place national',
    company: 'OliCyber.IT',
    type: 'Competition',
    description:
      'Finalist in the national OliCyber.IT competition dedicated to cybersecurity and ethical hacking, ranking 65th nationally. Track covering cryptography, network security, web security, and reverse engineering — tackling technical challenges in a high-level competitive setting.',
    highlights: ['Cryptography', 'Web security', 'Reverse engineering', '65th national'],
  },
  {
    period: '2024 — 2025',
    role: 'Participant',
    company: 'STMicroelectronics — Build the Future with STM32ODE',
    type: 'Contest',
    description:
      'Participation in the national contest promoted by STMicroelectronics. Project "ForestGuard": an embedded and IoT solution based on STM32 microcontrollers, covering hardware/software design and electronic prototyping for forest fire monitoring — with a focus on applied technological innovation.',
    highlights: ['STM32 · Embedded', 'IoT', 'HW/SW prototyping', 'Environmental monitoring'],
  },
  {
    period: 'Jun — Jul 2025',
    role: 'Participant',
    company: 'NXP Summer School 2025',
    type: 'Training',
    description:
      'Full-immersive program dedicated to embedded electronics and microcontroller technologies, held from June 30 to July 6, 2025. Intensive track focused on electronic design, embedded systems, firmware development, IoT, and hardware/software applications through hands-on activities and advanced labs.',
    highlights: ['Embedded systems', 'Firmware development', 'IoT', 'HW/SW labs'],
  },
  {
    period: '2025 — 2026',
    role: 'Participant · 3rd Di Bartolo Award',
    company: 'STMicroelectronics — Build the Future with STM32ODE',
    type: 'Contest',
    description:
      'Participation in the national contest promoted by STMicroelectronics with project "AuthLog": an embedded and IoT solution based on STM32 microcontrollers for secure authentication and hardware/software integration. With the same project, winner of the 3rd place "Salvatore Di Bartolo" Award at ITIS "E. Fermi" of Giarre.',
    highlights: ['STM32 · Embedded', 'IoT', 'Secure authentication', '3rd Di Bartolo Award'],
  },
  {
    period: '2025 — 2026',
    role: 'Finalist · 92nd place national',
    company: 'OliCyber.IT',
    type: 'Competition',
    description:
      'Finalist in the national OliCyber.IT competition dedicated to cybersecurity and ethical hacking, ranking 92nd nationally. Track covering cryptography, network security, web security, and reverse engineering — tackling technical challenges in a high-level competitive setting.',
    highlights: ['Cryptography', 'Web security', 'Reverse engineering', '92nd national'],
  },
  {
    period: '2025 — 2026',
    role: '1st place',
    company: 'RoboCupJunior Rescue Simulation',
    type: 'Competition',
    description:
      '1st-place winner at the national RoboCupJunior Rescue Simulation competition with team Black Radiators, focused on autonomous robotics and artificial intelligence. Track covering programming, computer vision, and robot control — tackling technical challenges in a high-level competitive setting. Qualified for the World Championship in Incheon, July 2026.',
    highlights: ['Programming', 'Computer vision', 'Robot control', '1st place national'],
  },
  {
    period: 'Jul 2026',
    role: '3rd place',
    company: 'RoboCup World Championship — Rescue Simulation',
    type: 'Competition',
    description:
      '3rd-place winner at the RoboCup World Championship in the Rescue Simulation category with team Black Radiators, held in Incheon, South Korea. Competing against top international teams, the track covered autonomous robotics, computer vision, and real-time robot control — bringing an award home from the highest level of the competition after qualifying as national champions.',
    highlights: ['Autonomous robotics', 'Computer vision', 'Robot control', '3rd place world'],
    featured: true,
  },
]

const certifications = [
  {
    issuer: 'Cisco',
    name: 'IT Essentials',
    year: '2024',
  },
  {
    issuer: 'Cisco',
    name: 'CCNA: Introduction to Networks',
    year: '2025',
  },
  {
    issuer: 'Cisco',
    name: 'CCNA: Switching, Routing & Wireless Essentials',
    year: '2026',
  },
  {
    issuer: 'Cisco',
    name: 'CCNA: Enterprise Networking, Security, and Automation',
    year: '2026',
  },
  {
    issuer: 'Cambridge',
    name: 'English Certification B2',
    year: '2025',
  },
]

function CertificationsStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 pt-10 border-t border-[rgba(255,255,255,0.05)]"
    >
      <div className="font-mono text-[8px] tracking-[0.28em] text-accent uppercase mb-6">
        Certifications
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3.5 px-4 py-3.5 rounded-xl bg-elevated border border-[rgba(255,255,255,0.05)] hover:border-accent/15 transition-colors duration-300"
          >
            <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center" aria-hidden="true">
              <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 12 12">
                <path d="M6 1l1.3 2.6L10 4.1 8 6l.5 2.9L6 7.5 3.5 8.9 4 6 2 4.1l2.7-.5L6 1z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-[8px] tracking-[0.18em] text-muted uppercase mb-0.5">
                {cert.issuer} · {cert.year}
              </div>
              <div className="font-label text-[12px] text-text leading-snug">
                {cert.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

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
        className={cn(
          'absolute left-[-4.5px] md:left-[147.5px] top-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0',
          exp.featured
            ? 'bg-accent border-2 border-accent-light shadow-[0_0_14px_3px_rgba(196,165,90,0.55)]'
            : 'bg-bg border-2 border-accent/30',
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="pl-6 md:pl-10 flex-1">
        <div
          className={cn(
            exp.featured &&
              'relative rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.08] via-accent/[0.03] to-transparent px-5 py-5 md:px-6 md:py-6 shadow-[0_0_50px_-16px_rgba(196,165,90,0.4)]',
          )}
        >
          {exp.featured && (
            <div className="inline-flex items-center gap-1.5 mb-3.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30">
              <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M4.4 4.6 3.1 1.4M7.6 4.6 8.9 1.4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="6" cy="7.4" r="3" stroke="currentColor" strokeWidth="0.9" />
                <path d="M6 6l.44.9.98.14-.71.69.17.98L6 8.28l-.88.42.17-.98-.71-.69.98-.14z" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-accent-light">
                International podium
              </span>
            </div>
          )}
          <h3
            className={cn(
              'font-label font-semibold mb-0.5',
              exp.featured ? 'text-[17px] text-accent-light' : 'text-[15px] text-text',
            )}
          >
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
                className={cn(
                  'font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md border cursor-default transition-all duration-250',
                  exp.featured
                    ? 'bg-accent/10 border-accent/25 text-accent-light hover:bg-accent/20 hover:border-accent/40'
                    : 'bg-elevated border-[rgba(255,255,255,0.08)] text-muted hover:bg-[rgba(240,237,230,0.08)] hover:border-[rgba(240,237,230,0.18)] hover:text-text',
                )}
              >
                {h}
              </motion.span>
            ))}
          </div>
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

      {/* Certifications */}
      <CertificationsStrip />
    </section>
  )
}
