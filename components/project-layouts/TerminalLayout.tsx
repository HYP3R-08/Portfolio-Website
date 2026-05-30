'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { type Project } from '@/lib/projects'

const BOOT_LINES = [
  'BIOS v2.4.1 — initializing hardware...',
  'Memory check: OK',
  'Loading project manifest...',
  'Mounting filesystem: /projects',
  'Authentication: PASSED',
  'System ready.',
]

const PHOSPHOR = '#4ade80'
const PHOSPHOR_DIM = 'rgba(74,222,128,0.35)'
const PHOSPHOR_FAINT = 'rgba(74,222,128,0.08)'
const BG = '#030603'
const TEXT = 'rgba(220,252,231,0.85)'
const TEXT_DIM = 'rgba(134,239,172,0.45)'

interface Props {
  project: Project
  nextProject: Project
}

function Blink() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
      style={{ color: PHOSPHOR }}
    >
      █
    </motion.span>
  )
}

function TermRow({ label, value }: { label: string; value: string }) {
  const pad = Math.max(0, 12 - label.length)
  return (
    <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: TEXT_DIM, letterSpacing: '0.06em', lineHeight: '2' }}>
      <span style={{ color: PHOSPHOR_DIM }}>{label}</span>
      <span style={{ color: 'rgba(74,222,128,0.2)' }}>{'.'.repeat(pad + 2)}</span>
      <span style={{ color: TEXT }}>{value}</span>
    </div>
  )
}

