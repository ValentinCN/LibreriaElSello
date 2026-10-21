import { motion, useReducedMotion } from 'motion/react'

const E_OUT  = [0.22, 0.9, 0.3, 1] as const
const E_SOFT = [0.3, 1.1, 0.4, 1] as const

const KEYS = [
  { cx: 80, cy: 124 }, { cx: 100, cy: 124 }, { cx: 120, cy: 124 },
  { cx: 80, cy: 140 }, { cx: 100, cy: 140 }, { cx: 120, cy: 140 },
  { cx: 80, cy: 156 }, { cx: 100, cy: 156 }, { cx: 120, cy: 156 },
]

export default function PosnetPago() {
  const reduce = useReducedMotion()

  const posVariants = reduce ? undefined : {
    rest: { y: 0, opacity: 1 },
    play: { y: [120, 0], opacity: [0, 1], transition: { duration: 0.6, ease: E_OUT } },
  }

  const paycardVariants = reduce ? undefined : {
    rest: { y: 0, opacity: 1 },
    play: {
      y: [-44, 0],
      opacity: [0, 1, 1],
      transition: { duration: 0.65, ease: E_SOFT, delay: 0.5, opacity: { times: [0, 0.55, 1] } },
    },
  }

  const checkVariants = reduce ? undefined : {
    rest: { pathLength: 1 },
    play: { pathLength: [0, 1], transition: { duration: 0.55, ease: 'easeInOut' as const, delay: 1.15 } },
  }

  return (
    <svg
      viewBox="0 0 200 180"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 220, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.g variants={posVariants}>
        <rect x={66} y={52} width={68} height={7} rx={3.5} stroke="#2d6490" strokeWidth={2.4} />
        <rect x={60} y={60} width={80} height={104} rx={11} stroke="#2d6490" strokeWidth={2.4} />
        <rect x={70} y={72} width={60} height={36} rx={4} fill="#e8f1f8" stroke="#5a8ab0" strokeWidth={1.6} />
        <motion.path
          d="M86,90 l8,9 l16,-19"
          stroke="#2e9e5b" strokeWidth={3.4}
          variants={checkVariants}
        />
        {KEYS.map(({ cx, cy }) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} stroke="#2d6490" strokeWidth={1.8} />
        ))}
      </motion.g>

      <motion.g variants={paycardVariants}>
        <rect x={74} y={20} width={52} height={32} rx={5} fill="#fbf2da" stroke="#c8960c" strokeWidth={2.4} />
        <path d="M78,30 H122" stroke="#c8960c" strokeWidth={4} />
      </motion.g>
    </svg>
  )
}
