import Box from "@mui/material/Box";
import { COLORS, gingham } from "../theme/tokens";

type GinghamStripProps = {
  /** Strip height and check size in px: 10 for the header, 12 on recipe cards. */
  size?: number;
  /** The header strip sits under a 2px ink rule. */
  topBorder?: boolean;
};

export function GinghamStrip({ size = 10, topBorder = false }: GinghamStripProps) {
  return (
    <Box
      aria-hidden
      sx={{
        height: size,
        ...gingham(size),
        borderTop: topBorder ? `2px solid ${COLORS.ink}` : undefined,
        transition: "background-color .4s",
      }}
    />
  );
}
