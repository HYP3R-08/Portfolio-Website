'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { type Project } from '@/lib/projects'
import ProjectImage from './ProjectImage'

const statusStyle: Record<string, string> = {
  Live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Case Study': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

interface Props {
  project: Project
  nextProject: Project
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function CinematicLayout({ project, nextProject }: Props) {
  // interleave text sections with images
  const sections = [
    { label: 'Overview', text: project.overview, imageIdx: 0 },
    { label: 'Challenge', text: project.challenge, imageIdx: 1 },
    { label: 'Outcome', text: project.outcome, imageIdx: 2 },
  ]

  return (
    <div className="pt-28 pb-24">
      {/* Full-bleed hero image */}
      <div className="relative w-full aspect-[21/9] mb-0 overflow-hidden">
        <ProjectImage
          src={project.images[0]}
          alt={`${project.title} hero`}
          gradient={project.gradient}
          index={0}
          aspectClass="aspect-[21/9]"
          className="rounded-none border-0"
        />
        {/* Overlay gradient for title */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

        {/* Title overlaid on hero */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 xl:px-28 pb-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/30">
              {project.category}
            </span>
            <span className={cn('font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border', statusStyle[project.status] ?? '')}>
              {project.status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-light text-text leading-[1.0]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-28">
        {/* Breadcrumb + meta strip */}
        <div className="flex items-center justify-between py-8 border-b border-white/[0.05] mb-14">
          <Link
            href="/projects"
            className="font-mono text-[9px] tracking-[0.2em] text-muted hover:text-accent uppercase transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
              <path d="M11 6H1M5 10L1 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All projects
          </Link>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[8px] tracking-widest text-dim">{project.subtitle}</span>
            <span className="font-mono text-[8px] tracking-widest text-dim">{project.year}</span>
          </div>
        </div>

        {/* Lead description */}
        <FadeSection>
          <p className="font-display italic font-light text-text/80 leading-[1.6] mb-20 max-w-[680px]"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}>
            {project.description}
          </p>
        </FadeSection>

        {/* Sections interleaved with images */}
        {sections.map((sec, i) => {
          const imgSrc = project.images[sec.imageIdx + (i === 0 ? 1 : sec.imageIdx)]
          const showImage = i > 0 || project.images.length > 1

          return (
            <div key={sec.label}>
              {/* images[0] = hero; images[i+1] shown only if it exists */}
              {project.images[i + 1] && (
                <FadeSection delay={0.05}>
                  <div className="mb-14">
                    <ProjectImage
                      src={project.images[i + 1]}
                      alt={`${project.title} — ${sec.label}`}
                      gradient={project.gradient}
                      index={i + 1}
                      aspectClass="aspect-[16/7]"
                      className="w-full"
                    />
                  </div>
                </FadeSection>
              )}

              <FadeSection delay={0.1}>
                <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-16 mb-20">
                  <div className="pt-1">
                    <span className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase">{sec.label}</span>
                    <div className="h-px bg-accent/15 mt-3" />
                  </div>
                  <p className="font-sans text-muted text-[14px] md:text-[15px] leading-[1.9]">
                    {sec.text}
                  </p>
                </div>
              </FadeSection>
            </div>
          )
        })}

        {/* Tech + links row */}
        <FadeSection>
          <div className="flex flex-wrap items-start gap-x-16 gap-y-8 py-10 border-t border-white/[0.05] mb-16">
            <div>
              <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-4">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md bg-elevated border border-white/[0.05] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {project.links && project.links.length > 0 && (
              <div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-4">Links</div>
                <div className="flex flex-wrap gap-3">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-2 font-label text-[10px] tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-accent/25 text-accent hover:bg-accent hover:text-bg transition-all duration-300"
                    >
                      {l.label}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeSection>

        {/* Next project */}
        <div className="border-t border-white/[0.05] pt-12">
          <div className="font-mono text-[8px] tracking-[0.25em] text-dim uppercase mb-6">Next project</div>
          <Link href={`/projects/${nextProject.id}`}
            className="group flex items-center justify-between gap-6 p-6 rounded-2xl border border-white/[0.05] bg-surface hover:border-accent/15 transition-colors duration-400"
          >
            <div>
              <div className="font-label text-[9px] tracking-widest uppercase text-muted mb-1">{nextProject.category}</div>
              <div className="font-display italic font-light text-text text-[1.6rem] leading-tight group-hover:text-accent transition-colors duration-300">
                {nextProject.title}
              </div>
              <div className="font-sans text-[12px] text-muted mt-1">{nextProject.subtitle}</div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
              <svg className="w-4 h-4 text-accent group-hover:text-bg transition-colors duration-300" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
