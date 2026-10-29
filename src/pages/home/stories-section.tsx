import Box from "@mui/material/Box";
import { PageSection } from "../../components/page-section";
import { PhotoPlaceholder } from "../../components/photo-placeholder";
import { SectionHeading } from "../../components/section-heading";
import { STORIES } from "../../data/stories";
import { autoGrid, COLORS, FONTS, panelSx } from "../../theme/tokens";

export function StoriesSection() {
  return (
    <PageSection sx={{ pt: "40px", pb: "24px" }}>
      <SectionHeading eyebrow="Welcome home" title="Stories from my clients" sx={{ mb: "22px" }} />
      <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(300, "fit"), gap: "22px" }}>
        {STORIES.map((s) => (
          <Box
            component="figure"
            key={s.who}
            sx={{
              ...panelSx,
              m: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PhotoPlaceholder
              label={`photo · ${s.who} at their new front door`}
              sx={{ aspectRatio: "3 / 2" }}
            />
            <Box
              component="blockquote"
              sx={{
                m: 0,
                p: "20px 22px 8px",
                fontFamily: FONTS.serif,
                fontSize: 18,
                lineHeight: 1.45,
              }}
            >
              “{s.quote}”
            </Box>
            <Box component="figcaption" sx={{ p: "0 22px 22px", fontSize: 14, color: COLORS.meta }}>
              {s.who} · {s.where}
            </Box>
          </Box>
        ))}
      </Box>
    </PageSection>
  );
}
