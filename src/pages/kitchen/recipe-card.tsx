import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { GinghamStrip } from "../../components/gingham-strip";
import { PhotoPlaceholder } from "../../components/photo-placeholder";
import { COLORS, FONTS, panelSx, SV } from "../../theme/tokens";
import type { Recipe } from "../../types";

type RecipeCardProps = {
  recipe: Recipe;
  open: boolean;
  onToggle: () => void;
};

export function RecipeCard({ recipe: r, open, onToggle }: RecipeCardProps) {
  const detailId = `recipe-${r.id}`;
  return (
    <Box component="article" sx={{ ...panelSx, overflow: "hidden" }}>
      <GinghamStrip size={12} />
      <ButtonBase
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailId}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "110px 1fr", sm: "140px 1fr" },
          width: "100%",
          textAlign: "left",
          alignItems: "stretch",
        }}
      >
        <PhotoPlaceholder label="dish photo" sx={{ minHeight: 140 }} labelSx={{ fontSize: 11 }} />
        <Box sx={{ p: "18px 22px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <Box component="span" sx={{ fontSize: 13, color: COLORS.meta }}>
            {r.time} · serves {r.serves}
          </Box>
          <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 23, lineHeight: 1.15 }}>
            {r.name}
          </Box>
          <Box component="span" sx={{ fontSize: 15, lineHeight: 1.5, color: COLORS.body }}>
            {r.note}
          </Box>
          <Box component="span" sx={{ fontSize: 14, fontWeight: 600, color: SV.ink, mt: "4px" }}>
            {open ? "Close recipe" : "Show the recipe →"}
          </Box>
        </Box>
      </ButtonBase>
      {open && (
        <Box
          id={detailId}
          sx={{
            borderTop: `1px solid ${COLORS.line}`,
            p: "22px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          <div>
            <Typography variant="script" sx={{ fontSize: 24, mb: 1 }}>
              You'll need
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {r.ingredients.map((i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{
                    fontSize: 15,
                    lineHeight: 1.45,
                    pb: 1,
                    borderBottom: `1px dashed ${COLORS.line}`,
                  }}
                >
                  {i}
                </Box>
              ))}
            </Box>
          </div>
          <div>
            <Typography variant="script" sx={{ fontSize: 24, mb: 1 }}>
              How to
            </Typography>
            <Box
              component="ol"
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {r.steps.map((s, i) => (
                <Box
                  component="li"
                  key={s}
                  sx={{ display: "flex", gap: "12px", fontSize: 15, lineHeight: 1.5 }}
                >
                  <Box
                    component="span"
                    aria-hidden
                    sx={{
                      flex: "none",
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      bgcolor: SV.acc,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <span>{s}</span>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              className="noprint"
              onClick={() => window.print()}
              sx={{ mt: 2, px: "14px", py: "9px" }}
            >
              Print recipe card
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
}
