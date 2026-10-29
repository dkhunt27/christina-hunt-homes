import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Link as RouterLink } from "react-router-dom";
import { useSiteState } from "../contexts/site-state-context";
import { formatNumber, formatPrice } from "../lib/format";
import { listingPath } from "../routes";
import { COLORS, cardSx, FONTS, HOVER_LIFT, SV, statusTagSx } from "../theme/tokens";
import type { Listing } from "../types";
import { PhotoPlaceholder } from "./photo-placeholder";

type ListingCardProps = {
  listing: Listing;
  /** "28 min to Downtown Detroit", shown when the search commute filter is on. */
  commuteText?: string;
};

export function ListingCard({ listing: l, commuteText }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useSiteState();
  const fav = isFavorite(l.id);
  return (
    <Box
      component="article"
      sx={{
        ...cardSx,
        ...HOVER_LIFT,
        position: "relative",
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        component={RouterLink}
        to={listingPath(l.id)}
        aria-label={`${formatPrice(l.price)}, ${l.address}, ${l.city}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: COLORS.ink,
          textDecoration: "none",
          "&:hover": { color: COLORS.ink },
        }}
      >
        <PhotoPlaceholder label="listing photo · IDX" sx={{ aspectRatio: "4 / 3" }}>
          <Box component="span" sx={{ ...statusTagSx, position: "absolute", top: 12, left: 12 }}>
            {l.status}
          </Box>
        </PhotoPlaceholder>
        <Box sx={{ p: "14px 16px 18px", display: "flex", flexDirection: "column", gap: "5px" }}>
          <Box sx={{ fontFamily: FONTS.serif, fontSize: 24, lineHeight: 1.2 }}>
            {formatPrice(l.price)}
          </Box>
          <Box sx={{ fontSize: 14, color: COLORS.body, display: "flex", gap: "12px" }}>
            <span>{l.beds} bd</span>
            <span>{l.baths} ba</span>
            <span>{formatNumber(l.sqft)} sqft</span>
          </Box>
          <Box sx={{ fontSize: 15, fontWeight: 500 }}>{l.address}</Box>
          <Box sx={{ fontSize: 13, color: COLORS.meta }}>
            {l.area}, {l.city} · {l.county} Co.
          </Box>
          {commuteText && (
            <Box
              sx={{
                fontSize: 13,
                fontWeight: 600,
                bgcolor: SV.accSoft,
                borderRadius: "4px",
                px: 1,
                py: "4px",
                alignSelf: "flex-start",
                mt: "4px",
              }}
            >
              {commuteText}
            </Box>
          )}
        </Box>
      </Box>
      <ButtonBase
        onClick={() => toggleFavorite(l.id)}
        aria-label={fav ? `Remove ${l.address} from saved homes` : `Save ${l.address}`}
        aria-pressed={fav}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: COLORS.card,
          color: fav ? COLORS.heart : COLORS.ink,
          fontSize: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        {fav ? "♥" : "♡"}
      </ButtonBase>
    </Box>
  );
}
