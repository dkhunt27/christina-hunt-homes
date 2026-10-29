import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { CheckMarkBox } from "../../components/check-mark-box";
import { useSiteState } from "../../contexts/site-state-context";
import { CHORES } from "../../data/chores";
import { choreKey } from "../../lib/checklist-progress";
import { ANCHORS, townsAnchorPath } from "../../routes";
import { SEASON_LABEL } from "../../theme/seasons";
import { COLORS, STICKY_TOP, SV } from "../../theme/tokens";
import type { Season } from "../../types";

/** Chalkboard of seasonal home-maintenance chores. */
export function ChoresBoard({ season }: { season: Season }) {
  const { checks, toggleCheck } = useSiteState();
  return (
    <Box
      component="aside"
      sx={{
        bgcolor: COLORS.chalkboard,
        backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
        backgroundSize: "5px 5px",
        border: `10px solid ${COLORS.chalkFrame}`,
        color: COLORS.cream,
        borderRadius: "8px",
        p: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: { md: "sticky" },
        top: STICKY_TOP,
      }}
    >
      <Typography variant="script" sx={{ color: SV.acc }}>
        Around the house this {SEASON_LABEL[season].toLowerCase()}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 24 }}>
        Little jobs that protect your biggest investment
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {CHORES[season].map((text, i) => {
          const key = choreKey(season, i);
          const on = !!checks[key];
          return (
            <ButtonBase
              key={key}
              role="checkbox"
              aria-checked={on}
              onClick={() => toggleCheck(key)}
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                textAlign: "left",
                fontSize: 15,
                lineHeight: 1.45,
              }}
            >
              <CheckMarkBox checked={on} size={22} borderColor={SV.acc} uncheckedBg="transparent" />
              <Box
                component="span"
                sx={{
                  textDecoration: on ? "line-through" : "none",
                  color: on ? COLORS.doneText : COLORS.cream,
                }}
              >
                {text}
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
      <Box
        component={RouterLink}
        to={townsAnchorPath(ANCHORS.PROS)}
        sx={{
          fontSize: 14,
          color: COLORS.fabSub,
          lineHeight: 1.5,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          "&:hover": { color: COLORS.cream },
        }}
      >
        Need a roofer, plumber, or furnace tech? See my trusted pros.
      </Box>
    </Box>
  );
}
