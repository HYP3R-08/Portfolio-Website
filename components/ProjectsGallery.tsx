'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { projects, type Project, type ProjectCategory } from '@/lib/projects'
import { RevealLine } from '@/components/Animate'

const MotionLink = motion(Link)

const FILTERS: { label: string; value: ProjectCategory | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Web', value: 'Web' },
  { label: 'Embedded', value: 'Embedded' },
  { label: 'Robotics', value: 'Robotics' },
  { label: 'Security', value: 'Security' },
]

const statusStyle: Record<string, string> = {
  Live: 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40',
  'In Progress': 'bg-amber-950/70 text-amber-400 border-amber-500/40',
  'Case Study': 'bg-blue-950/70 text-blue-400 border-blue-500/40',
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <MotionLink
      href={`/projects/${project.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-surface cursor-pointer hover:border-accent/15 transition-colors duration-500 block"
      data-cursor="open"
      aria-label={`${project.title}: ${project.subtitle}`}
    >
      {/* Preview */}
      <div className="relative overflow-hidden aspect-video bg-elevated">
        {project.coverImage ? (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </motion.div>
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60', project.gradient)} />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: hovered
                  ? `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 65%)`
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient)} />
            <div className="absolute inset-0 grid-lines opacity-25" aria-hidden="true" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: hovered
                  ? `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 65%)`
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center gap-2"
                aria-hidden="true"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="font-display text-xl italic text-white/25">
                    {project.title[0]}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[32, 48, 28].map((w, j) => (
                    <div key={j} className="h-1 rounded-full bg-white/8" style={{ width: w }} />
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}

        <div className="absolute top-4 left-4">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/15">{project.index}</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/20 text-white/80 bg-black/50 backdrop-blur-sm">
            {project.category}
          </span>
          <span className={cn('font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm', statusStyle[project.status] ?? '')}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h3 className="font-label text-[15px] font-semibold text-text group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-sans text-[12px] text-muted mt-0.5">{project.subtitle}</p>
          </div>
          <span className="font-mono text-[9px] text-dim tracking-widest mt-1 flex-shrink-0">{project.year}</span>
        </div>

        <p className="font-sans text-[12px] text-muted/75 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[8px] tracking-widest uppercase px-2 py-1 rounded-md bg-elevated border border-[rgba(255,255,255,0.04)] text-dim"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <motion.div
            animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-5 right-5 flex items-center gap-1.5 text-accent"
            aria-hidden="true"
          >
            <span className="font-label text-[9px] tracking-[0.18em] uppercase">View</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>
    </MotionLink>
  )
}

export default function ProjectsGallery() {
  const [active, setActive] = useState<ProjectCategory | 'All'>('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  const availableFilters = FILTERS.filter(
    (f) => f.value === 'All' || projects.some((p) => p.category === f.value),
  )

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-16" aria-hidden="true">
        <a
          href="/"
          className="font-mono text-[9px] tracking-[0.2em] text-muted hover:text-accent uppercase transition-colors duration-300 flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
            <path d="M11 6H1M5 10L1 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </a>
        <div className="h-px w-5 bg-accent/20" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">Projects</span>
      </div>

      <div className="mb-14">
        <h1
          className="font-display italic font-light text-text leading-[1.0] mb-10"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
        >
          <RevealLine delay={0}>All</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-accent">work.</span>
          </RevealLine>
        </h1>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {availableFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={cn(
                'font-mono text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all duration-250',
                active === f.value
                  ? 'bg-accent text-bg border-accent'
                  : 'bg-elevated border-[rgba(255,255,255,0.07)] text-muted hover:border-accent/30 hover:text-text',
              )}
            >
              {f.label}
              <span className="ml-1.5 opacity-50">
                {f.value === 'All' ? projects.length : projects.filter((p) => p.category === f.value).length}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
      >
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} i={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-muted text-[13px] text-center py-20"
        >
          No projects in this category yet.
        </motion.p>
      )}
    </>
  )
}
