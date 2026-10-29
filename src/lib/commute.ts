import type { CommuteDestination, Listing } from "../types";

export const DESTS: Record<CommuteDestination, { label: string; x: number; y: number }> = {
  detroit: { label: "Downtown Detroit", x: 58, y: 62 },
  annarbor: { label: "Downtown Ann Arbor", x: 14, y: 62 },
  troy: { label: "Troy", x: 60, y: 22 },
  dtw: { label: "DTW Airport", x: 36, y: 74 },
};

export const DEST_KEYS = Object.keys(DESTS) as CommuteDestination[];

/**
 * Typical weekday-morning drive in minutes.
 *
 * Placeholder: estimates from the sample map position, exactly like the prototype. The
 * production version should read drive times from a real matrix API (Mapbox Matrix or
 * Google Distance Matrix) computed once per listing when it arrives from the IDX feed and
 * cached with the listing, so search filtering stays synchronous.
 */
export function estimateCommute(listing: Pick<Listing, "x" | "y">, dest: CommuteDestination) {
  const d = DESTS[dest];
  return Math.round(Math.hypot(listing.x - d.x, (listing.y - d.y) * 0.8) * 0.7 + 7);
}

export function commuteLabel(listing: Pick<Listing, "x" | "y">, dest: CommuteDestination) {
  return `${estimateCommute(listing, dest)} min to ${DESTS[dest].label}`;
}
