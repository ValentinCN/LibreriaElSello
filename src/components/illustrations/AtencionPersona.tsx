import { motion, useReducedMotion } from 'motion/react'

const E_SOFT = [0.3, 1.1, 0.4, 1] as const

export default function AtencionPersona() {
  const reduce = useReducedMotion()

  const personVars = reduce ? undefined : {
    rest:   { scale: 1 },
    active: { scale: 1.08, transition: { duration: 0.35, ease: E_SOFT } },
  }

  const ppulseVars = reduce ? undefined : {
    rest:   { scale: 1, opacity: 0 },
    active: { scale: [0.5, 1.5], opacity: [0.7, 0], transition: { duration: 1, ease: 'easeOut' as const } },
  }

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 64, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx={32} cy={26} r={16}
        stroke="#c8960c"
        strokeWidth={2}
        variants={ppulseVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <motion.g
        variants={personVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={32} cy={24} r={8} stroke="#2d6490" strokeWidth={2.6} />
        <path d="M16,48 C16,38 23,33 32,33 C41,33 48,38 48,48" stroke="#2d6490" strokeWidth={2.6} />
      </motion.g>
    </svg>
  )
}
