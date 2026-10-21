import { motion, useReducedMotion } from 'motion/react'

const E_BOX = [0.3, 1.15, 0.4, 1] as const

export default function CajaEntrega() {
  const reduce = useReducedMotion()

  const flapLVars = reduce ? undefined : {
    rest: { rotate: 0 },
    open: { rotate: -118, transition: { duration: 0.5, ease: E_BOX } },
  }

  const flapRVars = reduce ? undefined : {
    rest: { rotate: 0 },
    open: { rotate: 118, transition: { duration: 0.5, ease: E_BOX } },
  }

  const seamVars = reduce ? undefined : {
    rest: { opacity: 1 },
    open: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 80, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Box body */}
      <path d="M18,30 H62 V64 H18 Z" stroke="#2d6490" strokeWidth={2.4} />
      {/* Ribbon vertical */}
      <path d="M40,30 V64" stroke="#c8960c" strokeWidth={2} />
      {/* Ribbon horizontal */}
      <path d="M18,47 H62" stroke="#c8960c" strokeWidth={2} />
      {/* Seam fades when open */}
      <motion.path
        d="M18,30 H62"
        stroke="#5a8ab0"
        strokeWidth={1.6}
        variants={seamVars}
      />
      {/* Flap left — pivots at left-bottom corner of its own fill-box */}
      <motion.path
        d="M18,30 H40 V24 H20 Z"
        fill="rgba(45,100,144,0.06)"
        stroke="#2d6490"
        strokeWidth={2.4}
        variants={flapLVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'left bottom' }}
      />
      {/* Flap right — pivots at right-bottom corner of its own fill-box */}
      <motion.path
        d="M40,30 H62 V24 H60 Z"
        fill="rgba(45,100,144,0.06)"
        stroke="#2d6490"
        strokeWidth={2.4}
        variants={flapRVars}
        style={{ transformBox: 'fill-box', transformOrigin: 'right bottom' }}
      />
    </svg>
  )
}
