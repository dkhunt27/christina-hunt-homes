import Box from "@mui/material/Box";
import { CONTACT } from "../constants";
import { COLORS, SV } from "../theme/tokens";

export function TextChristinaFab() {
  return (
    <Box
      component="a"
      href={CONTACT.smsHref}
      className="noprint"
      sx={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 40,
        textDecoration: "none",
        bgcolor: COLORS.ink,
        color: COLORS.cream,
        borderRadius: "10px",
        px: "18px",
        py: "12px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        border: `2px solid ${SV.acc}`,
        "&:hover": { color: COLORS.cream },
      }}
    >
      <Box component="span" sx={{ fontWeight: 700, fontSize: 15 }}>
        Text Christina
      </Box>
      <Box component="span" sx={{ fontSize: 12, color: COLORS.fabSub }}>
        Usually replies within an hour
      </Box>
    </Box>
  );
}
