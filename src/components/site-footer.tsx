import Box from "@mui/material/Box";
import { CONTACT } from "../constants";
import { autoGrid, COLORS, columnMaxWidth, FONTS } from "../theme/tokens";

export function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.wood,
        backgroundImage:
          "repeating-linear-gradient(180deg, transparent 0 46px, rgba(0,0,0,.25) 46px 48px), repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 3px, transparent 3px 9px)",
        color: COLORS.footerText,
        borderTop: `10px solid ${COLORS.ink}`,
      }}
    >
      <Box
        sx={{
          maxWidth: columnMaxWidth(1200),
          mx: "auto",
          px: "24px",
          pt: "44px",
          pb: "96px",
          display: "grid",
          gridTemplateColumns: autoGrid(240, "fit"),
          gap: "28px",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <div>
          <Box sx={{ fontFamily: FONTS.serif, fontSize: 22, color: COLORS.cream }}>
            {CONTACT.name}
          </Box>
          <div>Realtor® · {CONTACT.brokerage}</div>
          <div>
            {CONTACT.phoneDisplay} · {CONTACT.email}
          </div>
        </div>
        <div>
          Serving Wayne, Oakland, Macomb, Washtenaw & Livingston counties. Listing data provided by
          Realcomp II Ltd. via IDX, deemed reliable but not guaranteed.
        </div>
        <div>
          Equal Housing Opportunity. Your saved homes stay on your device unless you choose to sync
          with your phone.
        </div>
      </Box>
    </Box>
  );
}
