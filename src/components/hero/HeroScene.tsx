import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import {
  Pencil, Pen, GraduationCap, Scissors, PaintBrush, Palette,
  Notebook, Eraser, Stamp, Paperclip, Calculator, Books,
  Backpack, WhatsappLogo,
} from "@phosphor-icons/react";
import { WA_LISTA_COLEGIO } from "../../config";

/* ── Dibujos decorativos: posiciones FIJAS por breakpoint ──────────────
   Nada de Math.random: mismo acomodo en cada visita. La visibilidad por
   breakpoint la resuelve CSS (md:hidden / hidden md:block), no JS.
   - Mobile (< 768px): 4 íconos ≤ 64px en las esquinas, dentro del
     padding-block del hero (nunca sobre el texto ni los botones).
   - Desktop (≥ 768px): 10 íconos en los costados (0–22% y 78–100% del
     ancho); el bloque de texto está limitado a min(40rem, 54%) al centro.
   - nearButtons: los que quedan a la altura de los botones. Entre 768 y
     1030px la fila de botones es más ancha que la columna y los pisa,
     así que esos aparecen recién desde 1031px. */

interface Deco {
  Icon: Icon;
  size: number;
  rotate: number;
  pos: CSSProperties;
  delay: number;
  peak: number;
  nearButtons?: boolean;
}

const DECO_MOBILE: Deco[] = [
  { Icon: Pencil,    size: 48, rotate: -24, pos: { top: "2%",    left: "3%"  }, delay: 0.4, peak: 0.30 },
  { Icon: Scissors,  size: 44, rotate: 18,  pos: { top: "2%",    right: "3%" }, delay: 2.2, peak: 0.30 },
  { Icon: Palette,   size: 48, rotate: 12,  pos: { bottom: "2%", left: "4%"  }, delay: 3.6, peak: 0.30 },
  { Icon: Notebook,  size: 44, rotate: -14, pos: { bottom: "2%", right: "4%" }, delay: 1.4, peak: 0.30 },
];

const DECO_DESKTOP: Deco[] = [
  // Costado izquierdo (left ≤ 12% + tamaño ≤ 96px → no pasa del 22% ni a 768px)
  { Icon: Pencil,        size: 88, rotate: -28, pos: { top: "4%",     left: "4%"  }, delay: 0.2, peak: 0.30 },
  { Icon: GraduationCap, size: 80, rotate: -12, pos: { top: "24%",    left: "11%" }, delay: 2.6, peak: 0.30 },
  { Icon: PaintBrush,    size: 96, rotate: 34,  pos: { top: "44%",    left: "3%"  }, delay: 4.8, peak: 0.30 },
  { Icon: Calculator,    size: 72, rotate: 10,  pos: { top: "64%",    left: "12%" }, delay: 1.2, peak: 0.30, nearButtons: true },
  { Icon: Eraser,        size: 80, rotate: -40, pos: { bottom: "4%",  left: "3%"  }, delay: 3.4, peak: 0.30, nearButtons: true },
  // Costado derecho
  { Icon: Pen,           size: 88, rotate: 30,  pos: { top: "4%",     right: "5%"  }, delay: 1.8, peak: 0.30 },
  { Icon: Stamp,         size: 76, rotate: -8,  pos: { top: "24%",    right: "12%" }, delay: 4.0, peak: 0.30 },
  { Icon: Books,         size: 96, rotate: 14,  pos: { top: "44%",    right: "3%"  }, delay: 0.8, peak: 0.30 },
  { Icon: Paperclip,     size: 72, rotate: -36, pos: { top: "64%",    right: "12%" }, delay: 3.0, peak: 0.30, nearButtons: true },
  { Icon: Backpack,      size: 80, rotate: 8,   pos: { bottom: "4%",  right: "4%"  }, delay: 5.4, peak: 0.30, nearButtons: true },
];

// Ciclo del fundido (fade in → quieto → fade out → pausa). Solo opacity:
// el ícono siempre se ve entero, sin barridos que dejen fragmentos.
const FADE = 2;
const HOLD = 4;
const PAUSE = 5;
const TOTAL = FADE * 2 + HOLD;

