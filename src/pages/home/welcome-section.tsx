import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { PageSection } from "../../components/page-section";
import { PhotoPlaceholder } from "../../components/photo-placeholder";
import { CONTACT } from "../../constants";
import { useToast } from "../../contexts/toast-context";
import { autoGrid, COLORS } from "../../theme/tokens";

export function WelcomeSection() {
  const { showToast } = useToast();
  return (
    <PageSection
      sx={{
        pt: "48px",
        pb: "72px",
        display: "grid",
        gridTemplateColumns: autoGrid(360, "fit"),
        gap: "48px",
        alignItems: "center",
      }}
    >
      <PhotoPlaceholder
        label="60-second welcome video"
        sx={{
          aspectRatio: "16 / 10",
          borderRadius: "10px",
          border: `10px solid ${COLORS.paper}`,
          boxShadow: `0 0 0 2px ${COLORS.ink}`,
        }}
        labelSx={{ position: "absolute", bottom: 14, left: 16 }}
      >
        <ButtonBase
          onClick={() => showToast("Your welcome video will play here.")}
          aria-label="Play video"
          sx={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            bgcolor: COLORS.ink,
            color: COLORS.cream,
            fontSize: 28,
            pl: "6px",
          }}
        >
          ▶
        </ButtonBase>
      </PhotoPlaceholder>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="script" sx={{ fontSize: 30 }}>
          Hi, I'm Christina
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: 30, sm: 36 }, lineHeight: 1.12, textWrap: "balance" }}
        >
          I help Southeast Michigan families buy and sell homes like a good neighbor would.
        </Typography>
        <Typography sx={{ fontSize: 17, lineHeight: 1.65, color: COLORS.body, textWrap: "pretty" }}>
          I'm with Real Estate One and know this corner of Michigan street by street, from Corktown
          rowhouses and Royal Oak bungalows to Ann Arbor craftsmen and lake cottages in Livingston
          County. I made this site so you can search in peace, save what you love, and reach me
          without filling out ten forms.
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", mt: "4px" }}>
          <Button variant="contained" href={CONTACT.smsHref} sx={{ px: "20px" }}>
            Text Christina
          </Button>
          <Button variant="outlined" href={CONTACT.mailtoHref} sx={{ px: "20px" }}>
            Email me
          </Button>
        </Box>
      </Box>
    </PageSection>
  );
}
