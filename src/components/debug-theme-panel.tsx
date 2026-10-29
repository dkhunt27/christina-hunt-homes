import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { useSeason } from "../theme/season-provider";
import { DEBUG_SEASON_ORDER, SEASON_LABEL } from "../theme/seasons";
import { FONTS } from "../theme/tokens";
import type { Season } from "../types";

/** Season override for previewing themes. Renders only with `?debug` or VITE_SHOW_THEME_DEBUG. */
export function DebugThemePanel() {
  const { debugEnabled, override, setOverride, label } = useSeason();
  if (!debugEnabled) return null;
  const options: [Season | null, string][] = [
    [null, "Auto"],
    ...DEBUG_SEASON_ORDER.map((s): [Season, string] => [s, SEASON_LABEL[s]]),
  ];
  return (
    <Box
      className="noprint"
      sx={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 70,
        bgcolor: "#111",
        color: "#eee",
        borderRadius: "10px",
        p: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        fontFamily: FONTS.mono,
        fontSize: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      }}
    >
      <Box component="span" sx={{ color: "#9a9a9a" }}>
        DEBUG · seasonal theme · {override ? "preview" : "auto"}: {label}
      </Box>
      <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {options.map(([value, text]) => {
          const on = override === value;
          return (
            <ButtonBase
              key={text}
              onClick={() => setOverride(value)}
              aria-pressed={on}
              sx={{
                fontFamily: "inherit",
                fontSize: 12,
                border: "1px solid #444",
                bgcolor: on ? "#eee" : "transparent",
                color: on ? "#111" : "#eee",
                px: "10px",
                py: "6px",
                borderRadius: "4px",
              }}
            >
              {text}
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
