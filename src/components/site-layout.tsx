import Box from "@mui/material/Box";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSeason } from "../theme/season-provider";
import { DebugThemePanel } from "./debug-theme-panel";
import { Header } from "./header";
import { PhoneLoginModal } from "./phone-login-modal";
import { ScrollManager } from "./scroll-manager";
import { SeasonBanner } from "./season-banner";
import { SeasonalFx } from "./seasonal-fx";
import { SiteFooter } from "./site-footer";
import { TextChristinaFab } from "./text-christina-fab";
import { Toast } from "./toast";

/** Shell for every page: banner, sticky header, footer and the floating global elements. */
export function SiteLayout() {
  const { fxMode } = useSeason();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollManager />
      <SeasonBanner />
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {fxMode === "festive" && <SeasonalFx variant="festive" />}
        <Suspense fallback={<Box sx={{ minHeight: "60vh" }} />}>
          <Outlet />
        </Suspense>
      </Box>
      <SiteFooter />
      <TextChristinaFab />
      <DebugThemePanel />
      <Toast />
      <PhoneLoginModal />
    </Box>
  );
}
