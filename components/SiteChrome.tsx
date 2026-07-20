'use client'

import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Footer from '@/components/sections/Footer'

/* Shared page chrome mounted once by the root layout: custom cursor, scroll
   progress bar, navigation and footer, plus Lenis smooth scrolling. Keeping it
   here avoids repeating the same shell in every route and lets it persist across
   client navigations. MotionConfig applies the user's reduced-motion preference
   to every Framer Motion animation site-wide. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    let rafId: number
    let cleanup: (() => void) | null = null

    const run = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      cleanup = () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }

    run()

    return () => {
      cleanup?.()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-bg focus:font-label focus:text-[11px] focus:tracking-[0.16em] focus:uppercase"
      >
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <Nav />
      {children}
      <Footer />
    </MotionConfig>
  )
}
