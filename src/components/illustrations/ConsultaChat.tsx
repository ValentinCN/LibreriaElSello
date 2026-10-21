import { motion, useReducedMotion } from 'motion/react'

const E_BUBBLE = [0.3, 1.35, 0.4, 1] as const

export default function ConsultaChat() {
  const reduce = useReducedMotion()

  // WA typing indicator fades and collapses on hover
  const waVars = reduce ? undefined : {
    rest: { opacity: 1, scale: 1 },
    chat: { opacity: 0, scale: 0.35, transition: { duration: 0.3 } },
  }

  // Chat bubble grows in from tail corner on hover
  const bubbleVars = reduce ? undefined : {
    rest: { opacity: 0, scale: 0.4 },
    chat: { opacity: 1, scale: 1, transition: { duration: 0.38, ease: E_BUBBLE, delay: 0.15 } },
  }

  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      style={{ width: '100%', maxWidth: 120, display: 'block', pointerEvents: 'none', overflow: 'visible' }}
      fill="none"
    >
      {/* WA circle with typing dots */}
      <motion.g
        variants={waVars}
        style={{ transformBox: 'view-box', transformOrigin: '28% 50%' }}
      >
        <circle cx={34} cy={40} r={18} fill="#25a35a" />
        <circle cx={27} cy={40} r={2.8} fill="#fff" />
        <circle cx={34} cy={40} r={2.8} fill="#fff" />
        <circle cx={41} cy={40} r={2.8} fill="#fff" />
      </motion.g>

      {/* Chat bubble with text — scales in from tail area */}
      <motion.g
        variants={bubbleVars}
        style={{ transformBox: 'view-box', transformOrigin: '25% 65%' }}
      >
        <path
          fill="#25a35a"
          d="M22,14 H106 a8,8 0 0 1 8,8 V46 a8,8 0 0 1 -8,8 H42 L32,64 V54 H22 a8,8 0 0 1 -8,-8 V22 a8,8 0 0 1 8,-8 Z"
        />
        <text x={66} y={33} textAnchor="middle" fill="#fff" fontFamily="'DM Sans',sans-serif" fontSize={11} fontWeight={600}>¿Tengo una</text>
        <text x={66} y={46} textAnchor="middle" fill="#fff" fontFamily="'DM Sans',sans-serif" fontSize={11} fontWeight={600}>consulta?</text>
      </motion.g>
    </svg>
  )
}
