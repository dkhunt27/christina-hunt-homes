import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageSection } from "../components/page-section";
import { SectionHeading } from "../components/section-heading";
import { SegmentedTabs } from "../components/segmented-tabs";
import { RECIPES } from "../data/recipes";
import { useSeason } from "../theme/season-provider";
import { SEASON_LABEL, SEASON_ORDER } from "../theme/seasons";
import { autoGrid } from "../theme/tokens";
import type { Season } from "../types";
import { ChoresBoard } from "./kitchen/chores-board";
import { RecipeCard } from "./kitchen/recipe-card";

export default function KitchenPage() {
  const { season: themeSeason } = useSeason();
  const [params] = useSearchParams();
  const [picked, setPicked] = useState<Season | null>(null);
  const [openRecipe, setOpenRecipe] = useState<string | null>(params.get("recipe"));
  const season = picked ?? themeSeason;

  // A theme change from the debug panel snaps the tabs back to the theme's season.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset only when the theme season changes
  useEffect(() => setPicked(null), [themeSeason]);

  return (
    <PageSection gap={26} sx={{ pt: "36px", pb: "64px" }}>
      <SectionHeading
        level="h1"
        eyebrow="Christina's kitchen"
        eyebrowFontSize={30}
        title={`What's cooking this ${SEASON_LABEL[season].toLowerCase()}`}
        action={
          <SegmentedTabs
            label="Season"
            options={SEASON_ORDER.map((s): [Season, string] => [s, SEASON_LABEL[s]])}
            value={season}
            onChange={(s) => {
              setPicked(s);
              setOpenRecipe(null);
            }}
          />
        }
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: autoGrid(520, "fit"),
          gap: "28px",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {RECIPES[season].map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              open={openRecipe === r.id}
              onToggle={() => setOpenRecipe(openRecipe === r.id ? null : r.id)}
            />
          ))}
        </Box>
        <ChoresBoard season={season} />
      </Box>
    </PageSection>
  );
}
