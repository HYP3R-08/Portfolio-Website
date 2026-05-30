'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealLine, RevealParagraph } from '@/components/Animate'

const categories = [
  {
    id: 'frontend',
    label: 'Frontend & Web',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP / ScrollTrigger', 'JavaScript ES6+', 'Vite'],
  },
  {
    id: 'embedded',
    label: 'Embedded & IoT',
    skills: ['Embedded C', 'STM32 (F4 / WL55)', 'ESP8266', 'SPI / I²C / UART', 'LoRa 868 MHz', 'RFID / NFC', 'PCB Design', 'Low-power Design'],
  },
  {
    id: 'ai',
    label: 'AI & Robotics',
    skills: ['Python', 'OpenCV', 'NumPy', 'YOLO (Ultralytics)', 'Computer Vision', 'Pathfinding (DFS / BFS)', 'Occupancy Grid', 'Webots / Erebus'],
  },
  {
    id: 'security',
    label: 'Security & Networking',
    skills: ['Ethical Hacking', 'CTF', 'Cryptography', 'Web Security', 'Reverse Engineering', 'TCP / IP Networks', 'Cisco CCNA', 'Linux'],
  },
]

function SkillCategory({ cat, catIdx }: { cat: typeof categories[0]; catIdx: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-5">
        <span className="font-label text-[10px] tracking-[0.2em] uppercase text-accent">{cat.label}</span>
        <div className="h-px bg-accent/20 mt-2.5" />
      </div>

      <ul className="flex flex-col gap-0" role="list">
        {cat.skills.map((skill, skillIdx) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: catIdx * 0.08 + skillIdx * 0.045,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex items-center gap-2.5 py-1.5 cursor-default"
          >
            <span
              className="w-[3px] h-[3px] rounded-full bg-dim group-hover:bg-accent transition-all duration-300 flex-shrink-0 group-hover:scale-125"
              aria-hidden="true"
            />
            <span className="font-sans text-[13px] text-muted group-hover:text-text transition-colors duration-300">
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section
      id="skills"
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="skills-heading"
    >
      <div className="flex items-center gap-3.5 mb-16" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">03</span>
        <div className="h-px w-7 bg-accent/30" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">Skills & Technologies</span>
      </div>

      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <h2
          id="skills-heading"
          className="font-display italic font-light text-text leading-[1.0]"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          <RevealLine delay={0}>Tools of the</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-accent">trade.</span>
          </RevealLine>
        </h2>

        <RevealParagraph
          delay={0.15}
          className="font-sans text-muted text-[13px] md:text-[14px] max-w-[280px] leading-relaxed md:text-right"
        >
          Spanning embedded systems, AI-driven robotics, cybersecurity, and modern web — built through real competitions and projects, not coursework.
        </RevealParagraph>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
        {categories.map((cat, i) => (
          <SkillCategory key={cat.id} cat={cat} catIdx={i} />
        ))}
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -40px 0px' }}
        transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 h-px bg-gradient-to-r from-accent/30 via-accent/08 to-transparent origin-left"
        aria-hidden="true"
      />
    </section>
  )
}
