'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const dotX = useSpring(mx, { stiffness: 900, damping: 30 })
  const dotY = useSpring(my, { stiffness: 900, damping: 30 })
  const ringX = useSpring(mx, { stiffness: 220, damping: 28 })
  const ringY = useSpring(my, { stiffness: 220, damping: 28 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    },
    [mx, my, visible],
  )

  const onLeave = useCallback(() => setVisible(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const handleEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      setHovering(true)
      setLabel(el.dataset.cursor ?? '')
    }
    const handleLeaveEl = () => {
      setHovering(false)
      setLabel('')
    }

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor]',
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeaveEl)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeaveEl)
      })
    }
  }, [onMove, onLeave])

  return (
    <>
      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full bg-[#F0EDE6]"
          animate={{
            width: hovering ? 6 : 5,
            height: hovering ? 6 : 5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center"
          animate={{
            width: hovering ? 48 : 30,
            height: hovering ? 48 : 30,
            borderColor: hovering
              ? 'rgba(196,165,90,0.7)'
              : 'rgba(196,165,90,0.3)',
          }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          {label && (
            <span className="font-label text-[7px] tracking-[0.2em] text-accent uppercase">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
