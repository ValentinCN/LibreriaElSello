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
   una sola fila desde md. Reemplaza a la vieja "franja de confianza". */
export default function AttributeStrip() {
  return (
    <section
      aria-label="Cómo te atendemos"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: "clamp(1.25rem, 3vw, 1.75rem)",
        paddingInline: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      <ul
        className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-6"
        style={{ maxWidth: "1100px", margin: "0 auto", listStyle: "none" }}
      >
        {ATRIBUTOS.map(({ Icon, texto }) => (
          <li
            key={texto}
            className="flex min-w-0 flex-col items-center gap-2 text-center lg:flex-row lg:justify-center lg:gap-3 lg:text-left"
          >
            <span
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: "9999px",
                background: "rgba(45,100,144,0.08)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={22} weight="duotone" color="var(--color-primary)" />
            </span>
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
