import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../components/page-section";
import { CONTACT } from "../constants";
import { useSiteState } from "../contexts/site-state-context";
import { useToast } from "../contexts/toast-context";
import { useAuth } from "../hooks/use-auth";
import { useListings } from "../hooks/use-listings";
import { getOrCreateShareCode } from "../lib/db/partners-db";
import { hashString } from "../lib/format";
import { filterListings } from "../lib/listing-filters";
import { searchPath } from "../routes";
import { autoGrid, COLORS, cardSx, FONTS, panelSx, SV } from "../theme/tokens";
import { SavedListing } from "./saved/saved-listing";

function PartnerCard() {
  const { partner, setPartner } = useSiteState();
  const { user } = useAuth();
  const { showToast } = useToast();

  async function invite() {
    let code = String(hashString(user?.phone ?? "guest") % 99999);
    if (user && !user.demo) {
      try {
        code = await getOrCreateShareCode(user.id);
      } catch (e) {
        console.error("[partners] could not create share link", e);
      }
    }
    try {
      await navigator.clipboard?.writeText(`${CONTACT.shareBaseUrl}${code}`);
    } catch {
      // Clipboard blocked; the toast still explains what to do.
    }
    setPartner(true);
    showToast("Share link copied. Text it to whoever is house hunting with you.");
  }

  return (
    <Box
      sx={{
        ...panelSx,
        p: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <Box component="span" sx={{ fontFamily: FONTS.serif, fontSize: 21 }}>
        Shopping with someone?
      </Box>
      <Box component="span" sx={{ fontSize: 15, color: COLORS.body, lineHeight: 1.5 }}>
        {partner
          ? "Your partner can see your hearts and tour notes, and add their own take on each home."
          : "Invite a partner, parent, or friend to see your hearts and add their take. They don't need an account either."}
      </Box>
      <Button variant="outlined" onClick={invite} sx={{ px: 2 }}>
        {partner ? "Copy share link" : "Invite someone"}
      </Button>
    </Box>
  );
}

export default function SavedPage() {
  const { favs, searches, removeSearch } = useSiteState();
  const { user, openSignIn } = useAuth();
  const { data: listings = [] } = useListings();
  const navigate = useNavigate();
  const saved = listings.filter((l) => favs.includes(l.id));

  return (
    <PageSection gap={28} sx={{ pt: "36px", pb: "64px" }}>
      <div>
        <Typography variant="h1" sx={{ fontSize: { xs: 34, sm: 40 } }}>
          Your saved homes
        </Typography>
        <Typography sx={{ mt: 1, color: COLORS.body, maxWidth: 640, lineHeight: 1.55 }}>
          Hearts are saved on this device, no account needed. Add your phone to get price-drop texts
          and see your list anywhere.
        </Typography>
      </div>

      <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(360, "fit"), gap: 2 }}>
        {!user && (
          <Box
            sx={{
              bgcolor: SV.accSoft,
              borderRadius: "12px",
              p: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <Box component="span" sx={{ fontSize: 17 }}>
              <strong>No password, ever.</strong> We'll text you a 6-digit code.
            </Box>
            <Button variant="contained" onClick={openSignIn}>
              Sync with my phone
            </Button>
          </Box>
        )}
        <PartnerCard />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Typography variant="h2" sx={{ fontSize: 26 }}>
          Homes you've hearted
        </Typography>
        {saved.length ? (
          <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(280), gap: "20px" }}>
            {saved.map((l) => (
              <SavedListing key={l.id} listing={l} />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: COLORS.meta, fontSize: 15 }}>
            Tap the ♡ on any home to keep it here.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Typography variant="h2" sx={{ fontSize: 26 }}>
          Saved searches
        </Typography>
        {searches.length ? (
          searches.map((s) => (
            <Box
              key={s.id}
              sx={{
                ...cardSx,
                p: "16px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <Box sx={{ fontSize: 16, fontWeight: 600 }}>{s.name}</Box>
                <Box sx={{ fontSize: 13, color: COLORS.meta, mt: "2px" }}>
                  Texting you new matches · {filterListings(listings, s).length} homes now
                </Box>
              </div>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    const { id: _id, name: _name, ...filters } = s;
                    navigate(searchPath(filters));
                  }}
                >
                  View
                </Button>
                <Button
                  size="small"
                  onClick={() => removeSearch(s.id)}
                  sx={{ border: `1px solid ${COLORS.lineStrong}`, color: COLORS.body }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: COLORS.meta, fontSize: 15 }}>
            None yet. Set your filters on Find a home and tap "Text me new matches."
          </Typography>
        )}
      </Box>
    </PageSection>
  );
}
