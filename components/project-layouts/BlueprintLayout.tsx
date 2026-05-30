'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { type Project } from '@/lib/projects'

const NAVY = '#050e1f'
const BLUE = '#7eb8f5'
const BLUE_DIM = 'rgba(126,184,245,0.4)'
const BLUE_FAINT = 'rgba(126,184,245,0.07)'
const BLUE_GRID = 'rgba(126,184,245,0.06)'
const WHITE = 'rgba(220,232,255,0.9)'
const WHITE_DIM = 'rgba(178,200,240,0.5)'

interface Props {
  project: Project
  nextProject: Project
}

function AnnotationLine({ label, value, i = 0 }: { label: string; value: string; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0',
        padding: '10px 0',
        borderBottom: `1px solid ${BLUE_FAINT}`,
      }}
    >
      {/* Leader line */}
      <div style={{ width: '20px', height: '1px', background: BLUE_DIM, flexShrink: 0 }} />
      <div style={{
        fontFamily: 'var(--font-syne)', fontSize: '8px', letterSpacing: '0.22em',
        color: BLUE_DIM, textTransform: 'uppercase', minWidth: '110px', paddingLeft: '10px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-syne)', fontSize: '11px', letterSpacing: '0.08em',
        color: WHITE, paddingLeft: '16px',
        borderLeft: `1px solid ${BLUE_FAINT}`,
      }}>
        {value}
      </div>
    </motion.div>
  )
}

function TechSection({ label, idx, children, delay = 0 }: {
  label: string; idx: string; children: React.ReactNode; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section header — engineering numbering */}
      <div style={{
        display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-syne)', fontSize: '9px', fontWeight: 700,
          color: BLUE_DIM, letterSpacing: '0.3em',
        }}>
          {idx}
        </span>
        <div style={{ flex: 1, height: '1px', background: BLUE_GRID }} />
        <span style={{
          fontFamily: 'var(--font-syne)', fontSize: '9px', fontWeight: 700,
          color: BLUE, letterSpacing: '0.25em', textTransform: 'uppercase',
        }}>
          {label}
        </span>
        <div style={{ width: '40px', height: '1px', background: BLUE_DIM }} />
        {/* Arrow cap */}
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" aria-hidden="true">
          <path d="M0 0L6 4L0 8V0Z" fill={BLUE_DIM} />
        </svg>
      </div>
      {children}
    </motion.div>
  )
}

