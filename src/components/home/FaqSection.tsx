import { CaretDown, WhatsappLogo } from "@phosphor-icons/react"
import Reveal from "../Reveal"
import { FAQ } from "../../constants/faq"
import { waLink } from "../../config"

/* <details>/<summary> nativos: abren y cierran con mouse, Enter y Espacio
   sin JS. El caret rota vía CSS (.faq-item[open] en index.css). */
export default function FaqSection() {
  return (
    <section
      aria-labelledby="faq-titulo"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        paddingBlock: "clamp(3.5rem, 7vw, 5.5rem)",
        paddingInline: "clamp(1rem, 4vw, 2rem)",
      }}
    >
      <Reveal style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <h2
          id="faq-titulo"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          Preguntas frecuentes
        </h2>
      </Reveal>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {FAQ.map(({ pregunta, respuesta, waTexto }) => (
          <details key={pregunta} className="faq-item" style={{ borderBottom: "1px solid var(--border)" }}>
            <summary
              className="faq-summary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                minHeight: 44,
                paddingBlock: "1.1rem",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.02rem",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 1.4,
              }}
            >
              {pregunta}
              <CaretDown className="faq-caret" size={20} weight="bold" color="var(--color-primary)" aria-hidden="true" style={{ flexShrink: 0 }} />
            </summary>

            <div style={{ paddingBottom: "1.25rem", paddingRight: "2.25rem" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                }}
              >
                {respuesta}
              </p>

              {waTexto && (
                <a
                  href={waLink(waTexto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text transition-colors hover:bg-primary hover:text-white motion-reduce:transition-none"
                  style={{
                    marginTop: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minHeight: 44,
                    padding: "0.6rem 1.4rem",
                    borderRadius: "9999px",
                    border: "1.5px solid var(--color-primary)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <WhatsappLogo size={22} weight="fill" color="var(--color-whatsapp)" aria-hidden="true" />
                  Mandar la lista del colegio
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
