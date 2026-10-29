import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { PageSection } from "../components/page-section";
import { PhotoPlaceholder } from "../components/photo-placeholder";
import { SectionHeading } from "../components/section-heading";
import { TOWNS } from "../data/towns";
import { useListings } from "../hooks/use-listings";
import { homesForSaleLabel, listingsInTown } from "../lib/listing-filters";
import { townPath } from "../routes";
import { autoGrid, COLORS, cardSx, FONTS, HOVER_LIFT } from "../theme/tokens";
import { LocalProsSection, TownEventsSection } from "./towns/town-guides-extras";

export default function TownsPage() {
  const { data: listings = [] } = useListings();
  return (
    <PageSection gap={40} sx={{ pt: "36px", pb: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div>
          <SectionHeading
            level="h1"
            eyebrow="Around here"
            eyebrowFontSize={30}
            title="Town guides"
          />
          <Typography
            sx={{ fontSize: 17, color: COLORS.body, mt: 1, maxWidth: 640, lineHeight: 1.55 }}
          >
            The honest scoop on the places I sell in most: schools, getting around, and where I'd
            spend a Saturday.
          </Typography>
        </div>
        <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(260), gap: "18px" }}>
          {TOWNS.map((t) => (
            <Box
              key={t.id}
              component={RouterLink}
              to={townPath(t.id)}
              sx={{
                ...cardSx,
                ...HOVER_LIFT,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: COLORS.ink,
                "&:hover": { ...HOVER_LIFT["&:hover"], color: COLORS.ink },
              }}
            >
              <PhotoPlaceholder label={`photo · ${t.name}`} sx={{ aspectRatio: "16 / 10" }} />
              <Box
                sx={{ p: "16px 18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Typography variant="label" sx={{ fontSize: 12 }}>
                  {t.county} County · {homesForSaleLabel(listingsInTown(listings, t).length)}
                </Typography>
                <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 23 }}>
                  {t.name}
                </Box>
                <Box component="span" sx={{ fontSize: 14, lineHeight: 1.5, color: COLORS.body }}>
                  {t.tag}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <TownEventsSection />
      <LocalProsSection />
    </PageSection>
  );
}
