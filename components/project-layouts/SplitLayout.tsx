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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function SplitLayout({ project, nextProject }: Props) {
  const containerRef = useRef(null)

  const imageSlots = project.images

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20 xl:px-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-12">
        <Link href="/projects"
          className="font-mono text-[9px] tracking-[0.2em] text-muted hover:text-accent uppercase transition-colors duration-300 flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
            <path d="M11 6H1M5 10L1 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All projects
        </Link>
        <div className="h-px w-5 bg-accent/20" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">{project.title}</span>
      </div>

      {/* Split grid: text left, images right */}
      <div ref={containerRef} className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-16 xl:gap-24">

        {/* LEFT: sticky-ish text column */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/30">
                {project.category}
              </span>
              <span className={cn('font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border', statusStyle[project.status] ?? '')}>
                {project.status}
              </span>
              <span className="font-mono text-[8px] tracking-widest text-dim ml-1">{project.year}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic font-light text-text leading-[1.0] mb-5"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-muted text-[14px] leading-[1.85]"
            >
              {project.description}
            </motion.p>

            {project.links && project.links.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-3 mt-6"
              >
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
              </motion.div>
            )}
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-10 mb-12">
            {[
              { label: 'Overview', text: project.overview },
              { label: 'Challenge', text: project.challenge },
              { label: 'Outcome', text: project.outcome },
            ].map((sec, i) => (
              <Reveal key={sec.label} delay={i * 0.07}>
                <div className="border-l border-accent/15 pl-5">
                  <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-3">{sec.label}</div>
                  <p className="font-sans text-muted text-[13px] md:text-[14px] leading-[1.9]">{sec.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tech stack */}
          <Reveal delay={0.1}>
            <div className="border-t border-white/[0.05] pt-8">
              <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-4">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md bg-elevated border border-white/[0.05] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT: image column */}
        <div className="flex flex-col gap-4 lg:pt-16">
          {imageSlots.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectImage
                src={src}
                alt={`${project.title} image ${i + 1}`}
                gradient={project.gradient}
                index={i}
                aspectClass={i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div className="border-t border-white/[0.05] pt-12 mt-20">
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
  )
}
