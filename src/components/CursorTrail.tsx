import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Icon } from '@phosphor-icons/react'
import {
  Pencil, Pen, GraduationCap, Scissors, PaintBrush, Palette,
  Notebook, Eraser, Stamp, Paperclip, Calculator, Books, Laptop, Backpack,
} from '@phosphor-icons/react'

const ICONS: Icon[] = [
  Pencil, Pen, GraduationCap, Scissors, PaintBrush, Palette,
  Notebook, Eraser, Stamp, Paperclip, Calculator, Books, Laptop, Backpack,
]
const TRAIL_COLORS = ['#c8960c', '#2d6490'] as const
const MAX_TRAIL    = 18
const THROTTLE_MS  = 65

interface TrailItem {
  id: number
  Icon: Icon
  x: number
  y: number
  size: number
  rotation: number
  color: string
}

function rand(a: number, b: number) { return Math.random() * (b - a) + a }

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([])
  const lastRef  = useRef(0)
  const idRef    = useRef(0)
  const idxRef   = useRef(0)
  const reduce   = useReducedMotion()

  const handleMove = useCallback((e: MouseEvent) => {
    const now = performance.now()
    if (now - lastRef.current < THROTTLE_MS) return
    lastRef.current = now

    const ItemIcon = ICONS[idxRef.current % ICONS.length]
    const color    = TRAIL_COLORS[idxRef.current % TRAIL_COLORS.length]
    idxRef.current++

    const item: TrailItem = {
      id:       idRef.current++,
      Icon:     ItemIcon,
      x:        e.clientX,
      y:        e.clientY,
      size:     Math.round(rand(22, 36)),
      rotation: rand(-45, 45),
      color,
    }

    setTrail(prev => {
      const next = [...prev, item]
      return next.length > MAX_TRAIL ? next.slice(-MAX_TRAIL) : next
    })
  }, [])

  useEffect(() => {
    if (reduce) return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove, reduce])

  if (reduce) return null

  return (
    <AnimatePresence>
      {trail.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0.8, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.25, y: -40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onAnimationComplete={() =>
            setTrail(prev => prev.filter(t => t.id !== item.id))
          }
          style={{
            position: 'fixed',
            left: item.x - item.size / 2,
            top:  item.y - item.size / 2,
            pointerEvents: 'none',
            zIndex: 9999,
            rotate: item.rotation,
          }}
        >
          <item.Icon size={item.size} weight="thin" color={item.color} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
