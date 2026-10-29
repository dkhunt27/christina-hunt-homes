import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { PhotoPlaceholder } from "../../components/photo-placeholder";
import { useSiteState } from "../../contexts/site-state-context";
import { DEST_KEYS, DESTS, estimateCommute } from "../../lib/commute";
import { formatNumber, formatPrice } from "../../lib/format";
import { COLORS, cardSx, FONTS, SV, statusTagSx } from "../../theme/tokens";
import type { Listing } from "../../types";

export function PhotoMosaic() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: "repeat(2, minmax(140px, 220px))",
        gap: "10px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <PhotoPlaceholder label="front exterior · IDX photo 1" sx={{ gridRow: "1 / 3" }} />
      <PhotoPlaceholder label="kitchen" />
      <PhotoPlaceholder label="+ 24 photos" />
    </Box>
  );
}

export function ListingHeadline({ listing: l }: { listing: Listing }) {
  const { isFavorite, toggleFavorite } = useSiteState();
  const fav = isFavorite(l.id);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <div>
        <Box component="span" sx={{ ...statusTagSx, mb: "10px" }}>
          {l.status}
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: 38, sm: 44 }, lineHeight: 1 }}>
          {formatPrice(l.price)}
        </Typography>
        <Box sx={{ fontSize: 19, mt: "10px" }}>{l.address}</Box>
        <Box sx={{ fontSize: 15, color: COLORS.meta, mt: "2px" }}>
          {l.area}, {l.city}, MI · {l.county} County
        </Box>
      </div>
      <ButtonBase
        onClick={() => toggleFavorite(l.id)}
        aria-pressed={fav}
        sx={{
          border: `1px solid ${COLORS.lineStrong}`,
          bgcolor: COLORS.card,
          color: COLORS.ink,
          fontSize: 15,
          fontWeight: 600,
          px: 2,
          py: "12px",
          borderRadius: "6px",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          aria-hidden
          sx={{ color: fav ? COLORS.heart : COLORS.ink, fontSize: 18, lineHeight: 1 }}
        >
          {fav ? "♥" : "♡"}
        </Box>
        {fav ? "Saved" : "Save home"}
      </ButtonBase>
    </Box>
  );
}

export function StatStrip({ listing: l }: { listing: Listing }) {
  const stats: [string | number, string][] = [
    [l.beds, "bedrooms"],
    [l.baths, "baths"],
    [formatNumber(l.sqft), "sq ft"],
    [l.year, "built"],
  ];
  return (
    <Box
      component="dl"
      sx={{ ...cardSx, m: 0, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
    >
      {stats.map(([value, label], i) => (
        <Box
          key={label}
          sx={{
            p: { xs: "12px", sm: 2 },
            borderRight: i < stats.length - 1 ? `1px solid ${COLORS.line}` : undefined,
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <Box component="dt" sx={{ fontSize: 13, color: COLORS.meta }}>
            {label}
          </Box>
          <Box component="dd" sx={{ m: 0, fontFamily: FONTS.serif, fontSize: { xs: 20, sm: 24 } }}>
            {value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function ChristinasNotes({ features }: { features: string[] }) {
  return (
    <Box sx={{ ...cardSx, p: "20px 22px" }}>
      <Typography variant="script" sx={{ fontSize: 26, mb: "10px" }}>
        Christina's notes
      </Typography>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {features.map((f) => (
          <Box
            component="li"
            key={f}
            sx={{ display: "flex", gap: "12px", fontSize: 16, lineHeight: 1.5 }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{
                flex: "none",
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: SV.acc,
                mt: 1,
              }}
            />
            <span>{f}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function DriveTimes({ listing }: { listing: Listing }) {
  return (
    <Box sx={{ ...cardSx, p: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography variant="label">Drive times · weekday morning</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px",
        }}
      >
        {DEST_KEYS.map((k) => (
          <Box key={k} sx={{ display: "flex", flexDirection: "column" }}>
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 22 }}>
              {estimateCommute(listing, k)} min
            </Box>
            <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
              {DESTS[k].label}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
