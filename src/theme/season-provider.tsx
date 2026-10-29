import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import type { Season } from "../types";
import { createSiteTheme } from "./create-site-theme";
import { type FxMode, getSeason, SEASON_COPY, SEASON_LABEL, THEMES } from "./seasons";

type SeasonContextValue = {
  season: Season;
  /** `null` means "follow the calendar". Only the debug panel sets it. */
  override: Season | null;
  setOverride: (season: Season | null) => void;
  copy: (typeof SEASON_COPY)[Season];
  label: string;
  fxMode: FxMode;
  debugEnabled: boolean;
};

const SeasonContext = createContext<SeasonContextValue | null>(null);

function readFxMode(): FxMode {
  const value = import.meta.env.VITE_SEASONAL_FX;
  return value === "off" || value === "festive" ? value : "subtle";
}

/** The theme debug panel shows with `?debug` in the URL or VITE_SHOW_THEME_DEBUG=true. */
function readDebugEnabled() {
  if (import.meta.env.VITE_SHOW_THEME_DEBUG === "true") return true;
  if (typeof window === "undefined") return false;
  return /debug/i.test(window.location.search + window.location.hash);
}

function cssVarsFor(season: Season) {
  return Object.fromEntries(Object.entries(THEMES[season]).map(([key, v]) => [`--${key}`, v]));
}

export function SeasonProvider({ children, now }: { children: ReactNode; now?: Date }) {
  const [override, setOverride] = useState<Season | null>(null);
  const [debugEnabled] = useState(readDebugEnabled);
  const season = override ?? getSeason(now);
  const theme = useMemo(() => createSiteTheme(season), [season]);
  const value = useMemo<SeasonContextValue>(
    () => ({
      season,
      override,
      setOverride,
      copy: SEASON_COPY[season],
      label: SEASON_LABEL[season],
      fxMode: readFxMode(),
      debugEnabled,
    }),
    [season, override, debugEnabled],
  );
  return (
    <SeasonContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ ":root": cssVarsFor(season) }} />
        {children}
      </ThemeProvider>
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const value = useContext(SeasonContext);
  if (!value) throw new Error("useSeason must be used inside SeasonProvider");
  return value;
}