export default function BlueprintLayout({ project, nextProject }: Props) {
  const gridBg = `
    linear-gradient(${BLUE_GRID} 1px, transparent 1px),
    linear-gradient(90deg, ${BLUE_GRID} 1px, transparent 1px),
    linear-gradient(rgba(126,184,245,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(126,184,245,0.025) 1px, transparent 1px)
  `

  return (
    <div style={{
      background: NAVY,
      minHeight: '100vh',
      backgroundImage: gridBg,
      backgroundSize: '80px 80px, 80px 80px, 16px 16px, 16px 16px',
      backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
      position: 'relative',
    }}>
      {/* Corner crosses */}
      {[
        { top: '112px', left: '24px' },
        { top: '112px', right: '24px' },
      ].map((pos, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ position: 'absolute', ...pos as React.CSSProperties, opacity: 0.3 }}
          aria-hidden="true"
        >
          <line x1="6" y1="0" x2="6" y2="12" stroke={BLUE} strokeWidth="0.5" />
          <line x1="0" y1="6" x2="12" y2="6" stroke={BLUE} strokeWidth="0.5" />
        </svg>
      ))}

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '112px 32px 80px', position: 'relative' }}>

        {/* Drawing title bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: `1px solid ${BLUE_DIM}`,
            paddingBottom: '16px', marginBottom: '64px',
          }}
        >
          <Link
            href="/projects"
            style={{
              fontFamily: 'var(--font-syne)', fontSize: '9px', letterSpacing: '0.25em',
              color: BLUE_DIM, textDecoration: 'none', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
              <path d="M16 4H0M6 0L0 4L6 8" stroke={BLUE_DIM} strokeWidth="1" strokeLinecap="round" />
            </svg>
            ALL PROJECTS
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              fontFamily: 'var(--font-syne)', fontSize: '8px', letterSpacing: '0.3em',
              color: BLUE_DIM,
            }}>
              DWG NO. {project.index}
            </div>
            <div style={{
              fontFamily: 'var(--font-syne)', fontSize: '8px', letterSpacing: '0.3em',
              color: BLUE_DIM,
            }}>
              REV. {project.year}
            </div>
          </div>
        </motion.div>

        {/* Hero — title takes up full width, bold */}
        <div style={{ marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-syne)', fontSize: '9px',
              color: BLUE_DIM, letterSpacing: '0.4em', textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            {project.category} / {project.status}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-syne)', fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: WHITE, lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-syne)', fontSize: '13px',
              color: WHITE_DIM, lineHeight: '1.8', maxWidth: '560px',
              letterSpacing: '0.02em',
            }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Spec table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            border: `1px solid ${BLUE_DIM}`,
            padding: '0 24px',
            marginBottom: '72px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: '8px', letterSpacing: '0.4em',
            color: BLUE, textTransform: 'uppercase', padding: '12px 0 14px',
            borderBottom: `1px solid ${BLUE_FAINT}`,
          }}>
            TECHNICAL SPECIFICATIONS
          </div>
          <AnnotationLine label="STATUS" value={project.status} i={0} />
          <AnnotationLine label="CATEGORY" value={project.category} i={1} />
          <AnnotationLine label="YEAR" value={project.year} i={2} />
          {project.tags.map((tag, i) => (
            <AnnotationLine key={tag} label={`MODULE ${String(i + 1).padStart(2, '0')}`} value={tag} i={i + 3} />
          ))}
        </motion.div>

        {/* Content sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '80px' }}>
          <TechSection idx="1.0" label="Overview" delay={0}>
            <p style={{
              fontFamily: 'var(--font-syne)', fontSize: '13px',
              color: WHITE_DIM, lineHeight: '1.9', letterSpacing: '0.02em',
              maxWidth: '660px',
            }}>
              {project.overview}
            </p>
          </TechSection>

          <TechSection idx="2.0" label="Challenge" delay={0.06}>
            <p style={{
              fontFamily: 'var(--font-syne)', fontSize: '13px',
              color: WHITE_DIM, lineHeight: '1.9', letterSpacing: '0.02em',
              maxWidth: '660px',
            }}>
              {project.challenge}
            </p>
          </TechSection>

          <TechSection idx="3.0" label="Outcome" delay={0.12}>
            <div style={{
              borderLeft: `3px solid ${BLUE}`,
              paddingLeft: '24px',
              maxWidth: '660px',
            }}>
              <p style={{
                fontFamily: 'var(--font-syne)', fontSize: '14px',
                color: WHITE, lineHeight: '1.9', letterSpacing: '0.02em',
                fontWeight: 500,
              }}>
                {project.outcome}
              </p>
            </div>
          </TechSection>
        </div>

        {/* Next project */}
        <div style={{ borderTop: `1px solid ${BLUE_DIM}`, paddingTop: '40px' }}>
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: '8px',
            color: BLUE_DIM, letterSpacing: '0.4em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            NEXT DRAWING
          </div>
          <Link href={`/projects/${nextProject.id}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ borderColor: BLUE }}
              style={{
                border: `1px solid ${BLUE_DIM}`,
                padding: '24px 28px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'border-color 0.3s',
                cursor: 'pointer',
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-syne)', fontSize: '8px',
                  color: BLUE_DIM, letterSpacing: '0.3em', textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  {nextProject.category}
                </div>
                <div style={{
                  fontFamily: 'var(--font-syne)', fontWeight: 800,
                  fontSize: '1.8rem', color: WHITE,
                  textTransform: 'uppercase', letterSpacing: '-0.01em',
                }}>
                  {nextProject.title}
                </div>
              </div>
              <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true">
                <path d="M0 8H30M22 1L30 8L22 15" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
