'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealLine, RevealParagraph } from '@/components/Animate'

const socials = [
  { label: 'GitHub', href: 'https://github.com/HYP3R-08', handle: 'HYP3R-08' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cristian-francesco-pennino-7a913b2ab/', handle: 'in/cristian_francesco_pennino' },
  { label: 'Email', href: 'mailto:penninocristianfrancesco@gmail.com', handle: 'penninocristianfrancesco@gmail.com' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const socialsRef = useRef(null)
  const socialsInView = useInView(socialsRef, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <section
      id="contact"
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="contact-heading"
    >
      <div className="flex items-center gap-3.5 mb-16" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">05</span>
        <div className="h-px w-7 bg-accent/30" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">Contact</span>
      </div>

      <div className="max-w-3xl">
        {/* Headline */}
        <h2
          id="contact-heading"
          ref={ref}
          className="font-display italic font-light text-text leading-[0.92] mb-10"
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
        >
          <RevealLine delay={0}>Let&apos;s build</RevealLine>
          <RevealLine delay={0.1}>something</RevealLine>
          <RevealLine delay={0.2}>
            <span className="text-accent">great</span>
            <span className="text-text">.</span>
          </RevealLine>
        </h2>

        <RevealParagraph
          delay={0.1}
          className="font-sans text-muted text-[14px] md:text-[15px] leading-[1.8] mb-12 max-w-md"
        >
          Whether you have a project in mind, an opportunity to discuss, or
          simply want to connect — my inbox is always open.
        </RevealParagraph>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <a
            href="mailto:hello@pennino.dev"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-accent text-bg font-label text-[11px] tracking-[0.18em] uppercase rounded-full hover:bg-accent-light transition-colors duration-300"
          >
            Send a message
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Socials */}
        <div ref={socialsRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={socialsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-mono text-[8px] tracking-[0.25em] uppercase text-dim mb-5"
            aria-hidden="true"
          >
            Find me on
          </motion.div>

          <div className="flex flex-wrap gap-x-10 gap-y-5" role="list" aria-label="Social media links">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={socialsInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col gap-1"
                aria-label={`${s.label}: ${s.handle}`}
              >
                <span className="font-mono text-[8px] tracking-[0.22em] text-dim uppercase group-hover:text-accent transition-colors duration-300">
                  {s.label}
                </span>
                <span className="font-sans text-[13px] text-muted group-hover:text-text transition-colors duration-300">
                  {s.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
