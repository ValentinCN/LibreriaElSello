import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"
import {
  PaintBrush,
  Backpack,
  Palette,
  Pencil,
  Notebook,
  Paperclip,
  PenNib,
  PaintBucket,
  Eyedropper,
  Ruler,
  Calculator,
  Eraser,
  PushPin,
  Note,
  Briefcase,
  FolderSimple,
  CompassTool,
  Triangle,
  PencilRuler,
  GridFour,
} from "@phosphor-icons/react"
import type { ElementType, CSSProperties } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Reveal from "../components/Reveal"
import { HeroScene } from "../components/hero/HeroScene"
import { CATEGORIAS, alpha, type CategoriaMeta } from "../constants/categories"
import type { Categoria } from "../constants/categories"
import AttributeStrip from "../components/home/AttributeStrip"
import ReviewsSection from "../components/home/ReviewsSection"
import FaqSection from "../components/home/FaqSection"
import FinalCta from "../components/home/FinalCta"

type LineArtDef = { Icon: ElementType; size: number; pos: CSSProperties; rotate: number }

const CATEGORY_LINE_ART: Record<Categoria, LineArtDef[]> = {
  "Escolar": [
    { Icon: Backpack,   size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 15  },
    { Icon: Notebook,   size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -22 },
    { Icon: Pencil,     size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -8  },
    { Icon: Calculator, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 42  },
    { Icon: Eraser,     size: 88,  pos: { top: "28%", right: "18%" },            rotate: -5  },
  ],
  "Artística": [
    { Icon: PaintBrush,  size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 22  },
    { Icon: Palette,     size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -18 },
    { Icon: PenNib,      size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -12 },
    { Icon: PaintBucket, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 38  },
    { Icon: Eyedropper,  size: 88,  pos: { top: "28%", right: "18%" },            rotate: 8   },
  ],
  "Oficina y universidad": [
    { Icon: Briefcase,    size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 18  },
    { Icon: Paperclip,    size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -12 },
    { Icon: PushPin,      size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -18 },
    { Icon: FolderSimple, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 30  },
    { Icon: Note,         size: 88,  pos: { top: "28%", right: "18%" },            rotate: 6   },
  ],
  "Técnica": [
    { Icon: CompassTool, size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 25  },
    { Icon: Ruler,       size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -15 },
    { Icon: Triangle,    size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -20 },
    { Icon: PencilRuler, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 40  },
    { Icon: GridFour,    size: 88,  pos: { top: "28%", right: "18%" },            rotate: 12  },
  ],
}

// ── Category tile with hover state ──────────────────────────────────
function CategoryTile({ meta }: { meta: CategoriaMeta }) {
  const [hovered, setHovered] = useState(false)
  const reduce  = useReducedMotion()
  const cat     = meta.label
  const Icon    = meta.icon
  const lineArt = CATEGORY_LINE_ART[cat]

  return (
    <Link
      to={`/catalogo?cat=${meta.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.75rem",
        background: hovered ? meta.glow : "var(--surface)",
        border: `1px solid ${hovered ? alpha(meta.color, 38) : "var(--border)"}`,
        textDecoration: "none",
        transition: "background 0.22s, border-color 0.22s, transform 0.22s, box-shadow 0.22s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px ${alpha(meta.color, 13)}`
          : "var(--shadow)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Line-art background icons */}
      {lineArt.map((item, idx) => (
        <div
          key={idx}
          style={{ position: "absolute", pointerEvents: "none", ...item.pos }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: hovered ? 0.16 : 0,
              scale: reduce ? 1 : (hovered ? 1 : 0.92),
              rotate: item.rotate,
            }}
            transition={reduce ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }}
          >
            <item.Icon size={item.size} weight="thin" style={{ color: meta.color }} />
          </motion.div>
        </div>
      ))}

      <div style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        background: alpha(meta.color, 8),
        border: `1px solid ${alpha(meta.color, 19)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.22s",
        position: "relative",
        zIndex: 1,
      }}>
        <Icon size={24} weight="duotone" style={{ color: meta.color }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: hovered ? meta.textColor : "var(--text)",
          marginBottom: "0.35rem",
          transition: "color 0.22s",
        }}>
          {cat}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 300,
          color: "var(--text-muted)",
          lineHeight: 1.6,
        }}>
          {meta.desc}
        </p>
      </div>

      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.75rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: meta.textColor,
        marginTop: "auto",
        position: "relative",
        zIndex: 1,
      }}>
        Ver →
      </span>
    </Link>
  )
}

// ────────────────────────────────────────────────────────────────────

export default function SplashPage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      <Navbar />
      <HeroScene />
      <AttributeStrip />

      {/* ── 1. Teaser de categorías ──────────────────────────── */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "clamp(3.5rem, 7vw, 5.5rem) 2rem",
      }}>
        <Reveal style={{ textAlign: "center", marginBottom: "2.75rem" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-gold-text)",
            marginBottom: "0.65rem",
          }}>
            · NUESTRAS CATEGORÍAS ·
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text)",
          }}>
            ¿Qué estás buscando?
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.1rem",
        }}>
          {CATEGORIAS.map((meta, i) => (
            <Reveal key={meta.slug} delay={0.06 + i * 0.07}>
              <CategoryTile meta={meta} />
            </Reveal>
          ))}
        </div>
      </section>

      <ReviewsSection />

      <FaqSection />

      <FinalCta />

      {/* Footer with existing reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}
