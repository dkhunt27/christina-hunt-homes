import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { STRIPES } from "../theme/tokens";

type PhotoPlaceholderProps = {
  /** What photo goes here, e.g. "listing photo · IDX". */
  label: string;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  children?: ReactNode;
};

/** Striped stand-in for a photo that hasn't been supplied yet. */
export function PhotoPlaceholder({ label, sx, labelSx, children }: PhotoPlaceholderProps) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={[
        {
          position: "relative",
          background: STRIPES,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="mono" sx={labelSx}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}
