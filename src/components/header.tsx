import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { matchPath, Link as RouterLink, useLocation } from "react-router-dom";
import { CONTACT } from "../constants";
import { useSiteState } from "../contexts/site-state-context";
import { useAuth } from "../hooks/use-auth";
import { ROUTES } from "../routes";
import { COLORS, columnMaxWidth, FONTS, SV } from "../theme/tokens";
import { GinghamStrip } from "./gingham-strip";

type NavItem = { label: string; to: string; activeFor: string[] };

function useNavItems(): NavItem[] {
  const { favs } = useSiteState();
  return [
    { label: "Home", to: ROUTES.HOME, activeFor: [ROUTES.HOME] },
    { label: "Find a home", to: ROUTES.SEARCH, activeFor: [ROUTES.SEARCH, ROUTES.LISTING] },
    { label: "Towns", to: ROUTES.TOWNS, activeFor: [ROUTES.TOWNS, ROUTES.TOWN_DETAIL] },
    { label: "Kitchen", to: ROUTES.KITCHEN, activeFor: [ROUTES.KITCHEN] },
    { label: "To-dos", to: ROUTES.TODOS, activeFor: [ROUTES.TODOS] },
    {
      label: favs.length ? `Saved (${favs.length})` : "Saved",
      to: ROUTES.SAVED,
      activeFor: [ROUTES.SAVED],
    },
    { label: "My Hub", to: ROUTES.HUB, activeFor: [ROUTES.HUB] },
  ];
}

export function Header() {
  const { pathname } = useLocation();
  const { user, openSignIn } = useAuth();
  const items = useNavItems();
  return (
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 30, bgcolor: COLORS.paper }}>
      <Box
        sx={{
          maxWidth: columnMaxWidth(1200),
          mx: "auto",
          px: "24px",
          py: "14px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <Box
          component={RouterLink}
          to={ROUTES.HOME}
          aria-label={`${CONTACT.name}, home`}
          sx={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
        >
          <Box
            component="span"
            sx={{ fontFamily: FONTS.serif, fontSize: 23, lineHeight: 1, color: COLORS.ink }}
          >
            {CONTACT.name}
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: COLORS.meta,
              mt: "5px",
            }}
          >
            {CONTACT.brokerage} · {CONTACT.region}
          </Box>
        </Box>

        <Box
          component="nav"
          aria-label="Main"
          sx={{
            display: "flex",
            gap: "2px",
            flexWrap: "wrap",
            flexGrow: 1,
            minWidth: 0,
            // Phones: the nav takes its own row instead of squeezing beside the name.
            flexBasis: { xs: "auto", md: 0 },
          }}
        >
          {items.map((item) => {
            const active = item.activeFor.some((p) => matchPath({ path: p, end: true }, pathname));
            return (
              <ButtonBase
                key={item.to}
                component={RouterLink}
                to={item.to}
                aria-current={active ? "page" : undefined}
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: COLORS.ink,
                  px: "12px",
                  py: "9px",
                  borderRadius: "6px",
                  bgcolor: active ? SV.acc : "transparent",
                  transition: "background-color .2s",
                  "&:hover": { bgcolor: active ? SV.acc : "rgba(35,33,30,.05)" },
                }}
              >
                {item.label}
              </ButtonBase>
            );
          })}
        </Box>

        {user ? (
          <Box
            component="span"
            sx={{ fontSize: 14, color: COLORS.body, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              component="span"
              sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: COLORS.signedIn }}
            />
            Signed in · {user.phone.slice(-4)}
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={openSignIn}
            sx={{ fontSize: 14, py: "8px", px: "15px" }}
          >
            Sign in with phone
          </Button>
        )}
      </Box>
      <GinghamStrip topBorder />
    </Box>
  );
}
