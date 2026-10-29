import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SiteLayout } from "./components/site-layout";
import { SiteStateProvider } from "./contexts/site-state-context";
import { ToastProvider } from "./contexts/toast-context";
import { AuthProvider } from "./hooks/use-auth";
import { ROUTES } from "./routes";
import { SeasonProvider } from "./theme/season-provider";

const HomePage = lazy(() => import("./pages/home-page"));
const SearchPage = lazy(() => import("./pages/search-page"));
const ListingPage = lazy(() => import("./pages/listing-page"));
const TownsPage = lazy(() => import("./pages/towns-page"));
const TownDetailPage = lazy(() => import("./pages/town-detail-page"));
const KitchenPage = lazy(() => import("./pages/kitchen-page"));
const ChecklistsPage = lazy(() => import("./pages/checklists-page"));
const SavedPage = lazy(() => import("./pages/saved-page"));
const HubPage = lazy(() => import("./pages/hub-page"));
const NotFoundPage = lazy(() => import("./pages/not-found-page"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SeasonProvider>
        <ToastProvider>
          <AuthProvider>
            <SiteStateProvider>
              <Router>
                <Routes>
                  <Route element={<SiteLayout />}>
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.SEARCH} element={<SearchPage />} />
                    <Route path={ROUTES.LISTING} element={<ListingPage />} />
                    <Route path={ROUTES.TOWNS} element={<TownsPage />} />
                    <Route path={ROUTES.TOWN_DETAIL} element={<TownDetailPage />} />
                    <Route path={ROUTES.KITCHEN} element={<KitchenPage />} />
                    <Route path={ROUTES.TODOS} element={<ChecklistsPage />} />
                    <Route path={ROUTES.SAVED} element={<SavedPage />} />
                    <Route path={ROUTES.HUB} element={<HubPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Router>
            </SiteStateProvider>
          </AuthProvider>
        </ToastProvider>
      </SeasonProvider>
    </QueryClientProvider>
  );
}
