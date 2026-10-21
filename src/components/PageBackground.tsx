import {
  Pencil, Scissors, Palette, Backpack, Notebook, Eraser, PaintBrush, Pen,
} from '@phosphor-icons/react'

// Header zone — visible around the title, concentrated top 30% of viewport
// Side margins — present along the edges (left 0–8%, right 88–100%)
// Deeper in page — very subtle, not behind the card grid
const BG_ITEMS = [
  // Header left
  { Icon: Pencil,     size: 112, left: '2%',  top: '7%',  rotate: -22, opacity: 0.085 },
  { Icon: Eraser,     size: 66,  left: '7%',  top: '24%', rotate: 28,  opacity: 0.068 },
  // Header right
  { Icon: Scissors,   size: 92,  left: '91%', top: '6%',  rotate: 14,  opacity: 0.082 },
  { Icon: Pen,        size: 70,  left: '87%', top: '22%', rotate: -12, opacity: 0.064 },
  // Left margin mid
  { Icon: PaintBrush, size: 80,  left: '1%',  top: '52%', rotate: 16,  opacity: 0.055 },
  { Icon: Notebook,   size: 62,  left: '4%',  top: '72%', rotate: -8,  opacity: 0.044 },
  // Right margin mid
  { Icon: Palette,    size: 88,  left: '93%', top: '48%', rotate: -10, opacity: 0.060 },
  { Icon: Backpack,   size: 68,  left: '89%', top: '76%', rotate: 8,   opacity: 0.044 },
]

export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Warm beige depth: center-top lighter, edges subtly warmer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 85% 65% at 50% 22%, rgba(255,253,248,0.60) 0%, rgba(232,222,200,0.22) 100%)',
      }} />

      {BG_ITEMS.map(({ Icon, size, left, top, rotate, opacity }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left,
            top,
            transform: `rotate(${rotate}deg)`,
            opacity,
          }}
        >
          <Icon size={size} weight="thin" color="#1a3a50" />
        </div>
      ))}
    </div>
  )
}
