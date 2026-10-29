import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { ListingCard } from "../../components/listing-card";
import { useSiteState } from "../../contexts/site-state-context";
import { TAKES } from "../../data/tour-notes";
import { hashString } from "../../lib/format";
import { tourScore } from "../../lib/storage";
import { COLORS, cardSx, SV } from "../../theme/tokens";
import type { Listing, Take } from "../../types";

/**
 * SAMPLE partner take, as in the prototype. Replace with the partner's real take once
 * partner accounts read each other's `favorites` through the `partners` table.
 */
function samplePartnerTake(listingId: string): Take {
  return TAKES[hashString(listingId) % TAKES.length];
}

export function SavedListing({ listing }: { listing: Listing }) {
  const { takes, setTake, partner, notes, alertsOff, toggleAlert } = useSiteState();
  const mine = takes[listing.id];
  const theirs = samplePartnerTake(listing.id);
  const score = tourScore(notes[listing.id]);
  const alertsOn = !alertsOff[listing.id];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ListingCard listing={listing} />
      <Box sx={{ ...cardSx, p: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box role="group" aria-label="Your take" sx={{ display: "flex", gap: "6px" }}>
          {TAKES.map((t) => (
            <ButtonBase
              key={t}
              onClick={() => setTake(listing.id, t)}
              aria-pressed={mine === t}
              sx={{
                flex: 1,
                border: `1px solid ${COLORS.lineStrong}`,
                bgcolor: mine === t ? SV.acc : COLORS.paper,
                color: COLORS.ink,
                fontSize: 14,
                fontWeight: 600,
                py: "9px",
                borderRadius: "6px",
              }}
            >
              {t}
            </ButtonBase>
          ))}
        </Box>
        {partner && (
          <Box component="span" sx={{ fontSize: 14, color: COLORS.body }}>
            {mine === "Love it" && theirs === "Love it"
              ? "You both love this one. Want to see it?"
              : `Your partner: ${theirs}`}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            fontSize: 13,
            color: COLORS.meta,
          }}
        >
          <span>{score ? `Tour score ${score} / 5` : "Not toured yet"}</span>
          <ButtonBase
            onClick={() => toggleAlert(listing.id)}
            aria-pressed={alertsOn}
            sx={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, py: "4px" }}
          >
            Price-drop texts: {alertsOn ? "on" : "off"}
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}
