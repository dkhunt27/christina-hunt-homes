import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLink } from "../../components/arrow-link";
import { GinghamStrip } from "../../components/gingham-strip";
import { PageSection } from "../../components/page-section";
import { PhotoPlaceholder } from "../../components/photo-placeholder";
import { ProgressBar } from "../../components/progress-bar";
import { useSiteState } from "../../contexts/site-state-context";
import { CHECKLIST_PROGRESS_LABELS, CHECKLIST_TABS } from "../../data/checklists";
import { RECIPES } from "../../data/recipes";
import { checklistProgress } from "../../lib/checklist-progress";
import { kitchenPath, ROUTES } from "../../routes";
import { useSeason } from "../../theme/season-provider";
import { autoGrid, COLORS, darkPanelSx, panelSx, SV } from "../../theme/tokens";

function RecipeTeaser() {
  const { season, label } = useSeason();
  const recipe = RECIPES[season][0];
  return (
    <Box sx={{ ...panelSx, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <GinghamStrip size={12} />
      <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(180, "fit"), flex: 1 }}>
        <PhotoPlaceholder label="recipe photo" sx={{ minHeight: 200 }} />
        <Box sx={{ p: "26px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="script">In my kitchen · {label.toLowerCase()}</Typography>
          <Typography variant="h3" sx={{ fontSize: 25 }}>
            {recipe.name}
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.body }}>
            {recipe.note}
          </Typography>
          <ArrowLink to={kitchenPath(recipe.id)} sx={{ mt: "auto" }}>
            Get the recipe →
          </ArrowLink>
        </Box>
      </Box>
    </Box>
  );
}

function TodoPanel() {
  const { checks } = useSiteState();
  return (
    <Box sx={{ ...darkPanelSx, p: "30px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <Typography variant="script" sx={{ color: SV.acc }}>
        Your to-do list
      </Typography>
      <Typography variant="h3" sx={{ fontSize: 28 }}>
        Buying, selling, or moving, step by step
      </Typography>
      <Typography variant="body2" sx={{ color: COLORS.creamMuted }}>
        Check things off as you go. Your progress saves on this device, no account needed.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: "6px" }}>
        {CHECKLIST_TABS.map(([key]) => {
          const p = checklistProgress(key, checks);
          const label = CHECKLIST_PROGRESS_LABELS[key];
          return (
            <Box key={key} sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                <span>{label}</span>
                <Box component="span" sx={{ color: COLORS.creamMuted }}>
                  {p.done} of {p.total}
                </Box>
              </Box>
              <ProgressBar value={p.pct} height={8} track={SV.panelDeep} label={label} />
            </Box>
          );
        })}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        component={RouterLink}
        to={ROUTES.TODOS}
        sx={{ alignSelf: "flex-start", mt: "auto", px: "20px" }}
      >
        Open my checklist
      </Button>
    </Box>
  );
}

export function KitchenTodoSection() {
  return (
    <PageSection
      sx={{ py: "32px", display: "grid", gridTemplateColumns: autoGrid(380, "fit"), gap: "22px" }}
    >
      <RecipeTeaser />
      <TodoPanel />
    </PageSection>
  );
}
