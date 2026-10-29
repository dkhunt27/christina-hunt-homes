import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowLink } from "../../components/arrow-link";
import { PageSection } from "../../components/page-section";
import { EVENTS } from "../../data/events";
import { ANCHORS, townsAnchorPath } from "../../routes";
import { useSeason } from "../../theme/season-provider";
import { autoGrid, COLORS, FONTS, panelSx, SV } from "../../theme/tokens";

export function EventsTeaser() {
  const { season, label } = useSeason();
  return (
    <PageSection sx={{ py: "32px" }}>
      <Box
        sx={{
          ...panelSx,
          p: "28px",
          display: "grid",
          gridTemplateColumns: autoGrid(260, "fit"),
          gap: "24px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="script">Around here this {label.toLowerCase()}</Typography>
          <Typography variant="h2" sx={{ fontSize: 28, lineHeight: 1.15 }}>
            Things I'd put on the calendar
          </Typography>
          <ArrowLink to={townsAnchorPath(ANCHORS.EVENTS)} sx={{ mt: "auto" }}>
            Town guides & events →
          </ArrowLink>
        </Box>
        {EVENTS[season].slice(0, 3).map((e) => (
          <Box
            key={e.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              borderLeft: `3px solid ${SV.acc}`,
              pl: 2,
            }}
          >
            <Typography variant="label" sx={{ letterSpacing: ".06em" }}>
              {e.when}
            </Typography>
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 20, lineHeight: 1.2 }}>
              {e.name}
            </Box>
            <Box component="span" sx={{ fontSize: 14, color: COLORS.body }}>
              {e.where}
            </Box>
          </Box>
        ))}
      </Box>
    </PageSection>
  );
}
