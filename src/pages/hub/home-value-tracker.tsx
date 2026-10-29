import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { type FormEvent, useState } from "react";
import { FieldInput } from "../../components/field-input";
import { useSiteState } from "../../contexts/site-state-context";
import { formatPrice } from "../../lib/format";
import { sampleValueSeries } from "../../lib/home-value";
import { COLORS, FONTS, panelSx, SV } from "../../theme/tokens";

export function HomeValueTracker() {
  const { homeAddr, setHomeAddr } = useSiteState();
  const [draft, setDraft] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (draft.trim()) setHomeAddr(draft.trim());
  }

  const series = homeAddr ? sampleValueSeries(homeAddr) : [];
  const min = Math.min(...series);
  const max = Math.max(...series);
  const change = series.length ? (series[11] / series[0] - 1) * 100 : 0;

  return (
    <Box sx={{ ...panelSx, p: "26px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <Typography variant="label">Home value tracker</Typography>
      {!homeAddr ? (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 22 }}>
            Already own? Track your home's value.
          </Box>
          <FieldInput
            tone="paper"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Your home address"
            inputProps={{ "aria-label": "Your home address", autoComplete: "street-address" }}
          />
          <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
            Track my home
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box component="span" sx={{ fontSize: 15, color: COLORS.body }}>
            {homeAddr}
          </Box>
          <Box sx={{ display: "flex", gap: "14px", alignItems: "baseline", flexWrap: "wrap" }}>
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 40, lineHeight: 1 }}>
              {formatPrice(Math.round(series[11] / 1000) * 1000)}
            </Box>
            <Box component="span" sx={{ fontSize: 15, fontWeight: 600, color: COLORS.positive }}>
              ▲ {change.toFixed(1)}% this year
            </Box>
          </Box>
          <Box
            role="img"
            aria-label={`Estimated value over the last 12 months, up ${change.toFixed(1)}%`}
            sx={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 90 }}
          >
            {series.map((v, i) => (
              <Box
                // biome-ignore lint/suspicious/noArrayIndexKey: one bar per month, fixed order
                key={i}
                sx={{
                  flex: 1,
                  height: `${Math.round(30 + ((v - min) / (max - min || 1)) * 70)}%`,
                  bgcolor: i === 11 ? SV.acc : COLORS.line,
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: COLORS.meta,
            }}
          >
            <span>12 months ago</span>
            <span>This month</span>
          </Box>
          <Box component="span" sx={{ fontSize: 13, color: COLORS.meta, lineHeight: 1.5 }}>
            Estimate from recent nearby sales. Updated monthly. Text me for a real opinion.
          </Box>
        </Box>
      )}
    </Box>
  );
}
