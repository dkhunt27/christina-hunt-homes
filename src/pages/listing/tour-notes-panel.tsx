import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { FieldInput } from "../../components/field-input";
import { GinghamStrip } from "../../components/gingham-strip";
import { useSiteState } from "../../contexts/site-state-context";
import { RATE_CATS } from "../../data/tour-notes";
import { tourScore } from "../../lib/storage";
import { COLORS, cardSx, FONTS, SV } from "../../theme/tokens";

/** Four categories rated with five tap-dots, plus free text. Saved on the device. */
export function TourNotesPanel({ listingId }: { listingId: string }) {
  const { notes, partner, setRating, setNoteText } = useSiteState();
  const note = notes[listingId] ?? { r: {}, text: "" };
  const score = tourScore(note);
  const status = `${score ? `Your score ${score} / 5 · ` : ""}${
    partner ? "Shared with your partner" : "Saved on this device"
  }`;

  return (
    <Box sx={{ ...cardSx, overflow: "hidden" }}>
      <GinghamStrip />
      <Box sx={{ p: "20px 22px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Box component="h2" sx={{ m: 0, fontFamily: FONTS.serif, fontWeight: 400, fontSize: 22 }}>
            My tour notes
          </Box>
          <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
            {status}
          </Box>
        </Box>
        {RATE_CATS.map(([key, label]) => {
          const value = note.r[key] ?? 0;
          return (
            <Box
              key={key}
              role="group"
              aria-label={`${label} rating`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Box component="span" sx={{ fontSize: 15 }}>
                {label}
              </Box>
              <Box sx={{ display: "flex", gap: "6px" }}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <ButtonBase
                    key={v}
                    onClick={() => setRating(listingId, key, v)}
                    aria-label={`${label} ${v} of 5`}
                    aria-pressed={value === v}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: `2px solid ${COLORS.underline}`,
                      bgcolor: value >= v ? SV.acc : COLORS.card,
                    }}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
        <FieldInput
          tone="paper"
          multiline
          minRows={3}
          value={note.text}
          onChange={(e) => setNoteText(listingId, e.target.value)}
          placeholder="Loved the porch. Basement smelled damp? Ask about the roof age…"
          inputProps={{ "aria-label": "Tour notes" }}
          sx={{
            fontSize: 15,
            lineHeight: 1.5,
            p: "12px 14px",
            "& .MuiInputBase-input": { p: 0, resize: "vertical" },
          }}
        />
      </Box>
    </Box>
  );
}
