import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageBackground from '../components/PageBackground'
import GloboArgentina from '../components/illustrations/GloboArgentina'
import PickupEntrega from '../components/envios/PickupEntrega'
import PosnetPago from '../components/envios/PosnetPago'
import { WA_CONSULTA, DIRECCION, HORARIO, HORARIO_TEL, MAPS_URL } from '../config'

const PRIMARY = '#2d6490'
const ACCENT  = '#c8960c'
const WA      = '#25D366'

const STEPS = [
  {
    num: '01',
    titulo: 'Explorá el catálogo',
    desc: 'Navegá por las categorías y agregá los productos que te interesan a tu lista de consulta.',
  },
  {
    num: '02',
    titulo: 'Armá tu lista',
    desc: 'Usá el botón + en cada producto para agregar ítems. Podés ajustar cantidades antes de enviar.',
  },
  {
    num: '03',
    titulo: 'Consultá por WhatsApp',
    desc: `Con un clic enviás tu lista completa al ${HORARIO_TEL}. Te confirmamos disponibilidad y precio final.`,
  },
  {
    num: '04',
    titulo: 'Retirá en tienda',
    desc: `Coordinamos el retiro en ${DIRECCION}. ${HORARIO}.`,
  },
]

export default function EnviosPage() {
  const reduce                           = useReducedMotion()
  const [hovStep, setHovStep]           = useState<string | null>(null)
  const [hovCard, setHovCard]           = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', transition: 'background 0.3s ease' }}>
      <PageBackground />
      <Navbar />

      {/* Atmospheric gradient */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '40vh',
        background: `radial-gradient(ellipse 60% 40% at 50% -10%, rgba(45,100,144,0.08) 0%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '58px' }}>
        {/* ── Hero ───────────────────────────────────────── */}
        <header style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '5rem 2.5rem 4rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            letterSpacing: '0.34em',
            color: ACCENT,
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            · Cómo pedimos ·
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>
            Sin carritos.<br />
            <em style={{ color: ACCENT, fontStyle: 'italic' }}>Con personas.</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 auto',
          }}>
            No tenemos e-commerce automático porque preferimos atenderte bien.
            Confirmamos stock en tiempo real y respondemos cada consulta de forma personalizada.
          </p>
        </header>

        {/* ── Steps ──────────────────────────────────────── */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-5"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 2.5rem 5rem',
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.num}
              onMouseEnter={() => setHovStep(s.num)}
              onMouseLeave={() => setHovStep(null)}
              style={{
                padding: '2.5rem 2rem',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: reduce ? 'none' : 'background 0.3s, border-color 0.22s, box-shadow 250ms ease-out',
                borderColor: hovStep === s.num ? `${ACCENT}55` : 'var(--border)',
                boxShadow: hovStep === s.num
                  ? '0 10px 30px -10px rgba(200,150,12,0.35), 0 0 0 1px rgba(200,150,12,0.30)'
                  : 'none',
                cursor: 'default',
              }}
            >
              <motion.span
                animate={{
                  opacity: hovStep === s.num ? 1 : 0.35,
                  scale:   hovStep === s.num ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.8rem',
                  fontWeight: 700,
                  color: ACCENT,
                  lineHeight: 1,
                  userSelect: 'none',
                  display: 'inline-block',
                  transformOrigin: 'left center',
                }}
              >
                {s.num}
              </motion.span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}>
                {s.titulo}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </section>

        {/* ── Info panels ────────────────────────────────── */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2.5rem 5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>

          {/* Retiro en tienda */}
          <motion.article
            initial={reduce ? undefined : 'rest'}
            whileInView={reduce ? undefined : 'play'}
            whileHover={reduce ? undefined : 'play'}
            viewport={{ once: true, amount: 0.5 }}
            onMouseEnter={() => setHovCard('retiro')}
            onMouseLeave={() => setHovCard(null)}
            style={{
              padding: '2rem',
              border: hovCard === 'retiro' ? '1px solid rgba(45,100,144,0.18)' : '1px solid var(--border)',
              background: hovCard === 'retiro' ? 'rgba(45,100,144,0.04)' : 'var(--surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              transition: reduce ? 'none' : 'background-color 0.2s ease-out, border-color 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', height: 180, alignItems: 'center' }}>
              <GloboArgentina />
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: PRIMARY,
            }}>
              Retiro en tienda
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}>
              {DIRECCION}<br />
              Buenos Aires
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
            }}>
              {HORARIO}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '0.5rem',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: PRIMARY,
                textDecoration: 'none',
                borderBottom: `1px solid rgba(45,100,144,0.3)`,
                paddingBottom: '1px',
                alignSelf: 'flex-start',
              }}
            >
              Ver en Google Maps →
            </a>
          </motion.article>

          {/* Zona de entrega */}
          <motion.article
            initial={reduce ? undefined : 'rest'}
            whileInView={reduce ? undefined : 'play'}
            whileHover={reduce ? undefined : 'play'}
            viewport={{ once: true, amount: 0.5 }}
            onMouseEnter={() => setHovCard('entrega')}
            onMouseLeave={() => setHovCard(null)}
            style={{
              padding: '2rem',
              border: hovCard === 'entrega' ? '1px solid rgba(45,100,144,0.18)' : '1px solid var(--border)',
              background: hovCard === 'entrega' ? 'rgba(45,100,144,0.04)' : 'var(--surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              transition: reduce ? 'none' : 'background-color 0.2s ease-out, border-color 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', height: 180, alignItems: 'center' }}>
              <PickupEntrega />
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text)',
            }}>
              Entregas a domicilio
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}>
              Realizamos entregas en Quilmes y alrededores.
              Consultá disponibilidad y costo de envío por WhatsApp.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--text-dim)',
              marginTop: '0.25rem',
            }}>
              * Sujeto a disponibilidad de zona
            </p>
          </motion.article>

          {/* Pago */}
          <motion.article
            initial={reduce ? undefined : 'rest'}
            whileInView={reduce ? undefined : 'play'}
            whileHover={reduce ? undefined : 'play'}
            viewport={{ once: true, amount: 0.5 }}
            onMouseEnter={() => setHovCard('pago')}
            onMouseLeave={() => setHovCard(null)}
            style={{
              padding: '2rem',
              border: hovCard === 'pago' ? '1px solid rgba(45,100,144,0.18)' : '1px solid var(--border)',
              background: hovCard === 'pago' ? 'rgba(45,100,144,0.04)' : 'var(--surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              transition: reduce ? 'none' : 'background-color 0.2s ease-out, border-color 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', height: 180, alignItems: 'center' }}>
              <PosnetPago />
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text)',
            }}>
              Formas de pago
            </h3>
            <ul style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              listStyle: 'none',
              padding: 0,
            }}>
              {['Efectivo', 'Transferencia bancaria', 'Mercado Pago', 'Débito y crédito'].map(m => (
                <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: ACCENT, fontSize: '0.5rem' }}>◆</span>
                  {m}
                </li>
              ))}
            </ul>
          </motion.article>
        </section>

        {/* ── CTA WhatsApp ───────────────────────────────── */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2.5rem 7rem',
          textAlign: 'center',
        }}>
          <div style={{
            padding: '5rem 2.5rem',
            border: `1px solid rgba(45,100,144,0.18)`,
            background: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(45,100,144,0.05) 0%, transparent 70%)`,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.3em',
              color: ACCENT,
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              ¿Tenés alguna duda?
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.9rem',
            }}>
              Escribinos directo
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
            }}>
              Respondemos en minutos de lunes a sábado.
            </p>
            <a
              href={WA_CONSULTA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '1rem 2.5rem',
                background: WA,
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>{HORARIO_TEL}</span>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
