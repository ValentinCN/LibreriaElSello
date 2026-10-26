import { useReducedMotion, m } from "motion/react"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
  className?: string
}

export default function Reveal({ children, delay = 0, style, className }: RevealProps) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) {
    return <div style={style} className={className}>{children}</div>
  }
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </m.div>
  )
}