function DecoIcon({ item, reduce, className }: { item: Deco; reduce: boolean; className: string }) {
  return (
    <div
      className={className}
      style={{ position: "absolute", ...item.pos, transform: `rotate(${item.rotate}deg)` }}
    >
      {reduce ? (
        <div style={{ opacity: 0.13 }}>
          <item.Icon size={item.size} weight="thin" style={{ color: "var(--color-text)" }} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, item.peak, item.peak, 0] }}
          transition={{
            duration: TOTAL,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: PAUSE,
            times: [0, FADE / TOTAL, (FADE + HOLD) / TOTAL, 1],
            ease: "easeInOut",
          }}
        >
          <item.Icon size={item.size} weight="thin" style={{ color: "var(--color-text)" }} />
        </motion.div>
      )}
    </div>
  );
}

export function HeroBadge() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.07, rotate: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      style={{ display: "inline-block", cursor: "default" }}
    >
      <svg width="192" height="192" viewBox="0 0 128 128" fill="none" aria-hidden="true">
        <circle cx="64" cy="64" r="62" fill="#2d6490" />
        <circle cx="64" cy="64" r="58" stroke="#c8960c" strokeWidth="0.9" opacity="0.6" />
        <text x="64" y="40" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5" fontFamily="'DM Sans',sans-serif" letterSpacing="2.5">LIBRERÍA</text>
        <text x="64" y="77" textAnchor="middle" fill="#c8960c" fontSize="29" fontFamily="'Playfair Display',serif" fontWeight="600" fontStyle="italic">el Sello</text>
        <line x1="36" y1="85" x2="92" y2="85" stroke="#c8960c" strokeWidth="0.7" opacity="0.45" />
        <text x="64" y="101" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="'DM Sans',sans-serif" letterSpacing="3">QUILMES</text>
      </svg>
    </motion.div>
  )
}

export function HeroScene() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      style={{
        background: "var(--color-bg)",
        marginTop: "58px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Capa decorativa: fuera del árbol de accesibilidad y sin capturar clics */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none" }}>
        {DECO_MOBILE.map((item, i) => (
          <DecoIcon key={`m-${i}`} item={item} reduce={reduce} className="md:hidden" />
        ))}
        {DECO_DESKTOP.map((item, i) => (
          <DecoIcon key={`d-${i}`} item={item} reduce={reduce} className={item.nearButtons ? "hidden min-[1031px]:block" : "hidden md:block"} />
        ))}
      </div>

      {/* Contenido: el alto lo define el contenido + padding-block.
          Visible desde el primer frame (sin opacity 0 ni delays) por el LCP. */}
      <div
        className="mx-auto md:max-w-[min(40rem,54%)]"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock: "clamp(4.5rem, 8vw, 6rem)",
          paddingInline: "clamp(1rem, 4vw, 2rem)",
          textAlign: "center",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          Librería en Quilmes Centro
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.1rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "var(--color-text)",
            textWrap: "balance",
            marginBottom: "1.1rem",
          }}
        >
          {/* Dos bloques sin corte interno: el balance no puede bajar la "y" */}
          <span style={{ whiteSpace: "nowrap" }}>Armá tu lista y</span>{" "}
          <span style={{ whiteSpace: "nowrap" }}>te la preparamos</span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: "36rem",
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            lineHeight: 1.65,
            color: "var(--color-primary)",
            textWrap: "balance",
          }}
        >
          Útiles escolares, papelería y artículos de arte. Mandanos tu lista por WhatsApp: sin carritos, con personas.
        </p>

        {/* < 640px: apilados y del mismo ancho. ≥ 640px: en fila, sin wrap.
            w-max: entre 768 y ~1030 la columna es más angosta que la fila (~493px);
            el padre centra, así que la fila desborda parejo hacia ambos lados. */}
        <div
          className="flex w-full flex-col items-center sm:w-max sm:flex-row"
          style={{
            marginTop: "clamp(1.5rem, 3vw, 2rem)",
            gap: "0.85rem",
          }}
        >
          <Link
            to="/catalogo"
            className="btn btn-primary btn-lg w-full max-w-[320px] sm:w-auto sm:max-w-none"
          >
            Ver catálogo
          </Link>

          <a
            href={WA_LISTA_COLEGIO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg w-full max-w-[320px] sm:w-auto sm:max-w-none"
          >
            <WhatsappLogo size={26} weight="fill" color="var(--color-whatsapp)" aria-hidden="true" />
            Mandar la lista del colegio
          </a>
        </div>
      </div>
    </section>
  );
}
