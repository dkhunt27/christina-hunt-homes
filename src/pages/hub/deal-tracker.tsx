import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProgressBar } from "../../components/progress-bar";
import { CONTACT } from "../../constants";
import type { Deal } from "../../lib/db/deals-db";
import { currentStepIndex, dealProgress } from "../../lib/deal-progress";
import { autoGrid, COLORS, darkPanelSx, FONTS, panelSx, SV } from "../../theme/tokens";

function shortDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DealTracker({ deal }: { deal: Deal }) {
  const current = currentStepIndex(deal);
  const { daysLeft, closeDate, pct } = dealProgress(deal);
  const next = deal.steps[current];

  return (
    <Box sx={{ ...panelSx, overflow: "hidden" }}>
      <Box
        sx={{
          p: "24px 26px",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "flex-end",
          borderBottom: `1px solid ${COLORS.line}`,
        }}
      >
        <div>
          <Typography variant="label">Your purchase</Typography>
          <Box sx={{ fontFamily: FONTS.serif, fontSize: 28, mt: "4px" }}>{deal.address}</Box>
        </div>
        <Box sx={{ textAlign: { sm: "right" } }}>
          <Box sx={{ fontFamily: FONTS.serif, fontSize: 28 }}>{daysLeft} days</Box>
          <Box sx={{ fontSize: 13, color: COLORS.meta }}>
            until closing on {shortDate(closeDate)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ px: "26px", pt: 3 }}>
        <ProgressBar value={pct} label="Progress to closing" />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: autoGrid(420, "fit"),
          gap: "28px",
          p: "24px 26px 28px",
        }}
      >
        <Box
          component="ol"
          sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column" }}
        >
          {deal.steps.map((s, i) => {
            const done = i < current;
            const isCurrent = i === current;
            return (
              <Box
                component="li"
                key={s.title}
                aria-current={isCurrent ? "step" : undefined}
                sx={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: "14px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Box
                    component="span"
                    aria-label={done ? "Done" : undefined}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: `2px solid ${COLORS.ink}`,
                      bgcolor: done ? SV.acc : isCurrent ? COLORS.ink : COLORS.card,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      boxSizing: "border-box",
                    }}
                  >
                    {done ? "✓" : ""}
                  </Box>
                  <Box
                    component="span"
                    sx={{ flex: 1, width: "2px", bgcolor: COLORS.line, minHeight: 16 }}
                  />
                </Box>
                <Box sx={{ pb: 2 }}>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "baseline", flexWrap: "wrap" }}
                  >
                    <Box component="span" sx={{ fontSize: 16, fontWeight: isCurrent ? 700 : 500 }}>
                      {s.title}
                    </Box>
                    <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
                      {shortDate(s.date)}
                    </Box>
                  </Box>
                  <Box sx={{ fontSize: 14, color: COLORS.body, lineHeight: 1.5, mt: "2px" }}>
                    {s.desc}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Box
            sx={{
              ...darkPanelSx,
              borderRadius: "10px",
              p: "22px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="script" sx={{ fontSize: 26, color: SV.acc }}>
              What's next
            </Typography>
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 22 }}>
              {next.title} · {shortDate(next.date)}
            </Box>
            <Box component="span" sx={{ fontSize: 15, lineHeight: 1.55, color: COLORS.creamMuted }}>
              {next.desc}
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: COLORS.paper,
              border: `1px solid ${COLORS.line}`,
              borderRadius: "10px",
              p: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              fontSize: 15,
            }}
          >
            <Typography variant="label">Your team</Typography>
            <span>
              <strong>{CONTACT.name}</strong> · {CONTACT.phoneDisplay}
            </span>
            <span>
              Lender ·{" "}
              <Typography variant="mono" sx={{ fontSize: 13 }}>
                lender name
              </Typography>
            </span>
            <span>
              Title company ·{" "}
              <Typography variant="mono" sx={{ fontSize: 13 }}>
                title co. name
              </Typography>
            </span>
          </Box>
          <Box
            role="note"
            sx={{
              border: `2px solid ${COLORS.warning}`,
              borderRadius: "10px",
              p: "16px 18px",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            <Box component="strong" sx={{ color: COLORS.warning }}>
              Wire fraud warning:
            </Box>{" "}
            I will never email you wiring instructions. Always call the title company at a number
            you know before sending money.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
