import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { formatPrice, formatPriceShort } from "../../lib/format";
import { listingPath } from "../../routes";
import { COLORS, STICKY_TOP } from "../../theme/tokens";
import type { Listing } from "../../types";

/**
 * Price-pin map. Placeholder tiles with pins placed by the sample x/y percentages; swap in
 * Mapbox GL or Google Maps and place pins by `lat`/`lng` once the IDX feed provides them.
 */
export function ListingMap({ listings }: { listings: Listing[] }) {
  const navigate = useNavigate();
  return (
    <Box
      aria-label="Map of matching homes"
      role="region"
      sx={{
        position: { xs: "relative", md: "sticky" },
        top: { md: STICKY_TOP },
        height: { xs: 380, md: "calc(100vh - 160px)" },
        minHeight: { md: 560 },
        maxHeight: 760,
        borderRadius: "12px",
        border: `1px solid ${COLORS.line}`,
        background: `repeating-linear-gradient(135deg, ${COLORS.mapStripeA} 0 12px, ${COLORS.mapStripeB} 12px 24px)`,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="mono"
        sx={{
          position: "absolute",
          left: 16,
          bottom: 14,
          bgcolor: COLORS.cream,
          px: 1,
          py: "4px",
          borderRadius: "6px",
        }}
      >
        map · Southeast Michigan · Mapbox / Google tiles
      </Typography>
      {listings.map((l) => (
        <ButtonBase
          key={l.id}
          onClick={() => navigate(listingPath(l.id))}
          aria-label={`${formatPrice(l.price)}, ${l.address}`}
          sx={{
            position: "absolute",
            left: `${l.x}%`,
            top: `${l.y}%`,
            transform: "translate(-50%, -50%)",
            border: `2px solid ${COLORS.card}`,
            bgcolor: COLORS.ink,
            color: COLORS.cream,
            fontSize: 13,
            fontWeight: 600,
            px: "10px",
            py: "6px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,.18)",
            "&:hover": { bgcolor: COLORS.linkHover },
          }}
        >
          {formatPriceShort(l.price)}
        </ButtonBase>
      ))}
    </Box>
  );
}
