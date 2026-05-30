'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { type Project } from '@/lib/projects'

const CREAM = '#f4ede0'
const INK = '#1a1007'
const INK_DIM = 'rgba(26,16,7,0.45)'
const INK_FAINT = 'rgba(26,16,7,0.1)'
const RED = '#c4341b'
const RED_DIM = 'rgba(196,52,27,0.15)'

interface Props {
  project: Project
  nextProject: Project
}

function Rule({ className }: { className?: string }) {
  return (
    <div style={{ height: '1px', background: INK_FAINT, width: '100%' }}
      className={className}
      aria-hidden="true"
    />
  )
}

function EditorialSection({
  number, label, children, delay = 0,
}: {
  number: string; label: string; children: React.ReactNode; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: '56px' }}
    >
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '16px',
        marginBottom: '20px',
      }}>
        <span style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '11px', letterSpacing: '0.2em',
          color: RED, fontStyle: 'italic',
        }}>
          {number}
        </span>
        <span style={{
          fontFamily: 'var(--font-syne)', fontSize: '9px',
          letterSpacing: '0.3em', color: INK_DIM, textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      <Rule />
      <div style={{ marginTop: '24px' }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function EditorialLayout({ project, nextProject }: Props) {
  const [firstSentence, ...restSentences] = project.overview.split('. ')
  const overviewRest = restSentences.join('. ')

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK }}>
      {/* Dark masthead behind nav */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '80px', background: INK, zIndex: 40,
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 32px 80px', position: 'relative' }}>

        {/* Masthead area (dark) */}
        <div style={{
          background: INK, marginLeft: '-32px', marginRight: '-32px',
          padding: '112px 32px 40px',
          marginBottom: '0',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '40px',
          }}>
            <Link
              href="/projects"
              style={{
                fontFamily: 'var(--font-syne)', fontSize: '9px',
                letterSpacing: '0.25em', color: 'rgba(244,237,224,0.4)',
                textDecoration: 'none', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'color 0.2s',
              }}
            >
              ← ALL PROJECTS
            </Link>
            <div style={{
              fontFamily: 'var(--font-syne)', fontSize: '8px',
              letterSpacing: '0.3em', color: 'rgba(244,237,224,0.25)',
              textTransform: 'uppercase',
            }}>
              CASE STUDY № {project.index}
            </div>
          </div>

          {/* Running head */}
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: '8px',
            letterSpacing: '0.4em', textTransform: 'uppercase',
            color: RED, marginBottom: '16px',
          }}>
            {project.category} — {project.year}
          </div>

          {/* Giant title */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: CREAM, lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            {project.title}
          </motion.h1>

          {/* Subtitle strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(244,237,224,0.12)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-syne)', fontSize: '9px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(244,237,224,0.35)',
            }}>
              {project.subtitle}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(244,237,224,0.08)' }} />
            <span style={{
              fontFamily: 'var(--font-syne)', fontSize: '8px',
              color: RED, letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              {project.status}
            </span>
          </motion.div>
        </div>

        {/* Cream body starts here */}
        <div style={{ paddingTop: '56px' }}>

          {/* Lead paragraph with drop cap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ marginBottom: '48px' }}
          >
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '22px', fontStyle: 'italic',
              color: INK, lineHeight: '1.65',
              letterSpacing: '0.01em',
              marginBottom: '20px',
            }}>
              <span style={{
                float: 'left',
                fontFamily: 'var(--font-cormorant)',
                fontSize: '6.5rem', fontStyle: 'italic', fontWeight: 300,
                lineHeight: '0.72', marginRight: '8px', marginTop: '8px',
                color: RED,
              }}>
                {firstSentence[0]}
              </span>
              {firstSentence.slice(1)}.
            </p>
            <p style={{
              fontFamily: 'var(--font-jakarta)', fontSize: '15px',
              color: INK_DIM, lineHeight: '1.9',
              clear: 'both',
            }}>
              {overviewRest}
            </p>
          </motion.div>

          <Rule />

          {/* 2-column layout for challenge/outcome */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            padding: '48px 0',
          }}>
            <EditorialSection number="I." label="Challenge" delay={0.1}>
              <p style={{
                fontFamily: 'var(--font-jakarta)', fontSize: '14px',
                color: INK_DIM, lineHeight: '1.9',
              }}>
                {project.challenge}
              </p>
            </EditorialSection>

            <EditorialSection number="II." label="Outcome" delay={0.18}>
              <p style={{
                fontFamily: 'var(--font-jakarta)', fontSize: '14px',
                color: INK, lineHeight: '1.9',
                fontWeight: 500,
              }}>
                {project.outcome}
              </p>
            </EditorialSection>
          </div>

          <Rule />

          {/* Pull quote + tech stack */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '48px',
            padding: '48px 0',
            alignItems: 'start',
          }}>
            {/* Pull quote */}
            <blockquote style={{
              margin: 0,
              borderLeft: `3px solid ${RED}`,
              paddingLeft: '28px',
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontStyle: 'italic', fontWeight: 300,
                color: INK, lineHeight: '1.5',
                letterSpacing: '0.01em',
              }}>
                &ldquo;{project.description}&rdquo;
              </p>
            </blockquote>

            {/* Tech stack */}
            <div>
              <div style={{
                fontFamily: 'var(--font-syne)', fontSize: '8px',
                letterSpacing: '0.35em', textTransform: 'uppercase',
                color: INK_DIM, marginBottom: '16px',
              }}>
                Technologies
              </div>
              <Rule />
              {project.tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '15px', fontStyle: 'italic',
                    color: INK, lineHeight: '2.2',
                    borderBottom: `1px solid ${INK_FAINT}`,
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}
                >
                  <span style={{ color: RED, fontSize: '10px' }}>◆</span>
                  {tag}
                </motion.div>
              ))}

              {project.links && project.links.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontFamily: 'var(--font-syne)', fontSize: '9px',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: RED, textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Rule />

          {/* Next project — editorial style */}
          <div style={{ paddingTop: '48px' }}>
            <div style={{
              fontFamily: 'var(--font-syne)', fontSize: '8px',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              color: INK_DIM, marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              Continue reading
              <div style={{ flex: 1, height: '1px', background: INK_FAINT }} />
            </div>

            <Link href={`/projects/${nextProject.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ backgroundColor: RED_DIM }}
                style={{
                  padding: '28px 32px',
                  border: `1px solid ${INK_FAINT}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-syne)', fontSize: '8px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: RED, marginBottom: '8px',
                  }}>
                    {nextProject.category}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '2.2rem', fontStyle: 'italic', fontWeight: 300,
                    color: INK, lineHeight: 1.1,
                  }}>
                    {nextProject.title}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '2.5rem', fontStyle: 'italic',
                  color: RED, lineHeight: 1,
                }}>
                  →
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
