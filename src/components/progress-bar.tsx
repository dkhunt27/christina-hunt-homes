import Box from "@mui/material/Box";
import { COLORS, SV } from "../theme/tokens";

type ProgressBarProps = {
  /** 0–100 */
  value: number;
  height?: number;
  /** Track color: light on cards, `var(--panelDeep)` on dark panels. */
  track?: string;
  label: string;
};

export function ProgressBar({ value, height = 10, track = COLORS.track, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <Box
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      sx={{ height, borderRadius: "6px", bgcolor: track, overflow: "hidden" }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${pct}%`,
          bgcolor: SV.acc,
          borderRadius: "6px",
          transition: "width .3s",
        }}
      />
    </Box>
  );
}
