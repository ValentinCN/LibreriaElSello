import { m, useReducedMotion, type Variants } from 'motion/react'

const E_VAN = [0.16, 0.7, 0.3, 1] as const

const SPEEDS = [
  { x1: 8,  y1: 72, x2: 32, y2: 72,  delay: 0.05 },
  { x1: 4,  y1: 90, x2: 30, y2: 90,  delay: 0.12 },
  { x1: 8,  y1: 108, x2: 32, y2: 108, delay: 0.19 },
]

const PUFFS = [
  { cx: 30, cy: 112, r: 6, delay: 0.30 },
  { cx: 30, cy: 112, r: 7, delay: 0.55 },
  { cx: 30, cy: 112, r: 5, delay: 0.82 },
]

// Fuera del componente: si se define adentro, se recrea en cada render
function Wheel({ cx, cy, variants }: { cx: number; cy: number; variants?: Variants }) {
  return (
    <m.g
      variants={variants}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <circle cx={cx} cy={cy} r={15} fill="#fff" stroke="#1a3a50" strokeWidth={2.8} />
      <circle cx={cx} cy={cy} r={9}  fill="none" stroke="#1a3a50" strokeWidth={1.6} />
      <path
        d={`M${cx},${cy - 9} V${cy + 9} M${cx - 9},${cy} H${cx + 9} M${cx - 6.4},${cy - 6.4} L${cx + 6.4},${cy + 6.4} M${cx - 6.4},${cy + 6.4} L${cx + 6.4},${cy - 6.4}`}
        stroke="#1a3a50" strokeWidth={1.6}
      />
      <circle cx={cx} cy={cy} r={3} fill="#1a3a50" />
    </m.g>
  )
}

export default function PickupEntrega() {
  const reduce = useReducedMotion()

  const vanVariants = reduce ? undefined : {
    rest: { x: 0, opacity: 1 },
    play: {
      x: [-115, 7, 0],
      opacity: [0, 1, 1],
      transition: { duration: 1.15, ease: E_VAN, x: { times: [0, 0.82, 1] }, opacity: { times: [0, 0.4, 1] } },
    },
  }

  const wheelVariants = reduce ? undefined : {
    rest: { rotate: 0 },
    play: { rotate: [0, 540], transition: { duration: 1.15, ease: E_VAN } },
  }

  const speedVariant = (delay: number) => reduce ? undefined : ({
    rest: { x: 0, opacity: 0 },
    play: {
      x: [46, -34],
      opacity: [0, 0.85, 0],
      transition: { duration: 0.5, ease: 'easeInOut' as const, delay, opacity: { times: [0, 0.35, 1] } },
    },
  })

  const puffVariant = (delay: number) => reduce ? undefined : ({
    rest: { x: 0, y: 0, scale: 0.3, opacity: 0 },
    play: {
      x: [0, -26],
      y: [0, -42],
      scale: [0.3, 1.7],
      opacity: [0, 0.6, 0],
      transition: { duration: 1.1, ease: 'easeOut' as const, delay, opacity: { times: [0, 0.25, 1] } },
    },
  })

  return (
    <svg
      viewBox="0 0 240 160"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 220, display: 'block', pointerEvents: 'none' }}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1={14} y1={132} x2={226} y2={132} stroke="#cfc8ba" strokeWidth={2} strokeDasharray="12 10" />

      {SPEEDS.map((s, i) => (
        <m.line
          key={i}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="#5a8ab0" strokeWidth={2.4}
          variants={speedVariant(s.delay)}
        />
      ))}

      {PUFFS.map((p, i) => (
        <m.circle
          key={i}
          cx={p.cx} cy={p.cy} r={p.r}
          fill="#c9c2b4"
          variants={puffVariant(p.delay)}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      <m.g variants={vanVariants}>
        <path d="M40,116 V84 H120 V60 H160 L174,80 L204,96 Q208,98 208,104 V116 Z" stroke="#2d6490" strokeWidth={2.6} />
        <path d="M46,88 H116" stroke="#5a8ab0" strokeWidth={1.6} />
        <path d="M58,84 V68 H96 V84 Z" fill="rgba(200,150,12,.12)" stroke="#c8960c" strokeWidth={1.8} />
        <path d="M77,68 V84 M58,76 H96" stroke="#c8960c" strokeWidth={1.8} />
        <path d="M120,84 V112" stroke="#5a8ab0" strokeWidth={1.6} />
        <path d="M124,64 H140 V78 H124 Z" fill="#dcebf6" stroke="#5a8ab0" strokeWidth={1.6} />
        <path d="M143,64 H156 L166,78 H143 Z" fill="#dcebf6" stroke="#5a8ab0" strokeWidth={1.6} />
        <path d="M142,80 V112" stroke="#5a8ab0" strokeWidth={1.6} />
        <path d="M40,113 H32" stroke="#1a3a50" strokeWidth={2.6} />
        <path d="M61,116 A15,15 0 0,1 91,116" stroke="#2d6490" strokeWidth={2.6} />
        <path d="M161,116 A15,15 0 0,1 191,116" stroke="#2d6490" strokeWidth={2.6} />
        <Wheel cx={76} cy={118} variants={wheelVariants} />
        <Wheel cx={176} cy={118} variants={wheelVariants} />
      </m.g>
    </svg>
  )
}
