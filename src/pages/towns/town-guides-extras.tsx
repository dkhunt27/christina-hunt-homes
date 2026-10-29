import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionHeading } from "../../components/section-heading";
import { EVENTS } from "../../data/events";
import { PROS } from "../../data/pros";
import { ANCHORS } from "../../routes";
import { useSeason } from "../../theme/season-provider";
import { autoGrid, COLORS, cardSx, FONTS, SV } from "../../theme/tokens";

export function TownEventsSection() {
  const { season, label } = useSeason();
  return (
    <Box id={ANCHORS.EVENTS} sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionHeading
        eyebrow={`This ${label.toLowerCase()}`}
        title="What's happening around Southeast Michigan"
        titleFontSize={32}
      />
      <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(260), gap: "14px" }}>
        {EVENTS[season].map((e) => (
          <Box key={e.name} sx={{ ...cardSx, p: "18px 20px", display: "flex", gap: 2 }}>
            <Box
              component="span"
              sx={{
                flex: "none",
                width: 56,
                height: 56,
                borderRadius: "6px",
                bgcolor: SV.accSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              {e.when}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Box
                component="span"
                sx={{ fontFamily: FONTS.serif, fontSize: 18, lineHeight: 1.25 }}
              >
                {e.name}
              </Box>
              <Box component="span" sx={{ fontSize: 14, color: COLORS.body }}>
                {e.where}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: 13, color: COLORS.meta }}>
        Dates change year to year, so check each event's site before you go.
      </Typography>
    </Box>
  );
}

export function LocalProsSection() {
  return (
    <Box id={ANCHORS.PROS} sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionHeading eyebrow="People I trust" title="My go-to local pros" titleFontSize={32} />
      <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(260), gap: "14px" }}>
        {PROS.map((p) => (
          <Box
            key={p.cat}
            sx={{ ...cardSx, p: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <Typography variant="label" sx={{ fontSize: 12 }}>
              {p.cat}
            </Typography>
            {p.name ? (
              <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 18 }}>
                {p.name}
              </Box>
            ) : (
              <Typography
                variant="mono"
                sx={{
                  fontSize: 13,
                  bgcolor: COLORS.stripeB,
                  px: 1,
                  py: "6px",
                  borderRadius: "4px",
                }}
              >
                add business name
              </Typography>
            )}
            <Box component="span" sx={{ fontSize: 14, lineHeight: 1.5, color: COLORS.body }}>
              {p.note}
            </Box>
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: 13, color: COLORS.meta }}>
        I don't get paid for referrals. These are just people who've done right by my clients.
      </Typography>
    </Box>
  );
}
