'use client'

import { useEffect } from 'react'
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
}

// ── Graph geometry ──────────────────────────────────────────────────────────
const CX = 220
const CY = 258

interface NodeDef {
  id: string; x: number; y: number; r: number
  color: string; label: string; sub: string; delay: number
}

const NODES: NodeDef[] = [
  { id: 'core',     x: CX,       y: CY,       r: 28, color: '#c4a55a', label: '◎',  sub: 'CORE',  delay: 0    },
  { id: 'cyber',    x: CX,       y: CY - 128, r: 22, color: '#60a5fa', label: 'CY', sub: 'CYBER', delay: 0.1  },
  { id: 'embedded', x: CX + 111, y: CY - 64,  r: 22, color: '#34d399', label: 'EM', sub: 'EMBED', delay: 0.2  },
  { id: 'robotics', x: CX + 111, y: CY + 64,  r: 22, color: '#fb923c', label: 'RB', sub: 'ROBOT', delay: 0.3  },
  { id: 'web',      x: CX,       y: CY + 128, r: 22, color: '#a78bfa', label: 'WB', sub: 'WEB',   delay: 0.4  },
  { id: 'cloud',    x: CX - 111, y: CY + 64,  r: 22, color: '#67e8f9', label: 'CL', sub: 'CLOUD', delay: 0.5  },
  { id: 'ctf',      x: CX - 111, y: CY - 64,  r: 22, color: '#f472b6', label: 'CT', sub: 'CTF',   delay: 0.6  },
]

const EDGES: [string, string][] = [
  ['core','cyber'], ['core','embedded'], ['core','robotics'],
  ['core','web'],   ['core','cloud'],    ['core','ctf'],
  ['cyber','embedded'], ['embedded','robotics'],
  ['robotics','web'], ['web','cloud'], ['cloud','ctf'], ['ctf','cyber'],
]

interface PacketDef { from: string; to: string; delay: number; dur: number; color: string }
const PACKETS: PacketDef[] = [
  { from:'core', to:'cyber',    delay:0.0, dur:2.0, color:'#60a5fa' },
  { from:'core', to:'embedded', delay:0.8, dur:2.1, color:'#34d399' },
  { from:'core', to:'robotics', delay:1.5, dur:2.2, color:'#fb923c' },
  { from:'core', to:'web',      delay:0.4, dur:2.0, color:'#a78bfa' },
  { from:'core', to:'cloud',    delay:1.2, dur:2.1, color:'#67e8f9' },
  { from:'core', to:'ctf',      delay:1.9, dur:1.9, color:'#f472b6' },
  { from:'cyber',    to:'embedded', delay:0.6, dur:2.8, color:'#60a5fa' },
  { from:'robotics', to:'web',      delay:1.1, dur:2.6, color:'#fb923c' },
  { from:'cloud',    to:'ctf',      delay:1.4, dur:2.7, color:'#67e8f9' },
]

function node(id: string): NodeDef { return NODES.find(n => n.id === id)! }
function alpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

// ── Domain color dots for status card ──────────────────────────────────────
const DOMAIN_DOTS = [
  { color:'#60a5fa', label:'CY' }, { color:'#34d399', label:'EM' },
  { color:'#fb923c', label:'RB' }, { color:'#a78bfa', label:'WB' },
  { color:'#67e8f9', label:'CL' }, { color:'#f472b6', label:'CT' },
]

