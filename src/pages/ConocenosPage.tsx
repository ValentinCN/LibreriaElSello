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
  MAPS_URL,
  MAPS_EMBED,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WA_CONSULTA,
} from "../config"

const PRIMARY = "#2d6490"
const ACCENT  = "#c8960c"
const SEC     = "#5a8ab0"

// ── Why-us cards ─────────────────────────────────────────────────────
const CARDS = [
  {
    Illustration: AtencionPersona,
    hoverLabel: "active",
    titulo: "Atención personalizada",
    desc: "Asesoramiento real, no un carrito frío. Alguien te escucha y te ayuda a elegir bien.",
  },
  {
    Illustration: VariedadPaleta,
    hoverLabel: "active",
    titulo: "Variedad",
    desc: "Artístico, escolar, librería y regalería en un solo lugar.",
  },
  {
    Illustration: CercaTuyoPin,
    hoverLabel: "active",
    titulo: "Cerca tuyo",
    desc: "Quilmes Centro, con envíos a domicilio en toda la zona.",
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
              Una papelería de barrio con atención real, variedad genuina y el trato de siempre.
            </p>
          </Reveal>
        </header>

        {/* ── 2. Nuestra historia ─────────────────────────────── */}
        <section style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 5.5rem) 2rem",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "start",
          }}>

            {/* Text column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <Reveal>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  opacity: 0.75,
                }}>
                  · Nuestra historia ·
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.15,
                }}>
                  Una librería de barrio{" "}
                  <em style={{ color: PRIMARY, fontStyle: "italic" }}>con historia.</em>
                </h2>
              </Reveal>
              {/* TODO: reemplazar por historia real */}
              <Reveal delay={0.14}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.82 }}>
                  Librería el Sello es una papelería de barrio en pleno Quilmes Centro. Empezamos con una idea simple: que comprar útiles, material artístico o un regalo se sienta como entrar a la librería de siempre, esa donde alguien te conoce, te escucha y te ayuda a elegir bien.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.82 }}>
                  Con los años fuimos sumando de todo un poco —marcadores y acrílicos para los que pintan, cuadernos y mochilas para arrancar las clases, agendas, regalería y esos detalles que aparecen justo cuando los necesitás— pero sin perder lo que nos importa: la atención cara a cara y el consejo honesto.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.82 }}>
                  Por eso acá no hay un carrito frío que te apura. Armás tu lista con calma y la charlamos por WhatsApp, como se hacen las cosas entre vecinos.
                </p>
              </Reveal>
            </div>

            {/* Image placeholder column */}
            <Reveal delay={0.12} style={{ alignSelf: "stretch", minHeight: "340px" }}>
              <div style={{
                height: "100%",
                minHeight: "340px",
                background: "linear-gradient(145deg, rgba(45,100,144,0.07) 0%, rgba(200,150,12,0.05) 100%)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${ACCENT}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.9rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <span style={{
                  position: "absolute",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(6rem, 18vw, 11rem)",
                  fontWeight: 900,
                  color: "rgba(45,100,144,0.05)",
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                  lineHeight: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                  eS
                </span>
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(45,100,144,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke={PRIMARY} strokeWidth="1.3" />
                      <circle cx="8.5" cy="8.5" r="1.5" stroke={PRIMARY} strokeWidth="1" />
                      <path d="M3 15l5-5 4 4 3-3 6 6" stroke={PRIMARY} strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                  }}>
                    Foto del local — próximamente
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Tagline destacada */}
          <Reveal delay={0.1} style={{ marginTop: "3.5rem" }}>
            <div style={{
              padding: "2rem 2.5rem",
              borderLeft: `4px solid ${PRIMARY}`,
              background: "rgba(45,100,144,0.04)",
              borderRadius: "0 4px 4px 0",
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: PRIMARY,
                lineHeight: 1.2,
              }}>
                "Sin carritos. Con personas."
              </p>
            </div>
          </Reveal>
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
                fontSize: "0.56rem",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: ACCENT,
                opacity: 0.75,
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
              fontSize: "0.56rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: ACCENT,
              opacity: 0.75,
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
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
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
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "0.4rem" }}>
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
                  href={MAPS_URL}
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
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.56rem", letterSpacing: "0.34em", textTransform: "uppercase", color: ACCENT, opacity: 0.75 }}>
                  · Seguinos ·
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: "var(--text)" }}>
                  Estamos en las redes
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem", fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.7 }}>
                  Novedades, productos y lo que pasa en el local — todo en Instagram.
                  Consultas por WhatsApp, rápido y sin vueltas.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
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
                  href={WA_CONSULTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.9rem 1.8rem",
                    background: "#25D366",
                    color: "#ffffff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1cb955")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
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
