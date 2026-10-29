import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { autoGrid } from "../theme/tokens";
import type { Listing } from "../types";
import { ListingCard } from "./listing-card";

type ListingGridProps = {
  listings: Listing[];
  /** Minimum card width in px before the grid adds a column. */
  minCardWidth?: number;
  gap?: number;
  commuteFor?: (listing: Listing) => string | undefined;
  /** Rendered as the last grid item (e.g. an empty state spanning all columns). */
  children?: ReactNode;
};

export function ListingGrid({
  listings,
  minCardWidth = 260,
  gap = 18,
  commuteFor,
  children,
}: ListingGridProps) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: autoGrid(minCardWidth), gap: `${gap}px` }}>
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} commuteText={commuteFor?.(l)} />
      ))}
      {children}
    </Box>
  );
}
