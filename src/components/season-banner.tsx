import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { ANCHORS, townsAnchorPath } from "../routes";
import { useSeason } from "../theme/season-provider";
import { COLORS, columnMaxWidth, SV } from "../theme/tokens";

export function SeasonBanner() {
  const { copy } = useSeason();
  return (
    <Box
      className="noprint"
      sx={{ bgcolor: SV.panel, color: COLORS.cream, fontSize: 14, transition: "background .4s" }}
    >
      <Box
        sx={{
          maxWidth: columnMaxWidth(1200),
          mx: "auto",
          px: "24px",
          py: "9px",
          display: "flex",
          gap: "4px 12px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <span>{copy.banner}</span>
        <Link
          component={RouterLink}
          to={townsAnchorPath(ANCHORS.EVENTS)}
          underline="hover"
          sx={{ color: SV.acc, fontWeight: 700, "&:hover": { color: SV.acc } }}
        >
          See what's on near you →
        </Link>
      </Box>
    </Box>
  );
}
