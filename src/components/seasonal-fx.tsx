import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useSeason } from "../theme/season-provider";
import { FX } from "../theme/seasons";

/** Deterministic pseudo-random 0–1, so particles land in the same spots every render. */
export function fxRandom(i: number, k: number) {
  const v = Math.sin((i + 1) * (k + 1) * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

type SeasonalFxProps = {
  /**
   * subtle: 14 particles behind the home hero (parent needs `isolation: isolate`).
   * festive: 26 particles over the whole page.
   */
  variant: "subtle" | "festive";
};

/** Falling leaves, snow or petals. Hidden under prefers-reduced-motion (see the theme). */
export function SeasonalFx({ variant }: SeasonalFxProps) {
  const { season } = useSeason();
  const fixed = variant === "festive";
  const count = fixed ? 26 : 14;
  const particles = useMemo(() => {
    const f = FX[season];
    return Array.from({ length: count }, (_, i) => {
      const size = f.size[0] + fxRandom(i, 1) * (f.size[1] - f.size[0]);
      const dur = f.dur[0] + fxRandom(i, 2) * (f.dur[1] - f.dur[0]);
      return {
        left: `${fxRandom(i, 3) * 100}%`,
        fall: `chFall ${dur.toFixed(1)}s linear ${(-fxRandom(i, 4) * dur).toFixed(1)}s infinite`,
        sway: `chSway ${(3 + fxRandom(i, 6) * 3).toFixed(1)}s ease-in-out ${(-fxRandom(i, 7) * 3).toFixed(1)}s infinite`,
        width: size,
        height: f.ring ? size : size * 0.75,
        radius: f.radius,
        color: f.colors[i % f.colors.length],
        opacity: (fixed ? 0.45 : 0.6) + fxRandom(i, 5) * 0.3,
        ring: !!f.ring,
      };
    });
  }, [season, count, fixed]);

  return (
    <Box
      data-fx=""
      aria-hidden
      sx={{
        position: fixed ? "fixed" : "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: fixed ? 25 : -1,
      }}
    >
      {particles.map((p, i) => (
        <Box
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative list
          key={i}
          component="span"
          sx={{ position: "absolute", left: p.left, top: -30, animation: p.fall }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              width: p.width,
              height: p.height,
              borderRadius: p.radius,
              bgcolor: p.color,
              opacity: p.opacity,
              boxShadow: p.ring ? "0 0 0 1px rgba(140,165,185,.45)" : "none",
              animation: p.sway,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
