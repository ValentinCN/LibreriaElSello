import { MapPin, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "motion/react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Reveal from "../components/Reveal"
import PageBackground from "../components/PageBackground"
import MagneticText from "../components/MagneticText"
import { HeroBadge } from "../components/hero/HeroScene"
import AtencionPersona from "../components/illustrations/AtencionPersona"
import VariedadPaleta from "../components/illustrations/VariedadPaleta"
import CercaTuyoPin from "../components/illustrations/CercaTuyoPin"
import ConsultaChat from "../components/illustrations/ConsultaChat"
import {
  DIRECCION,
  CIUDAD,
  MAPS_EMBED,
  GOOGLE_MAPS_URL,
  LOCAL_FOTO,
  ENVIOS_ZONA,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  waLink,
} from "../config"
import { REVIEWS } from "../constants/reviews"

const PRIMARY = "#2d6490"
const ACCENT  = "#c8960c"
const SEC     = "#5a8ab0"

// Cita destacada: la reseña de Clara V., tomada de reviews.ts (texto exacto)
const CITA = REVIEWS.find(r => r.autor === "Clara V.")

// ── Why-us cards ─────────────────────────────────────────────────────
const CARDS = [
  {
    Illustration: AtencionPersona,
    hoverLabel: "active",
    titulo: "Atención personalizada",
    desc: "Alguien que te escucha y te ayuda a encontrar lo que necesitás, en el local o por WhatsApp.",
  },
  {
    Illustration: VariedadPaleta,
    hoverLabel: "active",
    titulo: "Variedad",
    desc: "Todo en un solo lugar, para el colegio, la oficina, el taller o un regalo.",
  },
  {
    Illustration: CercaTuyoPin,
    hoverLabel: "active",
    titulo: "Cerca tuyo",
    desc: `En Quilmes Centro, con envíos a ${ENVIOS_ZONA}.`,
  },
  {
    Illustration: ConsultaChat,
    hoverLabel: "chat",
    titulo: "Consulta directa",
    desc: "Armás tu lista con calma y la mandás por WhatsApp. Sin apuros ni carritos.",
  },
]

const CARD_VARS = {
  rest:   { y: 0 },
  active: { y: -3 },
  chat:   { y: -3 },
}

// ─────────────────────────────────────────────────────────────────────

export default function ConocenosPage() {
  const reduce = useReducedMotion()
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", transition: "background 0.3s ease" }}>
      <PageBackground />
      <Navbar />

      <div style={{ paddingTop: "58px", position: "relative", zIndex: 1 }}>

        {/* ── 1. Encabezado ──────────────────────────────────── */}
        <header
          className="hero-bg"
          style={{
            paddingTop: "5rem",
            paddingBottom: "5.5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
          }}
        >
          <Reveal>
            <HeroBadge />
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticText as="h1" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.05,
            }}>
              Conocé el Sello
            </MagneticText>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "var(--text-muted)",
              maxWidth: "400px",
              lineHeight: 1.65,
            }}>
              Librería y regalería en Quilmes Centro.
            </p>
          </Reveal>
        </header>

        {/* ── 2. El local ─────────────────────────────────────── */}
        <section style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 5.5rem) 2rem",
        }}>
          {/* Mobile: foto arriba, con el ancho del texto. Desde md: foto a la
              derecha en una columna de 40% como máximo. Sin foto, solo texto. */}
          <div className={LOCAL_FOTO ? "grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,40%)] md:items-center" : undefined}>
            {LOCAL_FOTO && (
              <Reveal delay={0.12} className="md:order-2">
                <img
                  src={LOCAL_FOTO}
                  alt="Fachada de Librería el Sello en Rivadavia 341, Quilmes Centro"
                  width={566}
                  height={638}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: 566,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 12,
                    marginInline: "auto",
                  }}
                />
              </Reveal>
            )}

            {/* Text column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <Reveal>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "var(--color-gold-text)",
                }}>
                  · El local ·
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.15,
                  textWrap: "balance",
                }}>
                  {/* Corte fijo antes de "insumos": nunca queda "a insumos" sola.
                      Mínimo 1.6rem para que la 2.ª línea entre a 375. */}
                  De útiles escolares a{" "}
                  <span style={{ whiteSpace: "nowrap" }}>insumos de computación</span>
                </h2>
              </Reveal>
              {/* Fuente: rubros del cartel del local. Nada de historia ni años
                  hasta que el dueño los confirme. */}
              <Reveal delay={0.14}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.82 }}>
                  Tenemos artículos escolares, comerciales, técnicos y de arte, regalería e insumos de computación. También atendemos empresas.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.82 }}>
                  Si no lo ves en el catálogo, preguntá: te asesoramos en el local y por WhatsApp.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Cita destacada: testimonio de una clienta (reseña de Google),
              atribuido a ella, no como afirmación del negocio. */}
          {CITA && (
            <Reveal delay={0.1} style={{ marginTop: "3.5rem" }}>
              <figure style={{
                padding: "2rem 2.5rem",
                borderLeft: `4px solid ${PRIMARY}`,
                background: "rgba(45,100,144,0.04)",
                borderRadius: "0 4px 4px 0",
              }}>
                <blockquote style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: PRIMARY,
                  lineHeight: 1.2,
                  maxWidth: "32ch",
                  textWrap: "balance",
                }}>
                  “{CITA.texto}”
                </blockquote>
                <figcaption style={{
                  marginTop: "1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                }}>
                  — {CITA.autor}, reseña en Google
                </figcaption>
              </figure>
            </Reveal>
          )}
        </section>

        {/* ── 3. Por qué elegirnos ────────────────────────────── */}
        <section style={{
          background: "rgba(45,100,144,0.03)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "clamp(3rem, 6vw, 5rem) 2rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "var(--color-gold-text)",
                marginBottom: "0.65rem",
              }}>
                · Lo que nos hace el sello ·
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--text)",
              }}>
                Por qué elegirnos
              </h2>
            </Reveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.1rem",
            }}>
              {CARDS.map(({ Illustration, hoverLabel, titulo, desc }, i) => (
                <Reveal key={titulo} delay={0.08 + i * 0.08}>
                  <motion.div
                    initial={reduce ? undefined : "rest"}
                    whileHover={reduce ? undefined : hoverLabel}
                    variants={reduce ? undefined : CARD_VARS}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(45,100,144,0.13)"
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)"
                    }}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      padding: "2rem 1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                      boxShadow: "var(--shadow)",
                      cursor: "default",
                      height: "100%",
                    }}
                  >
                    <div style={{
                      width: 64,
                      height: 64,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      overflow: hoverLabel === "chat" ? "visible" : "hidden",
                    }}>
                      <Illustration />
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}>
                      {titulo}
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                    }}>
                      {desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Visitanos ────────────────────────────────────── */}
        <section style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 5.5rem) 2rem",
        }}>
          <Reveal style={{ marginBottom: "2.25rem" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "var(--color-gold-text)",
              marginBottom: "0.5rem",
            }}>
              · Visitanos ·
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text)",
            }}>
              Dónde estamos
            </h2>
          </Reveal>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            alignItems: "stretch",
          }}>
            {/* Map iframe */}
            <Reveal style={{ flex: "2 1 340px", minWidth: 0 }}>
              <div style={{
                border: "1px solid var(--border)",
                overflow: "hidden",
                height: "100%",
                minHeight: "360px",
              }}>
                <iframe
                  title="Librería El Sello — Mapa"
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: "360px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Info block */}
            <Reveal delay={0.15} style={{ flex: "1 1 260px", minWidth: 0 }}>
              <div style={{
                padding: "2rem",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${PRIMARY}`,
                background: "var(--surface)",
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
              }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
                    Dirección
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.15 }}>
                    {DIRECCION}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.25rem" }}>
                    {CIUDAD}
                  </p>
                </div>

                <div style={{ width: "100%", height: 1, background: "var(--border)" }} />

                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
                    Horario
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                    Lunes a Sábado
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: ACCENT, fontWeight: 500, marginTop: "0.2rem" }}>
                    9 a 20hs
                  </p>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 1.5rem",
                    background: PRIMARY,
                    color: "#ffffff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                    alignSelf: "flex-start",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = SEC)}
                  onMouseLeave={e => (e.currentTarget.style.background = PRIMARY)}
                >
                  <MapPin size={15} weight="bold" />
                  Cómo llegar
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. Seguinos / contacto ──────────────────────────── */}
        <section
          className="hero-bg"
          style={{
            borderTop: "1px solid var(--border)",
            padding: "clamp(3.5rem, 7vw, 6rem) 2rem",
          }}
        >
          <Reveal>
            <div style={{
              maxWidth: "560px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.25rem",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--color-gold-text)" }}>
                  · Seguinos ·
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "var(--text)" }}>
                  Estamos en las redes
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.7 }}>
                  Novedades y productos en Instagram. Consultas por WhatsApp.
                </p>
              </div>

              {/* Grid de columnas iguales: los dos botones miden lo mismo.
                  < 640: apilados, ancho completo con tope de 320px. Desde 640: en fila. */}
              <div className="grid w-full max-w-[320px] gap-[0.85rem] sm:w-auto sm:max-w-none sm:grid-cols-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    padding: "0.9rem 1.8rem",
                    border: "1.5px solid rgba(225,48,108,0.45)",
                    background: "var(--surface)",
                    color: "#E1306C",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "rgba(225,48,108,0.07)"
                    el.style.borderColor = "#E1306C"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "var(--surface)"
                    el.style.borderColor = "rgba(225,48,108,0.45)"
                  }}
                >
                  <InstagramLogo size={18} weight="bold" />
                  {INSTAGRAM_HANDLE}
                </a>

                <a
                  href={waLink("Hola! Quería hacer una consulta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    padding: "0.9rem 1.8rem",
                    background: "var(--color-primary)",
                    color: "#ffffff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = SEC)}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--color-primary)")}
                >
                  <WhatsappLogo size={18} weight="bold" />
                  Escribinos
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </div>
  )
}
