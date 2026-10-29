import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { CheckMarkBox } from "../../components/check-mark-box";
import { useSiteState } from "../../contexts/site-state-context";
import { checklistItemKey } from "../../lib/checklist-progress";
import { COLORS, cardSx, FONTS, SV } from "../../theme/tokens";
import type { ChecklistKey, ChecklistPhase as Phase } from "../../types";

type ChecklistPhaseProps = {
  tab: ChecklistKey;
  phase: Phase;
  index: number;
};

/** One numbered step on the vertical timeline, with its check-off items. */
export function ChecklistPhase({ tab, phase, index }: ChecklistPhaseProps) {
  const { checks, toggleCheck } = useSiteState();
  const keys = phase.items.map((_, ii) => checklistItemKey(tab, index, ii));
  const done = keys.filter((k) => checks[k]).length;
  const complete = done === keys.length;

  return (
    <Box component="section" sx={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "18px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: complete ? SV.acc : COLORS.card,
            border: `2px solid ${COLORS.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONTS.serif,
            fontSize: 20,
            boxSizing: "border-box",
          }}
        >
          {index + 1}
        </Box>
        <Box component="span" sx={{ flex: 1, width: "2px", bgcolor: COLORS.line, mt: "6px" }} />
      </Box>
      <Box sx={{ pb: "14px", minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Box
            component="h2"
            sx={{ fontFamily: FONTS.serif, fontWeight: 400, fontSize: 26, m: "8px 0 2px" }}
          >
            {phase.title}
          </Box>
          <Box component="span" sx={{ fontSize: 14, color: COLORS.meta }}>
            {phase.when} · {done}/{keys.length}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: "12px" }}>
          {phase.items.map(([text, tip], ii) => {
            const key = keys[ii];
            const on = !!checks[key];
            return (
              <ButtonBase
                key={key}
                role="checkbox"
                aria-checked={on}
                onClick={() => toggleCheck(key)}
                sx={{
                  ...cardSx,
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  p: "14px 16px",
                  width: "100%",
                }}
              >
                <CheckMarkBox checked={on} />
                <Box component="span" sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      textDecoration: on ? "line-through" : "none",
                      color: on ? COLORS.doneText : COLORS.ink,
                    }}
                  >
                    {text}
                  </Box>
                  <Box component="span" sx={{ fontSize: 14, color: COLORS.meta, lineHeight: 1.45 }}>
                    {tip}
                  </Box>
                </Box>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
