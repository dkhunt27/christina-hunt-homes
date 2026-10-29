import type { Season } from "../types";

export type SeasonTheme = {
  bg: string;
  acc: string;
  accSoft: string;
  /** Script/eyebrow color. Not the body ink, which is fixed (`COLORS.ink`). */
  ink: string;
  panel: string;
  panelDeep: string;
  gingC: string;
  gingB: string;
};

/** Written to `:root` as `--bg`, `--acc`, … by SeasonProvider. */
export const THEMES: Record<Season, SeasonTheme> = {
  fall: {
    bg: "#F3ECDF",
    acc: "#E3A857",
    accSoft: "#F4E0C2",
    ink: "#8A4B2E",
    panel: "#7A4A2E",
    panelDeep: "#643C24",
    gingC: "rgba(196,98,45,.45)",
    gingB: "#FBF8F1",
  },
  winter: {
    bg: "#F1F0EC",
    acc: "#B9CCD8",
    accSoft: "#E1E9EE",
    ink: "#8E2F25",
    panel: "#2F4B3C",
    panelDeep: "#233A2E",
    gingC: "rgba(35,33,30,.6)",
    gingB: "#A8392B",
  },
  spring: {
    bg: "#F5F2EA",
    acc: "#E8B7C0",
    accSoft: "#F5E3E6",
    ink: "#7E4556",
    panel: "#566E51",
    panelDeep: "#455A41",
    gingC: "rgba(124,150,111,.5)",
    gingB: "#FBF8F1",
  },
  summer: {
    bg: "#F6F1E4",
    acc: "#F2D27A",
    accSoft: "#F7EBC6",
    ink: "#7C5A2A",
    panel: "#3F5F7A",
    panelDeep: "#324D63",
    gingC: "rgba(63,95,122,.42)",
    gingB: "#FBF8F1",
  },
};

export const SEASON_COPY: Record<Season, { eyebrow: string; banner: string; porch: string }> = {
  fall: {
    eyebrow: "Cider-season house hunting",
    banner: "Fall in Southeast Michigan: the cider mills are open and the leaves are turning.",
    porch: "photo · porch with mums & pumpkins",
  },
  winter: {
    eyebrow: "Cozy-season house hunting",
    banner: "Winter tip: homes listed now often see less competition.",
    porch: "photo · snowy porch with a wreath",
  },
  spring: {
    eyebrow: "The spring market is blooming",
    banner: "Spring is the busiest season. Save a search so you hear about homes first.",
    porch: "photo · porch with tulips & a fresh doormat",
  },
  summer: {
    eyebrow: "Front-porch season",
    banner: "Summer in Southeast Michigan: lake homes, art fairs, and Dream Cruise weekends.",
    porch: "photo · porch swing & lemonade",
  },
};

export const SEASON_LABEL: Record<Season, string> = {
  fall: "Fall",
  winter: "Winter",
  spring: "Spring",
  summer: "Summer",
};

/** Order of the Kitchen season tabs. */
export const SEASON_ORDER: Season[] = ["fall", "winter", "spring", "summer"];

/** Order of the debug panel buttons. */
export const DEBUG_SEASON_ORDER: Season[] = ["spring", "summer", "fall", "winter"];

export type FxConfig = {
  colors: string[];
  radius: string;
  size: [number, number];
  dur: [number, number];
  ring?: boolean;
};

export const FX: Record<Season, FxConfig> = {
  fall: {
    colors: ["#C4622D", "#E3A857", "#9E3B2C", "#B5832F"],
    radius: "0 100% 0 100%",
    size: [12, 20],
    dur: [11, 17],
  },
  winter: { colors: ["#FFFFFF"], radius: "50%", size: [5, 11], dur: [14, 22], ring: true },
  spring: {
    colors: ["#F2C4CC", "#E8B7C0", "#F7D6DC"],
    radius: "60% 0 60% 0",
    size: [9, 14],
    dur: [13, 19],
  },
  summer: {
    colors: ["#F2D27A", "#E9C25A", "#F0DB98"],
    radius: "60% 0 60% 0",
    size: [8, 13],
    dur: [14, 20],
  },
};

export type FxMode = "off" | "subtle" | "festive";

/** Dec–Feb winter, Mar–May spring, Jun–Aug summer, Sep–Nov fall. */
export function getSeason(date = new Date()): Season {
  const month = date.getMonth();
  if (month === 11 || month < 2) return "winter";
  if (month < 5) return "spring";
  if (month < 8) return "summer";
  return "fall";
}
