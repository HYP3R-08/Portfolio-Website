'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function HeroLaptop({ scrollYProgress }: Props) {
  // Reversed: open at top, closes on scroll
  const lidRotateX = useTransform(scrollYProgress, [0, 0.72], [-9, 76])
  const screenOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0])
  const sleepOpacity = useTransform(scrollYProgress, [0.58, 0.72], [0, 1])
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -16])

  return (
    <motion.div
      style={{ y: floatY }}
      className="relative flex flex-col items-center select-none pointer-events-none"
      aria-hidden="true"
    >
      <div style={{ perspective: '900px', perspectiveOrigin: 'center 100%' }}>

        {/* ── LID ── */}
        <motion.div
          style={{ rotateX: lidRotateX, transformOrigin: 'center bottom' }}
          className="relative"
        >
          {/* Lid SVG body */}
          <svg width="320" height="212" viewBox="0 0 320 212" fill="none" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="hl-lid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c2c2c" />
                <stop offset="45%" stopColor="#212121" />
                <stop offset="100%" stopColor="#191919" />
              </linearGradient>
              <linearGradient id="hl-screen" x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#080f1c" />
                <stop offset="100%" stopColor="#030810" />
              </linearGradient>
              <linearGradient id="hl-reflect" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.055" />
                <stop offset="45%" stopColor="white" stopOpacity="0.012" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="hl-glow" cx="50%" cy="38%" r="55%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.24" />
                <stop offset="55%" stopColor="#1d4ed8" stopOpacity="0.07" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <filter id="hl-lidshadow" x="-10%" y="-5%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="black" floodOpacity="0.55" />
              </filter>
            </defs>

            {/* Lid outer shell */}
            <rect x="1" y="1" width="318" height="210" rx="10" fill="url(#hl-lid)" filter="url(#hl-lidshadow)" />
            {/* Top edge highlight */}
            <rect x="1" y="1" width="318" height="1.5" rx="10" fill="white" fillOpacity="0.07" />
            {/* Side highlights */}
            <rect x="1" y="1" width="1.5" height="210" rx="1" fill="white" fillOpacity="0.04" />
            <rect x="317.5" y="1" width="1.5" height="210" rx="1" fill="white" fillOpacity="0.04" />
            {/* Bottom edge shadow */}
            <rect x="1" y="207" width="318" height="3" rx="3" fill="black" fillOpacity="0.25" />

            {/* Screen bezel */}
            <rect x="11" y="10" width="298" height="194" rx="5" fill="#090909" />

            {/* Screen display */}
            <rect x="18" y="16" width="284" height="182" rx="2" fill="url(#hl-screen)" />

            {/* Screen glow */}
            <rect x="18" y="16" width="284" height="182" rx="2" fill="url(#hl-glow)" />

            {/* Glass reflection diagonal */}
            <rect x="18" y="16" width="284" height="182" rx="2" fill="url(#hl-reflect)" />

            {/* Camera */}
            <ellipse cx="160" cy="13" rx="2.8" ry="2.8" fill="#141414" stroke="#222" strokeWidth="0.6" />
            <ellipse cx="160" cy="13" rx="1.3" ry="1.3" fill="#0a0a0a" />
            <ellipse cx="159.2" cy="12.2" rx="0.4" ry="0.4" fill="white" fillOpacity="0.2" />

            {/* Slim bezel accent lines */}
            <rect x="11" y="10" width="298" height="0.8" rx="1" fill="white" fillOpacity="0.04" />
          </svg>

          {/* Terminal content — HTML overlay for crisp text */}
          <motion.div
            style={{
              opacity: screenOpacity,
              position: 'absolute',
              top: '16px',
              left: '18px',
              width: '284px',
              height: '182px',
              fontSize: '7.5px',
              padding: '18px 14px 10px',
              overflow: 'hidden',
            }}
            className="font-mono leading-[1.65]"
          >
            <div className="text-emerald-400/55">~/authlog $&nbsp;<span className="text-amber-400/70">make all</span></div>
            <div className="text-white/20 mt-[3px]">CC  src/rfid.c</div>
            <div className="text-white/20">CC  src/tls_client.c</div>
            <div className="text-white/20">LD  authlog.elf</div>
            <div className="text-emerald-400/50 mt-[3px]">Build OK — 3 warnings</div>
            <div className="text-white/22 mt-2">
              ~/authlog $&nbsp;<span className="text-amber-400/60">flash --port /dev/ttyUSB0</span>
            </div>
            <div className="text-white/20">Flashing STM32F401RE...</div>
            <div className="text-emerald-400/55">✓ Flash complete</div>
            <div className="text-white/30 mt-2">
              ~/authlog $&nbsp;
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
              >
                █
              </motion.span>
            </div>
          </motion.div>

          {/* Screen glow overlay */}
          <motion.div
            style={{
              opacity: glowOpacity,
              position: 'absolute',
              top: '16px',
              left: '18px',
              width: '284px',
              height: '182px',
              borderRadius: '2px',
              background: 'radial-gradient(ellipse at 50% 35%, rgba(96,165,250,0.16) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          {/* Scan line */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '18px',
              width: '284px',
              height: '182px',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
              initial={{ y: 0 }}
              animate={{ y: 182 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Sleep LED */}
          <motion.div
            style={{ opacity: sleepOpacity, position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}
          >
            <motion.div
              className="w-[5px] h-[5px] rounded-full bg-amber-300"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 8px 3px rgba(251,191,36,0.5)' }}
            />
          </motion.div>
        </motion.div>

        {/* ── HINGE ── */}
        <div style={{ width: '320px', height: '4px', background: '#161616', borderLeft: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, top: 0, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', inset: 0, top: '3px', height: '1px', background: 'rgba(0,0,0,0.5)' }} />
        </div>

        {/* ── BASE SVG ── */}
        <svg width="320" height="88" viewBox="0 0 320 88" fill="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="hl-base" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#252525" />
              <stop offset="100%" stopColor="#1b1b1b" />
            </linearGradient>
            <linearGradient id="hl-keyarea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#191919" />
            </linearGradient>
            <radialGradient id="hl-kbd-glow" cx="50%" cy="-10%" r="60%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.07" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base body */}
          <rect x="0" y="0" width="320" height="88" rx="0" fill="url(#hl-base)" />
          <rect x="0" y="82" width="320" height="6" rx="3" fill="#141414" />
          {/* Top edge */}
          <rect x="0" y="0" width="320" height="1" fill="white" fillOpacity="0.04" />
          {/* Side ports */}
          <rect x="0" y="36" width="3" height="12" rx="1.5" fill="#111" />
          <rect x="317" y="36" width="3" height="12" rx="1.5" fill="#111" />

          {/* Keyboard area recessed */}
          <rect x="18" y="6" width="284" height="64" rx="3" fill="url(#hl-keyarea)" />

          {/* Key backlight glow */}
          <rect x="18" y="6" width="284" height="64" rx="3" fill="url(#hl-kbd-glow)" />

          {/* F-key row (14 keys) */}
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={`f${i}`} x={22 + i * 20} y={9} width={17} height={7} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}

          {/* Number row (13 keys) */}
          {Array.from({ length: 13 }, (_, i) => (
            <rect key={`n${i}`} x={22 + i * 21.5} y={20} width={18.5} height={9} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}

          {/* QWERTY row (12 keys) */}
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={`q${i}`} x={25 + i * 22} y={33} width={19} height={9} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}

          {/* ASDF row (11 keys) */}
          {Array.from({ length: 11 }, (_, i) => (
            <rect key={`a${i}`} x={29 + i * 23} y={46} width={20} height={9} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}

          {/* Bottom row: modifier + spacebar + arrows */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={`zl${i}`} x={22 + i * 20} y={59} width={17} height={9} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}
          <rect x={106} y={59} width={108} height={9} rx="1.5" fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={`zr${i}`} x={220 + i * 20} y={59} width={17} height={9} rx="1.5"
              fill="#212121" stroke="#2c2c2c" strokeWidth="0.5" />
          ))}

          {/* Trackpad */}
          <rect x={108} y={72} width={104} height={13} rx="3.5"
            fill="#1d1d1d" stroke="#272727" strokeWidth="0.6" />
          {/* Trackpad divider */}
          <line x1="160" y1="72" x2="160" y2="85" stroke="#232323" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Ground shadow */}
      <div style={{ width: '260px', height: '8px', marginTop: '4px', borderRadius: '9999px', background: 'rgba(0,0,0,0.65)', filter: 'blur(12px)' }} />

      {/* Ambient screen glow pool */}
      <motion.div style={{ opacity: glowOpacity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div style={{ width: '200px', height: '40px', borderRadius: '9999px', filter: 'blur(28px)', background: 'rgba(96,165,250,0.13)' }} />
      </motion.div>
    </motion.div>
  )
}
