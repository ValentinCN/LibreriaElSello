import { motion, useReducedMotion } from 'motion/react'

const E_BACK = [0.3, 1.4, 0.5, 1] as const

export default function CercaTuyoPin() {
  const reduce = useReducedMotion()

  const dropPinVars = reduce ? undefined : {
    rest: { y: 0, scale: 1, opacity: 1 },
    active: {
      y: [-26, 0],
      scale: [0.5, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.55,
        ease: E_BACK,
        opacity: { times: [0, 0.6, 1] },
      },
    },
  }

  const mpulseVars = reduce ? undefined : {
    rest:   { scale: 1, opacity: 0 },
    active: {
      scale: [0.5, 1.5],
      opacity: [0.7, 0],
      transition: { duration: 0.9, ease: 'easeOut' as const, delay: 0.45 },
    },
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
      <ellipse cx={32} cy={50} rx={13} ry={4} stroke="#5a8ab0" strokeWidth={2} strokeDasharray="3 4" />
      <motion.circle
        cx={32} cy={49} r={8}
        stroke="#c8960c"
        strokeWidth={2}
        variants={mpulseVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <motion.g
        variants={dropPinVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <path
          d="M32,49 C27,41 23,38 23,32 C23,26 27,22 32,22 C37,22 41,26 41,32 C41,38 37,41 32,49 Z"
          fill="#c8960c"
          stroke="#c8960c"
          strokeWidth={1}
        />
        <circle cx={32} cy={32} r={3.6} fill="#fff" />
      </motion.g>
    </svg>
  )
}
