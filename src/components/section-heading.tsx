import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Caveat handwritten line above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** h1 for page titles, h2 for sections. */
  level?: "h1" | "h2";
  titleFontSize?: number;
  eyebrowFontSize?: number;
  /** Shown at the right end of the row ("See all homes →", season tabs). */
  action?: ReactNode;
  sx?: SxProps<Theme>;
};

export function SectionHeading({
  eyebrow,
  title,
  level = "h2",
  titleFontSize,
  eyebrowFontSize,
  action,
  sx,
}: SectionHeadingProps) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "16px 20px",
          flexWrap: "wrap",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: level === "h1" ? "6px" : "4px" }}>
        {eyebrow && (
          <Typography variant="script" sx={eyebrowFontSize ? { fontSize: eyebrowFontSize } : {}}>
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant={level}
          sx={titleFontSize ? { fontSize: { xs: titleFontSize * 0.82, sm: titleFontSize } } : {}}
        >
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}
