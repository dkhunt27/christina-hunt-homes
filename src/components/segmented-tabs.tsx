import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { COLORS } from "../theme/tokens";

type SegmentedTabsProps<T extends string> = {
  options: [value: T, label: string][];
  value: T;
  onChange: (value: T) => void;
  label: string;
  fontSize?: number;
};

/** Pill tab switcher (Kitchen seasons, checklist type). */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  label,
  fontSize = 14,
}: SegmentedTabsProps<T>) {
  return (
    <Box
      role="tablist"
      aria-label={label}
      className="noprint"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        bgcolor: COLORS.track,
        p: "4px",
        borderRadius: "6px",
      }}
    >
      {options.map(([v, text]) => {
        const selected = v === value;
        return (
          <ButtonBase
            key={v}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(v)}
            sx={{
              fontSize,
              fontWeight: 600,
              color: COLORS.ink,
              bgcolor: selected ? COLORS.card : "transparent",
              px: fontSize > 14 ? "18px" : "16px",
              py: fontSize > 14 ? "10px" : "9px",
              borderRadius: "4px",
            }}
          >
            {text}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
