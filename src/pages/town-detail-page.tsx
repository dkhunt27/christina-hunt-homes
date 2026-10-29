import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLink } from "../components/arrow-link";
import { ListingGrid } from "../components/listing-grid";
import { PageSection } from "../components/page-section";
import { PhotoPlaceholder } from "../components/photo-placeholder";
import { TOWNS } from "../data/towns";
import { useListings } from "../hooks/use-listings";
import { listingsInTown } from "../lib/listing-filters";
import { ROUTES, searchPath } from "../routes";
import { autoGrid, COLORS, cardSx, FONTS } from "../theme/tokens";
import { LocalProsSection, TownEventsSection } from "./towns/town-guides-extras";

export default function TownDetailPage() {
  const { slug } = useParams();
  const town = TOWNS.find((t) => t.id === slug);
  const { data: listings = [] } = useListings();

  if (!town) {
    return (
      <PageSection gap={16} sx={{ py: "64px" }}>
        <Typography variant="h1">I don't have a guide for that town yet.</Typography>
        <ArrowLink to={ROUTES.TOWNS}>← All towns</ArrowLink>
      </PageSection>
    );
  }

  const facts: [string, string][] = [
    ["Schools", town.schools],
    ["Typical range", town.range],
    ["Getting around", town.around],
    ["My favorite stop", town.fav],
  ];

  return (
    <PageSection gap={40} sx={{ pt: "36px", pb: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <ArrowLink to={ROUTES.TOWNS}>← All towns</ArrowLink>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: autoGrid(380, "fit"),
            gap: "36px",
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Typography variant="label">{town.county} County</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: 40, sm: 48 }, lineHeight: 1 }}>
              {town.name}
            </Typography>
            <Box
              component="p"
              sx={{ m: 0, fontFamily: FONTS.serif, fontSize: 21, lineHeight: 1.4 }}
            >
              {town.tag}
            </Box>
            <Typography
              sx={{ fontSize: 17, lineHeight: 1.7, color: COLORS.bodyStrong, textWrap: "pretty" }}
            >
              {town.vibe}
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={searchPath({ q: town.match })}
              sx={{ alignSelf: "flex-start", mt: "6px", px: "20px" }}
            >
              Search homes in {town.name}
            </Button>
          </Box>
          <PhotoPlaceholder
            label={`photo · downtown ${town.name}`}
            sx={{
              aspectRatio: "4 / 3",
              borderRadius: "10px",
              border: `10px solid ${COLORS.paper}`,
              boxShadow: `0 0 0 2px ${COLORS.ink}`,
            }}
          />
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(240, "fit"), gap: "14px" }}>
          {facts.map(([k, v]) => (
            <Box
              key={k}
              sx={{ ...cardSx, p: "18px", display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <Typography variant="script" sx={{ fontSize: 24 }}>
                {k}
              </Typography>
              <Box component="span" sx={{ fontSize: 15, lineHeight: 1.5 }}>
                {v}
              </Box>
            </Box>
          ))}
        </Box>
        <ListingGrid listings={listingsInTown(listings, town)} />
      </Box>
      <TownEventsSection />
      <LocalProsSection />
    </PageSection>
  );
}