function SectionBlock({ index, label, children, delay = 0 }: {
  index: string; label: string; children: React.ReactNode; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${PHOSPHOR_FAINT}`,
      }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains)', fontSize: '9px',
          color: PHOSPHOR_DIM, letterSpacing: '0.3em',
        }}>
          {index}
        </span>
        <span style={{ color: PHOSPHOR, fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.2em' }}>
          {'>'} {label.toLowerCase()}.log
        </span>
      </div>
      {children}
    </motion.div>
  )
}

export default function TerminalLayout({ project, nextProject }: Props) {
  const [bootLines, setBootLines] = useState<string[]>([])
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, line])
      }, i * 180)
    })
    setTimeout(() => setBooted(true), BOOT_LINES.length * 180 + 300)
  }, [])

  const scanlines = `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.18) 2px,
    rgba(0,0,0,0.18) 3px
  )`

  return (
    <div style={{ background: BG, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Scanlines overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: scanlines,
      }} aria-hidden="true" />

      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
      }} aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px', margin: '0 auto', padding: '112px 24px 80px' }}>

        {/* Boot sequence */}
        <AnimatePresence>
          {!booted && (
            <motion.div
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '40px' }}
            >
              <div style={{
                fontFamily: 'var(--font-jetbrains)', fontSize: '11px',
                color: TEXT_DIM, letterSpacing: '0.06em',
                border: `1px solid ${PHOSPHOR_FAINT}`,
                padding: '20px 24px',
                marginBottom: '24px',
              }}>
                <div style={{ color: PHOSPHOR_DIM, marginBottom: '16px', fontSize: '9px', letterSpacing: '0.3em' }}>
                  TERMINAL v1.0 — BOOT SEQUENCE
                </div>
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: i === bootLines.length - 1 ? PHOSPHOR : TEXT_DIM, lineHeight: '2' }}
                  >
                    <span style={{ color: PHOSPHOR_DIM, marginRight: '8px' }}>$</span>
                    {line}
                    {i === bootLines.length - 1 && <Blink />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content — appears after boot */}
        <AnimatePresence>
          {booted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div style={{
                fontFamily: 'var(--font-jetbrains)', fontSize: '11px',
                color: TEXT_DIM, marginBottom: '48px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ color: PHOSPHOR_DIM }}>$</span>
                <span>cd</span>
                <Link
                  href="/projects"
                  style={{ color: PHOSPHOR, textDecoration: 'none' }}
                >
                  ~/projects
                </Link>
                <span style={{ color: PHOSPHOR_DIM }}>/</span>
                <span style={{ color: TEXT }}>{project.id}</span>
                <Blink />
              </div>

              {/* Hero grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '48px',
                alignItems: 'start',
                marginBottom: '72px',
              }}>
                {/* Title */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains)', fontSize: '9px',
                    color: PHOSPHOR_DIM, letterSpacing: '0.3em',
                    marginBottom: '16px',
                  }}>
                    // PROJECT #{project.index}
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                      color: PHOSPHOR,
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                      marginBottom: '20px',
                      textShadow: `0 0 40px rgba(74,222,128,0.3)`,
                    }}
                  >
                    {project.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{
                      fontFamily: 'var(--font-jetbrains)', fontSize: '12px',
                      color: TEXT_DIM, lineHeight: '1.9', maxWidth: '480px',
                    }}
                  >
                    {project.description}
                  </motion.p>

                  {project.links && project.links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                    >
                      {project.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{
                            fontFamily: 'var(--font-jetbrains)', fontSize: '10px',
                            color: PHOSPHOR, border: `1px solid ${PHOSPHOR_DIM}`,
                            padding: '6px 14px', letterSpacing: '0.1em',
                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                            transition: 'all 0.2s',
                          }}
                        >
                          <span style={{ color: PHOSPHOR_DIM }}>&gt;</span> {l.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* System info panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{
                    border: `1px solid ${PHOSPHOR_FAINT}`,
                    padding: '20px 24px',
                    minWidth: '200px',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-jetbrains)', fontSize: '8px',
                    color: PHOSPHOR_DIM, letterSpacing: '0.3em',
                    marginBottom: '16px', borderBottom: `1px solid ${PHOSPHOR_FAINT}`, paddingBottom: '10px',
                  }}>
                    SYSTEM INFO
                  </div>
                  <TermRow label="STATUS" value={project.status} />
                  <TermRow label="CATEGORY" value={project.category} />
                  <TermRow label="YEAR" value={project.year} />
                  <div style={{ marginTop: '16px', borderTop: `1px solid ${PHOSPHOR_FAINT}`, paddingTop: '16px' }}>
                    <div style={{
                      fontFamily: 'var(--font-jetbrains)', fontSize: '8px',
                      color: PHOSPHOR_DIM, letterSpacing: '0.3em', marginBottom: '10px',
                    }}>
                      MODULES[]
                    </div>
                    {project.tags.map((tag) => (
                      <div key={tag} style={{
                        fontFamily: 'var(--font-jetbrains)', fontSize: '10px',
                        color: TEXT_DIM, lineHeight: '2',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <span style={{ color: PHOSPHOR_DIM, fontSize: '8px' }}>▸</span>
                        {tag}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Content sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '52px', marginBottom: '80px' }}>
                <SectionBlock index="01" label="Overview" delay={0}>
                  <p style={{
                    fontFamily: 'var(--font-jetbrains)', fontSize: '12px',
                    color: TEXT_DIM, lineHeight: '2',
                  }}>
                    {project.overview}
                  </p>
                </SectionBlock>

                <SectionBlock index="02" label="Challenge" delay={0.05}>
                  <p style={{
                    fontFamily: 'var(--font-jetbrains)', fontSize: '12px',
                    color: TEXT_DIM, lineHeight: '2',
                  }}>
                    {project.challenge}
                  </p>
                </SectionBlock>

                <SectionBlock index="03" label="Outcome" delay={0.1}>
                  <div style={{
                    borderLeft: `2px solid ${PHOSPHOR_DIM}`,
                    paddingLeft: '20px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-jetbrains)', fontSize: '12px',
                      color: TEXT, lineHeight: '2',
                      textShadow: `0 0 20px rgba(74,222,128,0.15)`,
                    }}>
                      {project.outcome}
                    </p>
                  </div>
                </SectionBlock>
              </div>

              {/* Next project */}
              <div style={{
                borderTop: `1px solid ${PHOSPHOR_FAINT}`,
                paddingTop: '40px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-jetbrains)', fontSize: '8px',
                  color: PHOSPHOR_DIM, letterSpacing: '0.3em',
                  marginBottom: '20px',
                }}>
                  // NEXT ENTRY
                </div>
                <Link
                  href={`/projects/${nextProject.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    border: `1px solid ${PHOSPHOR_FAINT}`,
                    padding: '20px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = PHOSPHOR_DIM
                      ;(e.currentTarget as HTMLElement).style.background = PHOSPHOR_FAINT
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${PHOSPHOR_FAINT}`
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-jetbrains)', fontSize: '8px',
                        color: PHOSPHOR_DIM, letterSpacing: '0.3em', marginBottom: '6px',
                      }}>
                        {nextProject.category.toUpperCase()}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-jetbrains)', fontSize: '18px',
                        color: PHOSPHOR, letterSpacing: '-0.01em',
                      }}>
                        {nextProject.title}
                      </div>
                    </div>
                    <span style={{ color: PHOSPHOR, fontSize: '20px' }}>→</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
