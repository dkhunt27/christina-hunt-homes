import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { columnMaxWidth, GUTTER } from "../theme/tokens";

type PageSectionProps = {
  children: ReactNode;
  /** Content width in px (excluding gutters): 1200 default, 1400 search, 960 checklists, 1100 hub. */
  maxWidth?: number;
  id?: string;
  sx?: SxProps<Theme>;
  /** Stacks children in a column with this gap (px). */
  gap?: number;
};

/** Centered content column with the design's 24px side padding. */
export function PageSection({ children, maxWidth = 1200, id, sx, gap }: PageSectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={[
        {
          maxWidth: columnMaxWidth(maxWidth),
          mx: "auto",
          px: `${GUTTER}px`,
          width: "100%",
          boxSizing: "border-box",
        },
        gap !== undefined && { display: "flex", flexDirection: "column", gap: `${gap}px` },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
