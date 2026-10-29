import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SAMPLE_LISTINGS } from "../data/listings";
import { STORAGE_KEY } from "../lib/storage";
import { renderWithProviders } from "../test/render-with-providers";
import { ListingCard } from "./listing-card";

const listing = SAMPLE_LISTINGS[0];

describe("ListingCard", () => {
  it("shows the listing summary and links to the detail page", () => {
    renderWithProviders(<ListingCard listing={listing} commuteText="28 min to Downtown Detroit" />);
    expect(screen.getByText("$389,000")).toBeInTheDocument();
    expect(screen.getByText("1118 Vinsetta Blvd")).toBeInTheDocument();
    expect(screen.getByText("New this week")).toBeInTheDocument();
    expect(screen.getByText("28 min to Downtown Detroit")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\$389,000/ })).toHaveAttribute("href", "/listing/l1");
  });

  it("hearts the home without an account and saves it on the device", () => {
    renderWithProviders(<ListingCard listing={listing} />);
    const heart = screen.getByRole("button", { name: "Save 1118 Vinsetta Blvd" });
    expect(heart).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(heart);
    expect(heart).toHaveAttribute("aria-pressed", "true");
    expect(heart).toHaveTextContent("♥");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").favs).toEqual(["l1"]);
  });
});
