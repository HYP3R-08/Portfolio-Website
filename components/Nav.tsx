'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', hash: 'about' },
  { label: 'Work', hash: 'projects' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Journey', hash: 'experience' },
  { label: 'Contact', hash: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const pathname = usePathname()
  const isHome = pathname === '/'

  const links = NAV_LINKS.map((l) => ({
    label: l.label,
    href: isHome ? `#${l.hash}` : `/#${l.hash}`,
  }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5"
      >
        <nav
          className={cn(
            'relative flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-500',
            scrolled
              ? 'bg-[rgba(7,7,12,0.82)] backdrop-blur-2xl border-[rgba(255,255,255,0.07)] shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-transparent border-transparent',
          )}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-label text-[11px] tracking-[0.18em] uppercase text-accent hover:text-accent-light transition-colors duration-300 px-3 py-1.5 mr-2"
          >
            PCF
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setActive(link.href)}
                onMouseLeave={() => setActive('')}
                className="group relative px-3.5 py-1.5 font-label text-[10px] tracking-[0.1em] uppercase text-muted hover:text-text transition-colors duration-300"
              >
                {link.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/CV_Pennino_Cristian_Francesco.pdf"
            download
            className="hidden md:inline-flex items-center ml-3 px-4 py-1.5 text-[10px] font-label tracking-[0.15em] uppercase bg-accent text-bg rounded-full hover:bg-accent-light transition-colors duration-300"
          >
            Résumé
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="md:hidden ml-2 p-2 flex flex-col gap-1.5 group"
          >
            <span
              className={cn(
                'block w-4 h-px bg-muted group-hover:bg-text transition-all duration-300',
                open && 'rotate-45 translate-y-[7px]',
              )}
            />
            <span
              className={cn(
                'block w-4 h-px bg-muted group-hover:bg-text transition-all duration-300',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block w-4 h-px bg-muted group-hover:bg-text transition-all duration-300',
                open && '-rotate-45 -translate-y-[7px]',
              )}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-5 right-5 z-40 bg-surface border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 md:hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 font-label text-[11px] tracking-[0.15em] uppercase text-muted hover:text-text border-b border-[rgba(255,255,255,0.05)] last:border-0 transition-colors"
              >
                {link.label}
                <span className="font-mono text-[9px] text-dim">0{i + 1}</span>
              </motion.a>
            ))}
            <a
              href="/CV_Pennino_Cristian_Francesco.pdf"
              download
              onClick={() => setOpen(false)}
              className="block mt-4 px-4 py-2.5 text-center text-[10px] font-label tracking-[0.15em] uppercase bg-accent text-bg rounded-full hover:bg-accent-light transition-colors"
            >
              Résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
