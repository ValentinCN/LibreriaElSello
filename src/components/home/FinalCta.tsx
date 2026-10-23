import { WhatsappLogo } from "@phosphor-icons/react"
import Reveal from "../Reveal"
import { DIRECCION, HORARIO, WA_LISTA_COLEGIO } from "../../config"

/* Banda final antes del footer. Solo tokens: fondo --color-primary, botón
   --color-gold con texto --color-text (≈4.7:1; blanco sobre dorado no da AA). */
export default function FinalCta() {
  return (
    <>
      <div style={{ height: "4px", background: "var(--color-gold)" }} />
      <section
        style={{
          background: "var(--color-primary)",
          paddingBlock: "clamp(3.5rem, 8vw, 6rem)",
          paddingInline: "clamp(1rem, 4vw, 2rem)",
        }}
      >
        <Reveal>
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  textWrap: "balance",
                }}
              >
                ¿Tenés la lista del colegio?
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                }}
              >
                Mandala por WhatsApp y te la tenemos lista.
              </p>
            </div>

            <a
              href={WA_LISTA_COLEGIO}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-text transition-colors hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                minHeight: 48,
                padding: "0.85rem 2rem",
                borderRadius: "9999px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
              Mandar la lista por WhatsApp
            </a>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {DIRECCION} · {HORARIO}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