// ── Floating card ───────────────────────────────────────────────────────────
function FloatCard({ children, style, floatAmp, floatDur, fadeDelay, glassColor = 'rgba(255,255,255,0.025)', borderColor = 'rgba(255,255,255,0.07)' }: {
  children: React.ReactNode
  style: React.CSSProperties
  floatAmp: number
  floatDur: number
  fadeDelay: number
  glassColor?: string
  borderColor?: string
}) {
  return (
    <motion.div className="absolute font-mono" style={style}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: fadeDelay }}
    >
      <motion.div
        animate={{ y: [0, floatAmp, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          background: glassColor,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${borderColor}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          borderRadius: '16px',
        }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function HeroVisual({ scrollYProgress }: Props) {
  // Mouse-reactive tilt
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  useEffect(() => {
    const h = (e: MouseEvent) => { mx.set(e.clientX / window.innerWidth); my.set(e.clientY / window.innerHeight) }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mx, my])
  const tiltY = useSpring(useTransform(mx, [0,1], [-5, 5]), { stiffness: 44, damping: 22 })
  const tiltX = useSpring(useTransform(my, [0,1], [ 3,-3]), { stiffness: 44, damping: 22 })

  // Scroll
  const sy     = useTransform(scrollYProgress, [0,1],    [0, -36])
  const sOpac  = useTransform(scrollYProgress, [0,0.48], [1, 0])

  return (
    <motion.div style={{ y: sy, opacity: sOpac }}
      className="relative w-[440px] h-[520px] pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ rotateY: tiltY, rotateX: tiltX, transformPerspective: '1100px' }}
        className="relative w-full h-full"
      >
        {/* ── DOT GRID ── */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* ── SVG NETWORK ── */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 520" fill="none">
          <defs>
            <filter id="hv-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="hv-sm-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="hv-amb" cx="50%" cy="50%" r="48%">
              <stop offset="0%"   stopColor="rgba(196,165,90,0.13)"/>
              <stop offset="55%"  stopColor="rgba(96,165,250,0.04)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>

          {/* Ambient halo */}
          <circle cx={CX} cy={CY} r="210" fill="url(#hv-amb)"/>

          {/* Edges */}
          {EDGES.map(([a, b], i) => {
            const na = node(a), nb = node(b)
            const isSpoke = a === 'core' || b === 'core'
            return (
              <line key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={isSpoke ? 'rgba(196,165,90,0.13)' : 'rgba(255,255,255,0.055)'}
                strokeWidth={isSpoke ? '0.9' : '0.6'}
                strokeDasharray={isSpoke ? undefined : '3 6'}
              />
            )
          })}

          {/* Rotating orbits around core */}
          {[
            { r:46, dash:'5 9',  dur:22, dir:1,  color:'rgba(196,165,90,0.11)' },
            { r:62, dash:'3 13', dur:32, dir:-1, color:'rgba(96,165,250,0.07)' },
          ].map((o,i) => (
            <motion.circle key={i} cx={CX} cy={CY} r={o.r}
              stroke={o.color} strokeWidth="0.8" strokeDasharray={o.dash} fill="none"
              animate={{ rotate: o.dir * 360 }}
              transition={{ duration: o.dur, repeat: Infinity, ease:'linear' }}
              style={{ transformOrigin:`${CX}px ${CY}px` }}
            />
          ))}

          {/* Data packets */}
          {PACKETS.map((p, i) => {
            const fn = node(p.from), tn = node(p.to)
            return (
              <motion.circle key={i} cx={0} cy={0} r={2.4}
                fill={p.color}
                filter="url(#hv-glow)"
                animate={{
                  x: [fn.x, tn.x],
                  y: [fn.y, tn.y],
                  opacity: [0.9, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: 'linear',
                }}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((n) => (
            <g key={n.id}>
              {/* Pulse ring */}
              <motion.circle cx={n.x} cy={n.y} r={n.r + 12}
                stroke={alpha(n.color, 0.18)} strokeWidth="1" fill="none"
                animate={{ scale:[1,1.2,1], opacity:[0.18,0.42,0.18] }}
                transition={{ duration:2.5 + n.delay*2, delay:n.delay, repeat:Infinity, ease:'easeInOut' }}
                style={{ transformOrigin:`${n.x}px ${n.y}px` }}
              />
              {/* Glow halo */}
              <circle cx={n.x} cy={n.y} r={n.r}
                fill={alpha(n.color, 0.1)} filter="url(#hv-glow)"/>
              {/* Body */}
              <circle cx={n.x} cy={n.y} r={n.r}
                fill="rgba(5,5,5,0.93)"
                stroke={alpha(n.color, 0.55)} strokeWidth="1.2"
                filter="url(#hv-sm-glow)"/>
              {/* Main label */}
              <text x={n.x} y={n.id==='core' ? n.y+1 : n.y-2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={n.id==='core' ? '12' : '8.5'}
                fontFamily="monospace" letterSpacing="0.1em"
                fill={alpha(n.color, n.id==='core' ? 0.92 : 0.78)}
              >{n.label}</text>
              {/* Sub label */}
              {n.id !== 'core' && (
                <text x={n.x} y={n.y+11}
                  textAnchor="middle" fontSize="5.5"
                  fontFamily="monospace" letterSpacing="0.14em"
                  fill="rgba(255,255,255,0.2)"
                >{n.sub}</text>
              )}
            </g>
          ))}
        </svg>

        {/* ── CARDS ── */}

        {/* Card 1: Node network status */}
        <FloatCard
          style={{ top:'12px', left:'-4px', minWidth:'188px' }}
          floatAmp={-7} floatDur={4.8} fadeDelay={2.2}
          glassColor="rgba(196,165,90,0.03)" borderColor="rgba(196,165,90,0.12)"
        >
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 mb-2.5">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-amber-400"
                animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:1.8, repeat:Infinity }}
                style={{ boxShadow:'0 0 6px rgba(196,165,90,0.9)' }}
              />
              <span className="text-[8px] tracking-[0.22em] text-amber-400/55 uppercase">Node Network</span>
            </div>
            <div className="text-[10.5px] text-white/60 mb-2.5">7 domains · 12 links</div>
            <div className="flex gap-1.5 flex-wrap">
              {DOMAIN_DOTS.map(d => (
                <div key={d.label} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full" style={{ background: d.color, boxShadow:`0 0 4px ${d.color}` }}/>
                  <span className="text-[6.5px] font-mono tracking-widest" style={{ color:`${d.color}88` }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FloatCard>

        {/* Card 2: Latest achievement */}
        <FloatCard
          style={{ bottom:'28px', right:'-4px', minWidth:'172px' }}
          floatAmp={6} floatDur={5.4} fadeDelay={2.6}
          glassColor="rgba(251,146,60,0.03)" borderColor="rgba(251,146,60,0.12)"
        >
          <div className="px-4 py-3">
            <div className="text-[8px] tracking-[0.2em] text-orange-400/50 uppercase mb-1.5">Latest Win</div>
            <div className="text-[11px] text-white/70 mb-1">RoboCup Maze · 1st</div>
            <div className="text-[8px] text-white/35 mb-1.5">National · Italy</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[7px] text-orange-400/60 tracking-widest">→ WORLD 2026</span>
              <span className="text-[7px] text-white/20 tracking-widest">INCHEON KR</span>
            </div>
          </div>
        </FloatCard>

        {/* Mini badge: live status */}
        <motion.div className="absolute font-mono" style={{ top:'22px', right:'8px' }}
          initial={{ opacity:0 }} animate={{ opacity:0.7 }}
          transition={{ duration:0.7, delay:3.0 }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{
            background:'rgba(52,211,153,0.04)',
            border:'1px solid rgba(52,211,153,0.14)',
          }}>
            <motion.span className="w-1 h-1 rounded-full bg-emerald-400"
              animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2, repeat:Infinity }}
              style={{ boxShadow:'0 0 4px rgba(52,211,153,0.9)' }}
            />
            <span className="text-[7px] tracking-[0.18em] text-emerald-400/60 uppercase">All systems live</span>
          </div>
        </motion.div>

        {/* Hex data stream (right edge) */}
        <div className="absolute font-mono overflow-hidden" style={{
          right:'2px', top:'330px', width:'76px', height:'140px',
        }}>
          <motion.div
            animate={{ y:[0,'-50%'] }}
            transition={{ duration:9, repeat:Infinity, ease:'linear' }}
          >
            {[
              '0xA3F291','0x60A5FA','0x34D399','0xFB923C',
              '0xA78BFA','0x67E8F9','0xF472B6','0xC4A55A',
              '0x00FF12','0x7E3A00','0xDA00B7','0x4F3A12',
              '0xA3F291','0x60A5FA','0x34D399','0xFB923C',
              '0xA78BFA','0x67E8F9','0xF472B6','0xC4A55A',
              '0x00FF12','0x7E3A00','0xDA00B7','0x4F3A12',
            ].map((line, i) => (
              <div key={i} style={{
                fontSize:'6.5px', lineHeight:'1.75', letterSpacing:'0.04em',
                color: i % 7 === 0 ? 'rgba(196,165,90,0.3)' : 'rgba(255,255,255,0.09)',
              }}>{line}</div>
            ))}
          </motion.div>
        </div>

        {/* Edge fades */}
        <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none" style={{
          background:'linear-gradient(to bottom, transparent, rgba(8,8,8,0.9))',
        }}/>
        <div className="absolute inset-y-0 left-0 w-8 pointer-events-none" style={{
          background:'linear-gradient(to right, rgba(8,8,8,0.5), transparent)',
        }}/>
      </motion.div>
    </motion.div>
  )
}
