import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SiteStateProvider } from "../contexts/site-state-context";
import { ToastProvider } from "../contexts/toast-context";
import { AuthProvider } from "../hooks/use-auth";
import { SeasonProvider } from "../theme/season-provider";

type Options = { path?: string; route?: string; now?: Date };

/** Renders `ui` with every app provider, at `route` matched against `path`. */
export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const { path = "*", route = "/", now = new Date(2026, 9, 15) } = options;
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <SeasonProvider now={now}>
        <ToastProvider>
          <AuthProvider>
            <SiteStateProvider>
              <MemoryRouter initialEntries={[route]}>
                <Routes>
                  <Route path={path} element={ui} />
                </Routes>
              </MemoryRouter>
            </SiteStateProvider>
          </AuthProvider>
        </ToastProvider>
      </SeasonProvider>
    </QueryClientProvider>,
  );
}
