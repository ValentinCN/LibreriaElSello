import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import type { CSSProperties } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface BouncyTitleProps {
  children: string
  as?: HeadingTag
  style?: CSSProperties
}

export default function BouncyTitle({ children, as = 'h1', style }: BouncyTitleProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const Tag = as
  const active = hovered && !prefersReduced

  return (
    <Tag
      style={{ ...style, cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} style={{ display: 'inline-block' }}>{' '}</span>
        ) : (
          <motion.span
            key={i}
            style={{ display: 'inline-block' }}
            animate={active ? 'bounce' : 'rest'}
            variants={{
              rest:   { y: 0,  transition: { type: 'spring', stiffness: 380, damping: 22 } },
              bounce: { y: -8, transition: { type: 'spring', stiffness: 480, damping: 14, delay: i * 0.024 } },
            }}
          >
            {char}
          </motion.span>
        )
      )}
    </Tag>
  )
}
