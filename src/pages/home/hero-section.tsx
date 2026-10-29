import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../../components/page-section";
import { SeasonalFx } from "../../components/seasonal-fx";
import { CONTACT } from "../../constants";
import { HOODS } from "../../data/towns";
import { searchPath } from "../../routes";
import { useSeason } from "../../theme/season-provider";
import { autoGrid, COLORS, FONTS, STRIPES, SV } from "../../theme/tokens";

export function HeroSection() {
  const { copy, fxMode } = useSeason();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    navigate(searchPath({ q: q.trim() }));
  }

  return (
    <PageSection
      sx={{
        position: "relative",
        isolation: "isolate",
        pt: "56px",
        pb: "40px",
        display: "grid",
        gridTemplateColumns: autoGrid(420, "fit"),
        gap: "56px",
        alignItems: "center",
      }}
    >
      {fxMode === "subtle" && <SeasonalFx variant="subtle" />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="script" sx={{ fontSize: 32 }}>
          {copy.eyebrow}
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontSize: "clamp(40px, 5.4vw, 62px)", lineHeight: 1.05, textWrap: "balance" }}
        >
          Come on in. Let's find{" "}
          <Box
            component="span"
            sx={{ background: `linear-gradient(transparent 62%, ${SV.acc} 62%)` }}
          >
            your place
          </Box>{" "}
          in Southeast Michigan.
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            lineHeight: 1.6,
            color: COLORS.body,
            maxWidth: 520,
            textWrap: "pretty",
          }}
        >
          Every listing from Detroit to Ann Arbor and Brighton to the Pointes, all in one place.
          Heart homes without an account, and I'm a text away when you're ready.
        </Typography>
        <Box
          component="form"
          role="search"
          onSubmit={onSearch}
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            bgcolor: COLORS.card,
            border: `1px solid ${COLORS.line}`,
            borderRadius: "10px",
            p: 1,
            boxShadow: "0 8px 24px rgba(80,60,30,.06)",
          }}
        >
          <InputBase
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, neighborhood, county, or ZIP"
            inputProps={{ "aria-label": "Where do you want to live?" }}
            sx={{
              flex: 1,
              minWidth: 200,
              fontSize: 17,
              color: COLORS.ink,
              "& .MuiInputBase-input": { p: "12px 14px" },
            }}
          />
          <Button type="submit" variant="contained" size="large">
            Search homes
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
          <Box component="span" sx={{ fontSize: 14, color: COLORS.meta }}>
            Places I love:
          </Box>
          {HOODS.map((h) => (
            <ButtonBase
              key={h}
              onClick={() => navigate(searchPath({ q: h.replace(" County", "") }))}
              sx={{
                fontSize: 14,
                border: `1px solid ${COLORS.lineStrong}`,
                bgcolor: COLORS.card,
                color: COLORS.ink,
                px: "12px",
                py: "7px",
                borderRadius: "6px",
                "&:hover": { bgcolor: COLORS.chipHover },
              }}
            >
              {h}
            </ButtonBase>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          aspectRatio: "4 / 5",
          width: "100%",
          maxWidth: 470,
          justifySelf: "center",
          borderRadius: "50% 50% 14px 14px / 40% 40% 14px 14px",
          background: STRIPES,
          outline: `10px solid ${COLORS.paper}`,
          outlineOffset: "-1px",
          boxShadow: `0 0 0 12px ${COLORS.ink}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="mono" role="img" aria-label={copy.porch} sx={{ fontSize: 13 }}>
          {copy.porch}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            left: { xs: -12, md: -28 },
            bottom: 28,
            bgcolor: COLORS.card,
            border: `1px solid ${COLORS.line}`,
            borderRadius: "10px",
            px: "18px",
            py: "14px",
            boxShadow: "0 10px 30px rgba(80,60,30,.14)",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
            Questions? Just text me.
          </Box>
          <Box
            component="a"
            href={CONTACT.smsHref}
            sx={{ fontFamily: FONTS.serif, fontSize: 20, textDecoration: "none" }}
          >
            {CONTACT.phoneDisplay}
          </Box>
        </Box>
      </Box>
    </PageSection>
  );
}
