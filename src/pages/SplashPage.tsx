import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"
import {
  PaintBrush,
  Backpack,
  BookOpen,
  Scissors,
  Palette,
  Pencil,
  Notebook,
  Paperclip,
  WhatsappLogo,
  PenNib,
  PaintBucket,
  Eyedropper,
  Ruler,
  Calculator,
  Eraser,
  Books,
  Book,
  BookmarkSimple,
  PushPin,
  Compass,
  Note,
} from "@phosphor-icons/react"
import type { ElementType, CSSProperties } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GloboArgentina from "../components/illustrations/GloboArgentina"
import CajaEntrega from "../components/illustrations/CajaEntrega"
import RelojAtencion from "../components/illustrations/RelojAtencion"
import ConsultaChat from "../components/illustrations/ConsultaChat"
import Reveal from "../components/Reveal"
import { HeroScene } from "../components/hero/HeroScene"
import { CATEGORIAS, type CategoriaMeta } from "../constants/categories"
import type { Categoria } from "../constants/categories"
import {
  DIRECCION,
  HORARIO,
  WA_PRODUCTOS,
} from "../config"

const PRIMARY = "#2d6490"
const ACCENT  = "#c8960c"

const CATEGORY_ICONS: Record<Categoria, ElementType> = {
  "Artístico": PaintBrush,
  "Escolar":   Backpack,
  "Librería":  BookOpen,
  "Papelería": Scissors,
}

type LineArtDef = { Icon: ElementType; size: number; pos: CSSProperties; rotate: number }

const CATEGORY_LINE_ART: Record<Categoria, LineArtDef[]> = {
  "Artístico": [
    { Icon: PaintBrush,  size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 22  },
    { Icon: Palette,     size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -18 },
    { Icon: PenNib,      size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -12 },
    { Icon: PaintBucket, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 38  },
    { Icon: Eyedropper,  size: 88,  pos: { top: "28%", right: "18%" },            rotate: 8   },
  ],
  "Escolar": [
    { Icon: Backpack,   size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 15  },
    { Icon: Notebook,   size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -22 },
    { Icon: Ruler,      size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -8  },
    { Icon: Calculator, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 42  },
    { Icon: Eraser,     size: 88,  pos: { top: "28%", right: "18%" },            rotate: -5  },
  ],
  "Librería": [
    { Icon: BookOpen,       size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 18  },
    { Icon: Books,          size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -15 },
    { Icon: Book,           size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -20 },
    { Icon: BookmarkSimple, size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 30  },
    { Icon: Pencil,         size: 88,  pos: { top: "28%", right: "18%" },            rotate: 12  },
  ],
  "Papelería": [
    { Icon: Scissors,  size: 120, pos: { bottom: "-1.5rem", right: "-1.5rem" }, rotate: 25  },
    { Icon: Paperclip, size: 96,  pos: { top: "-1rem", left: "-1rem" },         rotate: -12 },
    { Icon: PushPin,   size: 104, pos: { top: "-0.75rem", right: "2.5rem" },    rotate: -18 },
    { Icon: Compass,   size: 100, pos: { bottom: "-0.5rem", left: "-0.75rem" }, rotate: 45  },
    { Icon: Note,      size: 88,  pos: { top: "28%", right: "18%" },            rotate: 6   },
  ],
}

const TRUST_ITEMS = [
  { Illustration: GloboArgentina, hoverLabel: "play", label: "Retiro en tienda",   value: DIRECCION      },
  { Illustration: CajaEntrega,    hoverLabel: "open", label: "Envíos a domicilio", value: "En Quilmes"   },
  { Illustration: RelojAtencion,  hoverLabel: "tick", label: "Atención",            value: HORARIO        },
  { Illustration: ConsultaChat,   hoverLabel: "chat", label: "Consulta directa",   value: "Por WhatsApp" },
]

// ── Category tile with hover state ──────────────────────────────────
function CategoryTile({ meta }: { meta: CategoriaMeta }) {
  const [hovered, setHovered] = useState(false)
  const reduce  = useReducedMotion()
  const cat     = meta.label
  const Icon    = CATEGORY_ICONS[cat]
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
        border: `1px solid ${hovered ? meta.color + "60" : "var(--border)"}`,
        textDecoration: "none",
        transition: "background 0.22s, border-color 0.22s, transform 0.22s, box-shadow 0.22s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px ${meta.color}20`
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
            <item.Icon size={item.size} weight="thin" color={meta.color} />
          </motion.div>
        </div>
      ))}

      <div style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        background: `${meta.color}14`,
        border: `1px solid ${meta.color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.22s",
        position: "relative",
        zIndex: 1,
      }}>
        <Icon size={24} color={meta.color} weight="duotone" />
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
        color: hovered ? meta.textColor : "var(--text-dim)",
        transition: "color 0.22s",
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
  const reduce = useReducedMotion()
  return (
    <div style={{ background: "var(--bg)" }}>
      <Navbar />
      <HeroScene />

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

      {/* ── 2. Franja de confianza ───────────────────────────── */}
      <section style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: `rgba(45,100,144,0.03)`,
        padding: "clamp(2rem, 4vw, 3rem) 2rem",
      }}>
        <Reveal>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            justifyContent: "space-around",
          }}>
            {TRUST_ITEMS.map(({ Illustration, hoverLabel, label, value }, i) => (
              <motion.div
                key={label}
                initial={reduce ? undefined : "rest"}
                whileHover={reduce ? undefined : hoverLabel}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "1rem 1.5rem",
                  flex: hoverLabel === "chat" ? "1 1 240px" : "1 1 200px",
                  borderRight: i < TRUST_ITEMS.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: hoverLabel === "chat" ? 80 : 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: hoverLabel === "chat" ? "visible" : "hidden",
                }}>
                  <Illustration />
                </div>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.2rem",
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#1a3a50",
                    lineHeight: 1.3,
                  }}>
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 3. CTA WhatsApp ──────────────────────────────────── */}
      <div style={{ height: "4px", background: ACCENT }} />
      <section style={{
        background: PRIMARY,
        padding: "clamp(5rem, 9vw, 7rem) 2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle background decoration */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 80% at 80% 50%, rgba(200,150,12,0.12) 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.75rem",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
              }}>
                Armá tu lista con calma.
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.65,
                maxWidth: "480px",
              }}>
                Mandanos los productos que te interesan por WhatsApp y te respondemos
                con disponibilidad, precios y opciones de envío o retiro.
              </p>
            </div>

            <a
              href={WA_PRODUCTOS}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 2.5rem",
                background: ACCENT,
                color: "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = "#b8860a"
                el.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = ACCENT
                el.style.transform = "translateY(0)"
              }}
            >
              <WhatsappLogo size={20} weight="bold" />
              Consultar por WhatsApp
            </a>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.35)",
            }}>
              Lunes a Sábado · 9 a 20hs · Quilmes Centro
            </p>
          </div>
        </Reveal>
      </section>

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
