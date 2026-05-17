'use client'

import { useRef } from 'react'
import { motion, useInView, type UseInViewOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

const VIEWPORT_OPTS: UseInViewOptions = {
  once: true,
  margin: '0px 0px -80px 0px' as UseInViewOptions['margin'],
}

/* ─── FadeUp ──────────────────────────────────────────────────────────────
   Generic block: opacity + y + blur. Works for cards, stats, any block.  */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, VIEWPORT_OPTS)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 28, filter: 'blur(6px)' }
      }
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── RevealHeading ────────────────────────────────────────────────────────
   Word-by-word mask reveal for section h2s (not hero).
   Wrap each word in overflow:hidden → slides up from below.              */
export function RevealHeading({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { ...VIEWPORT_OPTS, margin: '0px 0px -60px 0px' })

  const raw = typeof children === 'string' ? children : null

  if (!raw) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.span>
    )
  }

  const words = raw.split(' ')

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%', opacity: 0 }}
            animate={
              inView
                ? { y: '0%', opacity: 1 }
                : { y: '108%', opacity: 0 }
            }
            transition={{
              duration: 0.75,
              delay: delay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ─── RevealLine ───────────────────────────────────────────────────────────
   Single-line mask reveal — overflow hidden wrapper, slides child up.
   Ideal for short labels, subtitles, captions.                           */
export function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, VIEWPORT_OPTS)

  return (
    <span
      ref={ref}
      style={{ display: 'block', overflow: 'hidden' }}
      className={className}
    >
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '105%', opacity: 0 }}
        animate={
          inView
            ? { y: '0%', opacity: 1 }
            : { y: '105%', opacity: 0 }
        }
        transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ─── RevealParagraph ──────────────────────────────────────────────────────
   Paragraph text: smooth fade-in + y-translate + blur dissolve.
   Designed to feel like the text "materialises" into place.             */
export function RevealParagraph({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { ...VIEWPORT_OPTS, margin: '0px 0px -50px 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 18, filter: 'blur(5px)' }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.p>
  )
}

/* ─── StaggerList ──────────────────────────────────────────────────────────
   Wraps children and staggers each child's fade-up on scroll.           */
export function StaggerList({
  children,
  delay = 0,
  stagger = 0.08,
  className,
}: {
  children: React.ReactNode[]
  delay?: number
  stagger?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, VIEWPORT_OPTS)

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 20, filter: 'blur(4px)' }
          }
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
