'use client'

import { useEffect } from 'react'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  useEffect(() => {
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
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
