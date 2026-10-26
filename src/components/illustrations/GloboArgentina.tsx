import { m, useReducedMotion } from 'motion/react'

const E_OUT  = [0.22, 0.9, 0.3, 1] as const
const E_BACK = [0.3, 1.5, 0.5, 1] as const

const TRAZOS = [
  { d: "M52,80 Q110,90 168,80" },
  { d: "M48,100 Q110,110 172,100" },
  { d: "M52,120 Q110,130 168,120" },
]

export default function GloboArgentina() {
  const reduce = useReducedMotion()

  const globeVariants = reduce ? undefined : {
    rest: { y: 0, rotate: 0, opacity: 1 },
    play: {
      y: [120, 0],
      rotate: [-14, 0],
      opacity: [0, 1, 1],
      transition: { duration: 0.9, ease: E_OUT, opacity: { times: [0, 0.6, 1] } },
    },
  }

  const trazoVariants = reduce ? undefined : {
    rest: { pathLength: 1 },
    play: { pathLength: [0, 1], transition: { duration: 1, ease: 'easeInOut' as const } },
  }

  const argVariants = reduce ? undefined : {
    rest: { pathLength: 1 },
    play: { pathLength: [0, 1], transition: { duration: 1.1, ease: 'easeInOut' as const, delay: 0.25 } },
  }

  const pinVariants = reduce ? undefined : {
    rest: { y: 0, scale: 1, opacity: 1 },
    play: {
      y: [-50, 0],
      scale: [0.4, 1],
      opacity: [0, 1, 1],
      transition: { duration: 0.5, ease: E_BACK, delay: 0.82, opacity: { times: [0, 0.65, 1] } },
    },
  }

  const pulseVariants = reduce ? undefined : {
    rest: { scale: 1, opacity: 0 },
    play: {
      scale: [0.3, 2.6],
      opacity: [0.7, 0],
      transition: { duration: 0.9, ease: 'easeOut' as const, delay: 1.15 },
    },
  }

  return (
    <svg
      viewBox="0 0 220 200"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 220, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <m.g
        variants={globeVariants}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={110} cy={100} r={62} stroke="#2d6490" strokeWidth={2} />
        <ellipse cx={110} cy={100} rx={22} ry={62} stroke="#5a8ab0" strokeWidth={1.5} />
        <ellipse cx={110} cy={100} rx={44} ry={62} stroke="#5a8ab0" strokeWidth={1.5} />

        {TRAZOS.map((t, i) => (
          <m.path
            key={i}
            d={t.d}
            stroke="#5a8ab0"
            strokeWidth={1.5}
            variants={trazoVariants}
          />
        ))}

        <m.path
          d="M97,76 C106,73 116,74 124,79 C128,84 128,92 125,99 C131,103 130,110 124,115 C120,126 116,138 110,152 C107,144 105,138 105,131 C100,128 97,120 99,112 C95,106 95,94 98,86 C97,83 96,79 97,76 Z"
          stroke="#2d6490"
          strokeWidth={3}
          fill="rgba(200,150,12,.13)"
          variants={argVariants}
        />
      </m.g>

      <m.circle
        cx={127} cy={101} r={9}
        stroke="#c8960c" strokeWidth={2} fill="none"
        variants={pulseVariants}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />

      <m.g
        variants={pinVariants}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <path
          d="M127,101 C121,93 116,89 116,83 C116,76 121,72 127,72 C133,72 138,76 138,83 C138,89 133,93 127,101 Z"
          fill="#c8960c" stroke="#c8960c" strokeWidth={1}
        />
        <circle cx={127} cy={83} r={4} fill="#fff" />
      </m.g>
    </svg>
  )
}
