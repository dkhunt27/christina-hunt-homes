import type { SxProps, Theme } from "@mui/material/styles";

/** Fixed (non-seasonal) colors from the design handoff. */
export const COLORS = {
  ink: "#23211E",
  inkHover: "#3A3632",
  body: "#5E5444",
  bodyStrong: "#4A4236",
  meta: "#7A6E5C",
  card: "#FFFDF8",
  paper: "#FBF8F1",
  cream: "#FBF6EC",
  creamMuted: "#F1E9DB",
  line: "#E8DFCC",
  lineStrong: "#E0D4BC",
  lineWarm: "#D9C9A8",
  lineDashed: "#D9CCB0",
  track: "#F1E8D6",
  stripeA: "#EFE5D0",
  stripeB: "#F6EFE0",
  mapStripeA: "#ECE6D6",
  mapStripeB: "#F3EEE2",
  placeholderText: "#8A7D66",
  chipHover: "#F7EBC6",
  linkHover: "#7C5A2A",
  underline: "#C9A64A",
  disabled: "#A39885",
  doneText: "#9C9284",
  fabSub: "#D8D2C6",
  signedIn: "#7FA06A",
  chalkboard: "#2F3430",
  chalkFrame: "#8B6A4A",
  wood: "#5B4330",
  footerText: "#EFE5D2",
  heart: "#B5482F",
  warning: "#9E3B2C",
  positive: "#4F7A3E",
} as const;

/** Seasonal colors, read from the CSS variables SeasonProvider writes to :root. */
export const SV = {
  bg: "var(--bg)",
  acc: "var(--acc)",
  accSoft: "var(--accSoft)",
  ink: "var(--ink)",
  panel: "var(--panel)",
  panelDeep: "var(--panelDeep)",
  gingC: "var(--gingC)",
  gingB: "var(--gingB)",
} as const;

export const FONTS = {
  serif: "'Young Serif', Georgia, serif",
  script: "'Caveat', cursive",
  sans: "'Figtree', system-ui, sans-serif",
  mono: "ui-monospace, Menlo, monospace",
} as const;

export const SHIPLAP =
  "repeating-linear-gradient(180deg, transparent 0 63px, rgba(110,90,60,.12) 63px 64px)";

export const STRIPES = `repeating-linear-gradient(135deg, ${COLORS.stripeA} 0 10px, ${COLORS.stripeB} 10px 20px)`;

/** Fills `minmax(min(100%, Npx), 1fr)` columns so grids reflow to one column on phones. */
export function autoGrid(minPx: number, mode: "fit" | "fill" = "fill") {
  return `repeat(auto-${mode}, minmax(min(100%, ${minPx}px), 1fr))`;
}

export function gingham(size = 10) {
  return {
    backgroundColor: SV.gingB,
    backgroundImage: `linear-gradient(90deg, ${SV.gingC} 50%, transparent 50%), linear-gradient(${SV.gingC} 50%, transparent 50%)`,
    backgroundSize: `${size}px ${size}px`,
  };
}

export const cardSx = {
  bgcolor: COLORS.card,
  border: `1px solid ${COLORS.line}`,
  borderRadius: "10px",
} satisfies SxProps<Theme>;

export const panelSx = {
  ...cardSx,
  borderRadius: "12px",
} satisfies SxProps<Theme>;

/** Seasonal dark panel (`var(--panel)`) with cream text. */
export const darkPanelSx = {
  bgcolor: SV.panel,
  color: COLORS.cream,
  borderRadius: "12px",
  transition: "background .4s",
} satisfies SxProps<Theme>;

export const statusTagSx = {
  display: "inline-block",
  bgcolor: COLORS.paper,
  border: `1px solid ${COLORS.ink}`,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  px: "9px",
  py: "5px",
  borderRadius: "3px",
  lineHeight: 1.2,
} satisfies SxProps<Theme>;

export const HOVER_LIFT = {
  transition: "transform .2s, box-shadow .2s",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 30px rgba(80,60,30,.12)" },
} satisfies SxProps<Theme>;

/** Side padding of every content column. */
export const GUTTER = 24;

/**
 * The design's widths (1200, 1400, 960, 1100) are content widths: the prototype pads
 * content-box columns. Our boxes are border-box, so add the gutters back.
 */
export function columnMaxWidth(contentWidth: number) {
  return contentWidth + GUTTER * 2;
}

/** Distance from the top of the viewport that sticky sidebars and the map sit at. */
export const STICKY_TOP = "110px";
