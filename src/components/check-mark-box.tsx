import Box from "@mui/material/Box";
import { COLORS, SV } from "../theme/tokens";

type CheckMarkBoxProps = {
  checked: boolean;
  size?: number;
  /** Ink on light cards; `var(--acc)` on the chalkboard. */
  borderColor?: string;
  uncheckedBg?: string;
};

/** Visual check box; the surrounding button carries the role and state. */
export function CheckMarkBox({
  checked,
  size = 24,
  borderColor = COLORS.ink,
  uncheckedBg = COLORS.card,
}: CheckMarkBoxProps) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: size > 22 ? "5px" : "4px",
        border: `2px solid ${borderColor}`,
        bgcolor: checked ? SV.acc : uncheckedBg,
        color: COLORS.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size > 22 ? 14 : 13,
        fontWeight: 700,
        boxSizing: "border-box",
      }}
    >
      {checked ? "✓" : ""}
    </Box>
  );
}
