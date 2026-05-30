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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function GalleryLayout({ project, nextProject }: Props) {
  // Always show at least 4 slots for the mosaic
  const slots = Array.from({ length: Math.max(4, project.images.length) }, (_, i) => project.images[i])

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20 xl:px-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-10">
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

      {/* Header: index + meta */}
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
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
            <span className="font-mono text-[8px] tracking-widest text-dim">{project.year}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-light text-text leading-[1.0]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Large index number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display italic font-light text-white/[0.04] leading-none select-none hidden md:block"
          style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
          aria-hidden="true"
        >
          {project.index}
        </motion.div>
      </div>

      {/* Mosaic gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        {slots.length <= 2 ? (
          /* Single row */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {slots.map((src, i) => (
              <ProjectImage key={i} src={src} alt={`${project.title} ${i + 1}`}
                gradient={project.gradient} index={i} aspectClass="aspect-video" />
            ))}
          </div>
        ) : slots.length === 3 ? (
          /* 2 + 1 layout */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ProjectImage src={slots[0]} alt={`${project.title} 1`}
              gradient={project.gradient} index={0} aspectClass="aspect-square md:aspect-[4/3]" />
            <ProjectImage src={slots[1]} alt={`${project.title} 2`}
              gradient={project.gradient} index={1} aspectClass="aspect-square md:aspect-[4/3]" />
            <ProjectImage src={slots[2]} alt={`${project.title} 3`}
              gradient={project.gradient} index={2} aspectClass="aspect-video col-span-2 md:col-span-1 md:aspect-[4/3]" />
          </div>
        ) : (
          /* Mosaic: big left + 3 right stacked */
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3">
            <ProjectImage src={slots[0]} alt={`${project.title} 1`}
              gradient={project.gradient} index={0} aspectClass="aspect-[4/3] md:aspect-auto" className="md:h-full" />
            <div className="grid grid-rows-3 gap-3">
              {slots.slice(1, 4).map((src, i) => (
                <ProjectImage key={i + 1} src={src} alt={`${project.title} ${i + 2}`}
                  gradient={project.gradient} index={i + 1} aspectClass="aspect-video" />
              ))}
            </div>
          </div>
        )}

        {/* Extra images beyond 4 */}
        {slots.length > 4 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {slots.slice(4).map((src, i) => (
              <ProjectImage key={i + 4} src={src} alt={`${project.title} ${i + 5}`}
                gradient={project.gradient} index={i + 4} aspectClass="aspect-video" />
            ))}
          </div>
        )}
      </motion.div>

      {/* Content: 2 col text + sidebar */}
      <div className="grid md:grid-cols-[1fr_280px] gap-12 lg:gap-20 mb-16">
        <div className="flex flex-col gap-10">
          <Reveal>
            <p className="font-sans text-muted text-[14px] md:text-[15px] leading-[1.9]">{project.overview}</p>
          </Reveal>

          <div className="border-t border-white/[0.05] pt-10">
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={0.05}>
                <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-3">Challenge</div>
                <p className="font-sans text-muted text-[13px] leading-[1.9]">{project.challenge}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-3">Outcome</div>
                <p className="font-sans text-muted text-[13px] leading-[1.9]">{project.outcome}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-4">Stack</div>
              <div className="flex flex-col gap-2">
                {project.tags.map((tag, i) => (
                  <motion.div key={tag}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">{tag}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-accent uppercase mb-4">Links</div>
                <div className="flex flex-col gap-2">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-2 font-label text-[10px] tracking-[0.18em] uppercase text-accent hover:text-accent-light transition-colors duration-300"
                    >
                      {l.label}
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 12 12">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

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
  )
}
