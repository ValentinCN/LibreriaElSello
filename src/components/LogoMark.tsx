const PRIMARY = '#2d6490';
const ACCENT  = '#c8960c';

interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 44 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <circle cx="22" cy="22" r="21" fill={PRIMARY} />
      <circle cx="22" cy="22" r="20" stroke={ACCENT} strokeWidth="0.65" />
      <text
        x="22" y="10.5"
        textAnchor="middle"
        fill="rgba(255,255,255,0.48)"
        fontSize="4.2"
        fontFamily="'DM Sans', sans-serif"
        letterSpacing="0.8"
      >
        LIBRERÍA
      </text>
      <text
        x="22" y="27"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="19"
        fontFamily="'Dancing Script', cursive"
        fontWeight="700"
      >
        eS
      </text>
      <line x1="13" y1="30.5" x2="31" y2="30.5" stroke={ACCENT} strokeWidth="0.4" opacity="0.55" />
      <text
        x="22" y="37.5"
        textAnchor="middle"
        fill="rgba(255,255,255,0.38)"
        fontSize="4"
        fontFamily="'DM Sans', sans-serif"
        letterSpacing="1"
      >
        EL SELLO
      </text>
    </svg>
  );
}
