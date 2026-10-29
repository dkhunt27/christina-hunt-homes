import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhoneLoginModal } from "../components/phone-login-modal";
import { ROUTES } from "../routes";
import { renderWithProviders } from "../test/render-with-providers";
import ChecklistsPage from "./checklists-page";
import HomePage from "./home-page";
import HubPage from "./hub-page";
import KitchenPage from "./kitchen-page";
import ListingPage from "./listing-page";
import SavedPage from "./saved-page";
import SearchPage from "./search-page";
import TownDetailPage from "./town-detail-page";
import TownsPage from "./towns-page";

describe("pages render with sample data", () => {
  it("Home", async () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText("Cider-season house hunting")).toBeInTheDocument();
    expect(await screen.findByText("1118 Vinsetta Blvd")).toBeInTheDocument();
    expect(screen.getByText("Apple Cider Donut Cake")).toBeInTheDocument();
  });

  it("Search filters from the URL", async () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=Brighton" });
    expect(await screen.findByText("6120 Woodland Shores Dr")).toBeInTheDocument();
    expect(screen.getByText(/1 homes match/)).toBeInTheDocument();
  });

  it("Search shows the empty state", async () => {
    renderWithProviders(<SearchPage />, { route: "/search?q=Nowhere" });
    expect(await screen.findByText("Nothing yet. But homes come on daily.")).toBeInTheDocument();
  });

  it("Listing detail", async () => {
    renderWithProviders(<ListingPage />, { path: ROUTES.LISTING, route: "/listing/l4" });
    expect(await screen.findByText("455 Blunk St")).toBeInTheDocument();
    expect(screen.getByText("Homes like this one")).toBeInTheDocument();
    expect(screen.getByText("Christina's notes")).toBeInTheDocument();
  });

  it("Requesting a tour signs in by phone, then books it", async () => {
    renderWithProviders(
      <>
        <ListingPage />
        <PhoneLoginModal />
      </>,
      { path: ROUTES.LISTING, route: "/listing/l4" },
    );
    fireEvent.click(await screen.findByRole("button", { name: "Request a tour" }));
    expect(await screen.findByText("Where should I text you?")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Mobile number"), { target: { value: "3135550100" } });
    fireEvent.click(screen.getByRole("button", { name: "Text me a code" }));
    fireEvent.change(await screen.findByLabelText("6-digit code"), { target: { value: "123456" } });
    expect(screen.getByText("Demo: any 6 digits works")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(await screen.findByText(/You're on my calendar for/)).toBeInTheDocument();
  });

  it("Towns and a town guide", async () => {
    renderWithProviders(<TownsPage />);
    expect(screen.getByText("Town guides")).toBeInTheDocument();
    expect(screen.getByText("My go-to local pros")).toBeInTheDocument();

    renderWithProviders(<TownDetailPage />, {
      path: ROUTES.TOWN_DETAIL,
      route: "/towns/royal-oak",
    });
    expect(screen.getByText("Search homes in Royal Oak")).toBeInTheDocument();
  });

  it("Kitchen opens a recipe from the URL", () => {
    renderWithProviders(<KitchenPage />, { route: "/kitchen?recipe=cider" });
    expect(screen.getByText("You'll need")).toBeInTheDocument();
  });

  it("To-dos tracks progress and shows box labels on Moving day", () => {
    renderWithProviders(<ChecklistsPage />, { route: "/todos?tab=move" });
    expect(screen.getByText("Box labels")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /USPS change of address/ }));
    expect(screen.getByText(/1 of \d+ done/)).toBeInTheDocument();
  });

  it("Saved with nothing saved yet", () => {
    renderWithProviders(<SavedPage />);
    expect(screen.getByText("Tap the ♡ on any home to keep it here.")).toBeInTheDocument();
  });

  it("My Hub preview", () => {
    renderWithProviders(<HubPage />);
    fireEvent.click(screen.getByRole("button", { name: "Preview with sample data" }));
    expect(screen.getByText("1118 Vinsetta Blvd, Royal Oak")).toBeInTheDocument();
    expect(screen.getByText(/Wire fraud warning/)).toBeInTheDocument();
  });
});
