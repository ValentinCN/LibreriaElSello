import { Star } from "@phosphor-icons/react"
import Reveal from "../Reveal"
import { REVIEWS, GOOGLE_RATING, GOOGLE_REVIEWS } from "../../constants/reviews"
import { GOOGLE_MAPS_URL } from "../../config"

// "4,7" y "más de 260": se redondea para abajo, así el título no queda viejo
// apenas entra una reseña nueva.
const RATING_TXT  = GOOGLE_RATING.toLocaleString("es-AR", { minimumFractionDigits: 1 })
const REVIEWS_TXT = Math.floor(GOOGLE_REVIEWS / 10) * 10

/* Estrellas en --color-gold-text: --color-gold no llega a 3:1 ni sobre el
   fondo ni sobre la tarjeta blanca. Son decorativas; el puntaje va en texto. */
function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: "0.15rem" }}>
      <span className="sr-only">{n} de 5 estrellas</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          weight={i < n ? "fill" : "regular"}
          color="var(--color-gold-text)"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section
      aria-labelledby="reviews-titulo"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        paddingBlock: "clamp(3.5rem, 7vw, 5.5rem)",
        paddingInline: "clamp(1rem, 4vw, 2rem)",
      }}
    >
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
          · Lo que dicen nuestros clientes ·
        </p>
        <h2
          id="reviews-titulo"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          {RATING_TXT} en Google · más de {REVIEWS_TXT} reseñas
        </h2>
      </Reveal>

      {/* Grid: las tarjetas de una misma fila se estiran a la misma altura */}
      <div className="grid grid-cols-1 gap-[1.1rem] md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.autor} delay={0.06 + i * 0.07} style={{ height: "100%" }}>
            <figure className="card" style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
              padding: "1.6rem 1.75rem",
            }}>
              <Stars n={r.estrellas} />
              <blockquote style={{
                flex: 1,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "var(--color-text)",
              }}>
                {r.texto}
              </blockquote>
              <figcaption style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--color-primary)",
              }}>
                {r.autor}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.25rem" }}>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  )
}
