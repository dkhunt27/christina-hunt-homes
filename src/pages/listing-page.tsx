import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { ArrowLink } from "../components/arrow-link";
import { ListingGrid } from "../components/listing-grid";
import { PageSection } from "../components/page-section";
import { IDX_DISCLAIMER } from "../constants";
import { useListing, useListings } from "../hooks/use-listings";
import { formatPrice, monthlyPayment } from "../lib/format";
import { similarListings } from "../lib/listing-filters";
import { ROUTES } from "../routes";
import { autoGrid, COLORS, FONTS, panelSx, STICKY_TOP } from "../theme/tokens";
import {
  ChristinasNotes,
  DriveTimes,
  ListingHeadline,
  PhotoMosaic,
  StatStrip,
} from "./listing/listing-overview";
import { TourNotesPanel } from "./listing/tour-notes-panel";
import { TourRequestPanel } from "./listing/tour-request-panel";

export default function ListingPage() {
  const { id } = useParams();
  const { data: listing, isLoading } = useListing(id);
  const { data: listings = [] } = useListings();

  if (isLoading) return <Box sx={{ minHeight: "60vh" }} />;
  if (!listing) {
    return (
      <PageSection gap={16} sx={{ py: "64px" }}>
        <Typography variant="h1">This home is off the market.</Typography>
        <Typography sx={{ color: COLORS.body }}>
          It may have sold or been taken down. There are plenty more to see.
        </Typography>
        <ArrowLink to={ROUTES.SEARCH}>Find a home →</ArrowLink>
      </PageSection>
    );
  }

  return (
    <PageSection gap={24} sx={{ pt: "24px", pb: "64px" }}>
      <ArrowLink to={ROUTES.SEARCH}>← Back to search</ArrowLink>
      <PhotoMosaic />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: autoGrid(360, "fit"),
          gap: "36px",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <ListingHeadline listing={listing} />
          <StatStrip listing={listing} />
          <Typography
            sx={{ fontSize: 17, lineHeight: 1.7, color: COLORS.bodyStrong, textWrap: "pretty" }}
          >
            {listing.desc}
          </Typography>
          <ChristinasNotes features={listing.features} />
          <DriveTimes listing={listing} />
          <TourNotesPanel listingId={listing.id} />
          <Typography sx={{ fontSize: 12, color: COLORS.placeholderText }}>
            {IDX_DISCLAIMER}
          </Typography>
        </Box>
        <Box
          component="aside"
          sx={{
            position: { md: "sticky" },
            top: STICKY_TOP,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TourRequestPanel key={listing.id} listingId={listing.id} />
          <Box sx={{ ...panelSx, p: "22px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
              Estimated payment
            </Box>
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 30 }}>
              {formatPrice(monthlyPayment(listing.price))}
              <Box
                component="span"
                sx={{ fontFamily: FONTS.sans, fontSize: 15, color: COLORS.meta }}
              >
                {" "}
                /mo
              </Box>
            </Box>
            <Box component="span" sx={{ fontSize: 13, color: COLORS.meta, lineHeight: 1.5 }}>
              20% down, 30-yr fixed at 6.5%, plus est. taxes and insurance. I can connect you with a
              great local lender.
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: "12px" }}>
        <Typography variant="h2" sx={{ fontSize: 28 }}>
          Homes like this one
        </Typography>
        <ListingGrid listings={similarListings(listings, listing)} />
      </Box>
    </PageSection>
  );
}
