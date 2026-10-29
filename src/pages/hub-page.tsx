import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PageSection } from "../components/page-section";
import { SectionHeading } from "../components/section-heading";
import { useAuth } from "../hooks/use-auth";
import { getLatestDeal } from "../lib/db/deals-db";
import { sampleDeal } from "../lib/deal-progress";
import { QK } from "../lib/query-keys";
import { todosPath } from "../routes";
import { autoGrid, COLORS, FONTS, panelSx, SV } from "../theme/tokens";
import { DealTracker } from "./hub/deal-tracker";
import { HomeValueTracker } from "./hub/home-value-tracker";

function LockedHub({ onPreview }: { onPreview: () => void }) {
  const { openSignIn } = useAuth();
  return (
    <Box
      sx={{
        ...panelSx,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        alignItems: "flex-start",
        maxWidth: 620,
      }}
    >
      <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 24 }}>
        Your deal and your home, in one spot
      </Box>
      <Typography sx={{ color: COLORS.body }}>
        Under contract? Follow every step to closing. Already own? Watch your home's value each
        month. Sign in with your phone, no password.
      </Typography>
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="contained" onClick={openSignIn}>
          Sign in with phone
        </Button>
        <Button variant="outlined" onClick={onPreview}>
          Preview with sample data
        </Button>
      </Box>
    </Box>
  );
}

function NoDealYet() {
  return (
    <Box sx={{ ...panelSx, p: "24px 26px", display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="label">Your purchase</Typography>
      <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 24 }}>
        Nothing under contract yet
      </Box>
      <Typography sx={{ color: COLORS.body }}>
        Once your offer is accepted, every step to closing shows up here with dates.
      </Typography>
    </Box>
  );
}

export default function HubPage() {
  const { user } = useAuth();
  const [preview, setPreview] = useState(false);
  const realUserId = user && !user.demo ? user.id : undefined;
  const dealQuery = useQuery({
    queryKey: QK.deal(realUserId),
    queryFn: () => getLatestDeal(realUserId as string),
    enabled: !!realUserId,
  });
  const demoDeal = useMemo(() => sampleDeal(), []);
  const deal = realUserId ? dealQuery.data : demoDeal;
  const unlocked = !!user || preview;

  return (
    <PageSection maxWidth={1100} gap={28} sx={{ pt: "36px", pb: "64px" }}>
      <SectionHeading
        level="h1"
        eyebrow="Just for my clients"
        eyebrowFontSize={30}
        title="My Hub"
      />
      {!unlocked ? (
        <LockedHub onPreview={() => setPreview(true)} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {deal ? <DealTracker deal={deal} /> : !dealQuery.isLoading && <NoDealYet />}
          <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(420, "fit"), gap: "22px" }}>
            <HomeValueTracker />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  bgcolor: SV.accSoft,
                  borderRadius: "12px",
                  p: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="script">Happy home-iversary</Typography>
                <Box
                  component="span"
                  sx={{ fontFamily: FONTS.serif, fontSize: 22, lineHeight: 1.25 }}
                >
                  Each year on your closing date, I'll text you a value update and a little
                  something from my kitchen.
                </Box>
              </Box>
              <Box
                sx={{
                  ...panelSx,
                  p: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 21 }}>
                  Thinking of selling?
                </Box>
                <Typography variant="body2" sx={{ color: COLORS.body }}>
                  Start with my seller prep list. It covers repairs, staging, and whether your city
                  requires a point-of-sale inspection.
                </Typography>
                <Button variant="outlined" component={RouterLink} to={todosPath("sell")}>
                  Open seller prep list
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </PageSection>
  );
}
