'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RevealLine, RevealParagraph } from '@/components/Animate'

interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  year: string
  status: 'Live' | 'In Progress' | 'Case Study'
  gradient: string
  accentColor: string
}

const projects: Project[] = [
  {
    id: 'p1',
    index: '01',
    title: 'Project Alpha',
    subtitle: 'Full-Stack SaaS Platform',
    description:
      'A comprehensive B2B SaaS platform with real-time collaboration, advanced analytics, and an intuitive dashboard. Built for teams who value efficiency and beautiful interfaces.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis'],
    year: '2024',
    status: 'Live',
    gradient: 'from-amber-950/40 via-orange-950/20 to-transparent',
    accentColor: 'rgba(251,146,60,0.15)',
  },
  {
    id: 'p2',
    index: '02',
    title: 'Project Beta',
    subtitle: 'Design System & Component Library',
    description:
      'A cohesive design system with 60+ components, dark/light theme support, full accessibility compliance, and comprehensive documentation — built for long-term scale.',
    tags: ['React', 'Tailwind CSS', 'Storybook', 'Figma', 'Radix'],
    year: '2024',
    status: 'Live',
    gradient: 'from-blue-950/40 via-indigo-950/20 to-transparent',
    accentColor: 'rgba(99,102,241,0.15)',
  },
  {
    id: 'p3',
    index: '03',
    title: 'Project Gamma',
    subtitle: 'AI-Powered Developer Tool',
    description:
      'An intelligent code review and optimization tool that leverages machine learning to improve code quality, flag patterns, and boost developer productivity.',
    tags: ['Python', 'FastAPI', 'React', 'OpenAI', 'Docker'],
    year: '2023',
    status: 'In Progress',
    gradient: 'from-emerald-950/40 via-teal-950/20 to-transparent',
    accentColor: 'rgba(16,185,129,0.15)',
  },
  {
    id: 'p4',
    index: '04',
    title: 'Project Delta',
    subtitle: 'E-Commerce Experience',
    description:
      'High-conversion storefront with 3D product visualization, smooth animated checkout flows, and performance-optimized architecture achieving 99 Lighthouse score.',
    tags: ['Next.js', 'Three.js', 'Shopify', 'GSAP', 'Framer Motion'],
    year: '2023',
    status: 'Live',
    gradient: 'from-rose-950/40 via-pink-950/20 to-transparent',
    accentColor: 'rgba(244,63,94,0.15)',
  },
]

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const statusStyle: Record<string, string> = {
    Live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Case Study': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.85,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)] bg-surface cursor-pointer hover:border-accent/15 transition-colors duration-500"
      data-cursor="open"
      tabIndex={0}
      role="article"
      aria-label={`${project.title}: ${project.subtitle}`}
    >
      {/* Preview */}
      <div className="relative overflow-hidden aspect-video bg-elevated">
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
                {project.title[project.title.length - 1]}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[32, 48, 28].map((w, j) => (
                <div key={j} className="h-1 rounded-full bg-white/8" style={{ width: w }} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/15">{project.index}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={cn('font-mono text-[8px] tracking-widest uppercase px-2 py-1 rounded-full border', statusStyle[project.status] ?? '')}>
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

        <p className="font-sans text-[12px] text-muted/75 leading-relaxed mb-4 line-clamp-2">
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
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section
      id="projects"
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-[rgba(255,255,255,0.05)]"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-center gap-3.5 mb-12" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">02</span>
        <div className="h-px w-7 bg-accent/30" />
        <span className="font-label text-[9px] tracking-[0.22em] text-muted uppercase">Projects</span>
      </div>

      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <h2
          id="projects-heading"
          className="font-display italic font-light text-text leading-[1.0]"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          <RevealLine delay={0}>Selected</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-accent">work.</span>
          </RevealLine>
        </h2>

        <RevealParagraph
          delay={0.15}
          className="font-sans text-muted text-[13px] md:text-[14px] max-w-[260px] leading-relaxed md:text-right"
        >
          A curated selection demonstrating range across product, design, and engineering.
        </RevealParagraph>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} i={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -30px 0px' }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="#"
          className="group flex items-center gap-3 font-label text-[10px] tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors duration-300"
        >
          View all projects
          <span className="block h-px bg-current w-6 group-hover:w-10 transition-all duration-300" />
        </a>
      </motion.div>
    </section>
  )
}
