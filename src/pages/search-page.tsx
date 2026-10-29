import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import { ListingGrid } from "../components/listing-grid";
import { PageSection } from "../components/page-section";
import { useSiteState } from "../contexts/site-state-context";
import { useAuth } from "../hooks/use-auth";
import { useListings } from "../hooks/use-listings";
import { commuteLabel } from "../lib/commute";
import { DEFAULT_FILTERS, filterListings, filtersFromParams } from "../lib/listing-filters";
import { autoGrid, COLORS, FONTS } from "../theme/tokens";
import type { ListingFilters } from "../types";
import { ListingMap } from "./search/listing-map";
import { CommuteBar, SearchFilters } from "./search/search-filters";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const filters = filtersFromParams(params);
  const { data: listings = [], isLoading } = useListings();
  const { addSearch } = useSiteState();
  const { requireSignIn } = useAuth();
  const results = filterListings(listings, filters);
  const dest = filters.dest;

  function setFilter(key: keyof ListingFilters, value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === DEFAULT_FILTERS[key]) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }

  return (
    <PageSection maxWidth={1400} gap={18} sx={{ pt: "28px", pb: "56px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Typography variant="h1" sx={{ fontSize: { xs: 32, sm: 38 } }}>
            Find a home
          </Typography>
          <Typography aria-live="polite" sx={{ mt: "6px", color: COLORS.meta, fontSize: 15 }}>
            {isLoading ? "Loading homes…" : `${results.length} homes match`} · updated from the MLS
            every 15 minutes
          </Typography>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => requireSignIn("search", () => addSearch(filters))}
        >
          Text me new matches
        </Button>
      </Box>

      <SearchFilters filters={filters} onChange={setFilter} />
      <CommuteBar filters={filters} onChange={setFilter} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: autoGrid(520, "fit"),
          gap: "22px",
          alignItems: "start",
        }}
      >
        <ListingGrid
          listings={results}
          minCardWidth={250}
          commuteFor={dest !== "none" ? (l) => commuteLabel(l, dest) : undefined}
        >
          {!isLoading && results.length === 0 && (
            <Box
              sx={{
                gridColumn: "1 / -1",
                bgcolor: COLORS.card,
                border: `1px dashed ${COLORS.lineDashed}`,
                borderRadius: "10px",
                p: 4,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 22 }}>
                Nothing yet. But homes come on daily.
              </Box>
              <Box component="span" sx={{ color: COLORS.body }}>
                Tap "Text me new matches" and I'll let you know the moment one fits.
              </Box>
              <Button variant="outlined" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </Button>
            </Box>
          )}
        </ListingGrid>
        <ListingMap listings={results} />
      </Box>
    </PageSection>
  );
}
