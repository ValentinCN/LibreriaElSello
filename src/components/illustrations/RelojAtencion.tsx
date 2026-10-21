import { motion, useReducedMotion } from 'motion/react'

const E_CLOCK = [0.2, 0.75, 0.25, 1] as const

export default function RelojAtencion() {
  const reduce = useReducedMotion()

  const faceVars = reduce ? undefined : {
    rest: { scale: 1 },
    tick: { scale: 1.12, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  const hourVars = reduce ? undefined : {
    rest: { rotate: 0 },
    tick: { rotate: 75, transition: { duration: 0.9, ease: E_CLOCK } },
  }

  const minVars = reduce ? undefined : {
    rest: { rotate: 0 },
    tick: { rotate: 300, transition: { duration: 0.9, ease: E_CLOCK } },
  }

  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 80, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
    >
      <motion.g
        variants={faceVars}
        style={{ transformBox: 'view-box', transformOrigin: '50% 50%' }}
      >
        <circle cx={40} cy={40} r={26} stroke="#2d6490" strokeWidth={2.6} />
        <line x1={40} y1={16} x2={40} y2={21} stroke="#5a8ab0" strokeWidth={2} />
        <line x1={40} y1={64} x2={40} y2={59} stroke="#5a8ab0" strokeWidth={2} />
        <line x1={64} y1={40} x2={59} y2={40} stroke="#5a8ab0" strokeWidth={2} />
        <line x1={16} y1={40} x2={21} y2={40} stroke="#5a8ab0" strokeWidth={2} />
      </motion.g>
      {/* Hour hand (shorter) */}
      <motion.line
        x1={40} y1={40} x2={40} y2={24}
        stroke="#1a3a50" strokeWidth={3} strokeLinecap="round"
        variants={hourVars}
        style={{ transformBox: 'view-box', transformOrigin: '50% 50%' }}
      />
      {/* Minute hand (longer) */}
      <motion.line
        x1={40} y1={40} x2={40} y2={16}
        stroke="#2d6490" strokeWidth={2.6} strokeLinecap="round"
        variants={minVars}
        style={{ transformBox: 'view-box', transformOrigin: '50% 50%' }}
      />
      <circle cx={40} cy={40} r={3} fill="#c8960c" />
    </svg>
  )
}
