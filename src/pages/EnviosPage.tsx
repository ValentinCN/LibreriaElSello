import { motion, useReducedMotion } from 'motion/react'
import { WhatsappLogo } from '@phosphor-icons/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GloboArgentina from '../components/illustrations/GloboArgentina'
import PickupEntrega from '../components/envios/PickupEntrega'
import PosnetPago from '../components/envios/PosnetPago'
import { WA_CONSULTA, DIRECCION, HORARIO, HORARIO_TEL, MAPS_URL, ENVIOS_ZONA } from '../config'

const PRIMARY = '#2d6490'
const ACCENT  = '#c8960c'

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

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', transition: 'background 0.3s ease' }}>
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
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
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
            <em style={{ color: 'var(--color-gold-text)', fontStyle: 'italic' }}>Con personas.</em>
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
            Te confirmamos el stock y el precio final por WhatsApp, y respondemos cada consulta de forma personalizada.
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
              className="card"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.8rem',
                fontWeight: 700,
                color: 'var(--color-gold-text)',
                lineHeight: 1,
                userSelect: 'none',
                display: 'inline-block',
              }}>
                {s.num}
              </span>
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
            className="card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
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
              color: 'var(--text-muted)',
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
                fontSize: '0.75rem',
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
            className="card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
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
              Realizamos entregas en {ENVIOS_ZONA}.
              Consultá disponibilidad y costo de envío por WhatsApp.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
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
            className="card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
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
          <div className="card" style={{ padding: '5rem 2.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>
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
              Te respondemos por WhatsApp de lunes a sábado.
            </p>
            <a
              href={WA_CONSULTA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <WhatsappLogo size={22} weight="fill" aria-hidden="true" style={{ color: 'var(--color-whatsapp)' }} />
              <span>{HORARIO_TEL}</span>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
