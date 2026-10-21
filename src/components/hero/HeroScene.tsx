import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import {
  Pencil, Pen, GraduationCap, Scissors, PaintBrush, Palette,
  Notebook, Eraser, Stamp, Paperclip, Calculator, Books,
  Laptop, Backpack, WhatsappLogo,
} from "@phosphor-icons/react";
import { WA_PRODUCTOS } from "../../config";

type PhIcon = Icon;

const ICONS: PhIcon[] = [
  Pencil, Pen, GraduationCap, Scissors, PaintBrush, Palette,
  Notebook, Eraser, Stamp, Paperclip, Calculator, Books,
  Laptop, Backpack,
];

const EYEBROW_LINES = [
  "Papelería · Librería · Regalería",
  "Escolar · Comercial · Artística",
  "Técnica · Computación",
];

const BG_COUNT = 12;

function rand(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function generatePositions(count: number): Array<{ left: number; top: number }> {
  const CX: [number, number] = [30, 70];
  const CY: [number, number] = [20, 80];
  const MIN_DIST = 18;
  const placed: Array<{ left: number; top: number }> = [];

  for (let i = 0; i < count; i++) {
    let best = { left: rand(4, 92), top: rand(4, 92) };
    for (let attempt = 0; attempt < 80; attempt++) {
      const l = rand(4, 92);
      const t = rand(4, 92);
      const inCenter = l > CX[0] && l < CX[1] && t > CY[0] && t < CY[1];
      if (inCenter) continue;
      const tooClose = placed.some(p => {
        const dx = l - p.left;
        const dy = (t - p.top) * 0.56;
        return Math.sqrt(dx * dx + dy * dy) < MIN_DIST;
      });
      if (!tooClose) {
        best = { left: l, top: t };
        break;
      }
    }
    placed.push(best);
  }

  return placed;
}

interface BgItem {
  id: number;
  Icon: PhIcon;
  left: number;
  top: number;
  rotation: number;
  size: number;
  delay: number;
  fadeDuration: number;
  holdDuration: number;
  repeatDelay: number;
  peakOpacity: number;
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
  const navigate = useNavigate();
  const reduce   = useReducedMotion();
  const [eyeIdx, setEyeIdx] = useState(0);
  const [catalogHover, setCatalogHover] = useState(false);
  const [waHover, setWaHover] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setEyeIdx(i => (i + 1) % EYEBROW_LINES.length), 2800);
    return () => clearInterval(t);
  }, [reduce]);

  const bgItems = useMemo<BgItem[]>(() => {
    const positions = generatePositions(BG_COUNT);
    return positions.map((pos, i) => ({
      id: i,
      Icon: ICONS[i % ICONS.length],
      left: pos.left,
      top: pos.top,
      rotation: rand(-55, 55),
      size: Math.round(rand(72, 120)),
      delay: rand(0, 8),
      fadeDuration: rand(1.5, 2.6),
      holdDuration: rand(2.5, 5.5),
      repeatDelay: rand(3.0, 8.0),
      peakOpacity: rand(0.22, 0.40),
    }));
  }, []);

  return (
    <section
      style={{
        background: "#f2ecdf",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Line-art útiles — periferia */}
      {bgItems.map(item => {
        const total = item.fadeDuration * 2 + item.holdDuration;
        const t1 = item.fadeDuration / total;
        const t2 = (item.fadeDuration + item.holdDuration) / total;

        return (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: `${item.left}%`,
              top: `${item.top}%`,
              transform: `rotate(${item.rotation}deg)`,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {reduce ? (
              <div style={{ opacity: 0.13 }}>
                <item.Icon size={item.size} weight="thin" color="#111" />
              </div>
            ) : (
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{
                  clipPath: [
                    "inset(0 100% 0 0)",
                    "inset(0 0% 0 0)",
                    "inset(0 0% 0 0)",
                    "inset(0 0% 0 0)",
                  ],
                  opacity: [0, item.peakOpacity, item.peakOpacity, 0],
                }}
                transition={{
                  duration: total,
                  delay: item.delay,
                  repeat: Infinity,
                  repeatDelay: item.repeatDelay,
                  times: [0, t1, t2, 1],
                  ease: "easeInOut",
                }}
              >
                <item.Icon size={item.size} weight="thin" color="#111" />
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Contenido central */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 2rem",
          textAlign: "center",
        }}
      >
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 200, damping: 18 }}
          style={{ marginBottom: "2.25rem" }}
        >
          <HeroBadge />
        </motion.div>

        {/* Cycling eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          style={{ marginBottom: "1.1rem", height: "1.4em", overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={eyeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.38em",
                color: "#2d6490",
              }}
            >
              {EYEBROW_LINES[eyeIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.85 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            margin: "0 auto",
            maxWidth: "672px",
            fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
            lineHeight: 1.65,
            color: "#5a8ab0",
          }}
        >
          <span style={{ display: "block" }}>Todo lo que necesitás para escribir, estudiar y crear</span>
          <span style={{ display: "block" }}>en un solo lugar de confianza</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.85 }}
          style={{
            marginTop: "2.25rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.85rem",
          }}
        >
          <button
            onClick={() => navigate("/catalogo")}
            onMouseEnter={() => setCatalogHover(true)}
            onMouseLeave={() => setCatalogHover(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "9999px",
              padding: "0.9rem 2.2rem",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: catalogHover ? "#1a3a50" : "#2d6490",
              border: "none",
              cursor: "pointer",
              transition: reduce ? "none" : "background-color 0.2s ease-out",
            }}
          >
            Ver catálogo
          </button>

          <button
            onClick={() => window.open(WA_PRODUCTOS, "_blank", "noopener,noreferrer")}
            onMouseEnter={() => setWaHover(true)}
            onMouseLeave={() => setWaHover(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "9999px",
              padding: "0.9rem 2.2rem",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: waHover ? "#ffffff" : "#1a3a50",
              backgroundColor: waHover ? "#2d6490" : "transparent",
              border: "1.5px solid #2d6490",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              transition: reduce ? "none" : "background-color 0.2s ease-out, color 0.2s ease-out",
            }}
          >
            <WhatsappLogo size={28} weight="fill" color="#25d366" />
            Consultar por WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}
