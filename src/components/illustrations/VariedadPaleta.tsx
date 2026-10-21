import { motion, useReducedMotion } from 'motion/react'

const E_BACK = [0.3, 1.4, 0.5, 1] as const

const DABS = [
  { cx: 23, cy: 24, fill: '#e07a5f', delay: 0.05 },
  { cx: 32, cy: 20, fill: '#5a8ab0', delay: 0.14 },
  { cx: 42, cy: 25, fill: '#4caf6e', delay: 0.23 },
  { cx: 25, cy: 35, fill: '#9b7cc4', delay: 0.32 },
  { cx: 35, cy: 33, fill: '#c8960c', delay: 0.41 },
]

export default function VariedadPaleta() {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 64, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M32,12 C45,12 54,21 54,32 C54,41 47,46 40,46 C36,46 34,48 34,51 C34,54 31,55 28,54 C18,51 10,43 10,32 C10,21 19,12 32,12 Z"
        stroke="#2d6490"
        strokeWidth={2.6}
      />
      <circle cx={41} cy={38} r={3} stroke="#2d6490" strokeWidth={2.6} />

      {DABS.map(({ cx, cy, fill, delay }) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx} cy={cy} r={3.6}
          fill={fill}
          variants={reduce ? undefined : {
            rest:   { scale: 0, opacity: 0 },
            active: {
              scale: [0, 1],
              opacity: [0, 1, 1],
              transition: {
                duration: 0.4,
                ease: E_BACK,
                delay,
                opacity: { times: [0, 0.6, 1] },
              },
            },
          }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}
