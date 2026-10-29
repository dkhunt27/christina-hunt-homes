import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import { PageSection } from "../components/page-section";
import { ProgressBar } from "../components/progress-bar";
import { SectionHeading } from "../components/section-heading";
import { SegmentedTabs } from "../components/segmented-tabs";
import { CONTACT } from "../constants";
import { useSiteState } from "../contexts/site-state-context";
import { BOX_LABELS, CHECKLIST_TABS, CHECKLISTS } from "../data/checklists";
import { checklistProgress } from "../lib/checklist-progress";
import { COLORS, cardSx, FONTS, panelSx } from "../theme/tokens";
import type { ChecklistKey } from "../types";
import { ChecklistPhase } from "./checklists/checklist-phase";

const TAB_KEYS = new Set<string>(CHECKLIST_TABS.map(([k]) => k));

function BoxLabels() {
  return (
    <Box sx={{ ...panelSx, p: "24px", display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Typography variant="script" sx={{ fontSize: 26 }}>
            Printable
          </Typography>
          <Box component="h2" sx={{ m: 0, fontFamily: FONTS.serif, fontWeight: 400, fontSize: 24 }}>
            Box labels
          </Box>
        </div>
        <Button variant="contained" className="noprint" onClick={() => window.print()}>
          Print labels
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "10px",
        }}
      >
        {BOX_LABELS.map((b) => (
          <Box
            key={b}
            sx={{
              border: `2px dashed ${COLORS.ink}`,
              borderRadius: "6px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              breakInside: "avoid",
            }}
          >
            <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 22 }}>
              {b}
            </Box>
            <Box component="span" sx={{ fontSize: 12, color: COLORS.meta }}>
              Box ___ of ___ · Fragile ☐
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function ChecklistsPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab") ?? "buy";
  const tab = (TAB_KEYS.has(raw) ? raw : "buy") as ChecklistKey;
  const { checks } = useSiteState();
  const progress = checklistProgress(tab, checks);

  return (
    <PageSection maxWidth={960} gap={24} sx={{ pt: "36px", pb: "64px" }}>
      <SectionHeading
        level="h1"
        eyebrow="Your to-do list"
        eyebrowFontSize={30}
        title="One step at a time"
        action={
          <SegmentedTabs
            label="Checklist"
            options={CHECKLIST_TABS}
            value={tab}
            onChange={(t) => setParams({ tab: t }, { replace: true })}
            fontSize={15}
          />
        }
      />
      <Box
        sx={{ ...cardSx, p: "20px 22px", display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 15, gap: 2 }}>
          <strong>
            {progress.done} of {progress.total} done
          </strong>
          <Box component="span" sx={{ color: COLORS.meta }}>
            Saved on this device
          </Box>
        </Box>
        <ProgressBar value={progress.pct} label="Checklist progress" />
      </Box>
      {CHECKLISTS[tab].map((phase, i) => (
        <ChecklistPhase key={`${tab}-${phase.title}`} tab={tab} phase={phase} index={i} />
      ))}
      {tab === "move" && <BoxLabels />}
      <Box className="noprint" sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={() => window.print()}>
          Print this list
        </Button>
        <Button variant="contained" href={CONTACT.smsHref}>
          Stuck on a step? Text me
        </Button>
      </Box>
    </PageSection>
  );
}
