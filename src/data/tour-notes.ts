import type { RatingCategory } from "../types";

export const RATE_CATS: [RatingCategory, string][] = [
  ["kitchen", "Kitchen"],
  ["layout", "Layout & light"],
  ["outside", "Yard & outside"],
  ["street", "Street & neighborhood"],
];

export const TAKES = ["Love it", "Maybe", "Pass"] as const;
