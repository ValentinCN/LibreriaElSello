import type { Icon } from "@phosphor-icons/react"
import { WhatsappLogo, MapPin, Clock, Truck } from "@phosphor-icons/react"
import { DIRECCION, HORARIO, ENVIOS_ZONA } from "../../config"

// Cada dato sale de config.ts (mismos valores que footer y EnviosPage).
const ATRIBUTOS: { Icon: Icon; texto: string }[] = [
  { Icon: WhatsappLogo, texto: "Atención por WhatsApp" },
  { Icon: MapPin,       texto: `Retirá en ${DIRECCION}` },
  { Icon: Clock,        texto: HORARIO },
  { Icon: Truck,        texto: `Envíos a ${ENVIOS_ZONA}` },
]

/* Cinta de atributos debajo del hero. 2×2 en mobile (sin scroll horizontal),
   desde md 4 columnas iguales con separadores verticales de 1px.
   Reemplaza a la vieja "franja de confianza". */
export default function AttributeStrip() {
  return (
    <section
      aria-label="Cómo te atendemos"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: "clamp(1.25rem, 3vw, 1.75rem)",
        paddingInline: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      <ul
        className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-0"
        style={{ maxWidth: "1100px", margin: "0 auto", listStyle: "none" }}
      >
        {ATRIBUTOS.map(({ Icon, texto }) => (
          <li
            key={texto}
            className="flex min-w-0 flex-col items-center gap-2 text-center md:px-4 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[color:var(--border)] lg:flex-row lg:justify-center lg:gap-3 lg:text-left"
          >
            <Icon size={24} weight="regular" aria-hidden="true" style={{ color: "var(--color-primary)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                lineHeight: 1.35,
                color: "var(--color-text)",
                overflowWrap: "anywhere",
              }}
            >
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
