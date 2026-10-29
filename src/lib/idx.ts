import { SAMPLE_LISTINGS } from "../data/listings";
import type { Listing } from "../types";

/**
 * MLS listing feed client.
 *
 * Today this serves the design's sample listings. Production reads Realcomp MLS through an
 * IDX / RESO Web API vendor and maps each record to the `Listing` shape (id, address, area,
 * city, county, price, beds, baths, sqft, type, year, status, lat/lng, photos, desc). Keep
 * the vendor key server-side: call the vendor from a Supabase Edge Function (or a worker)
 * and fetch that endpoint here. The feed refreshes every 15 minutes, which is why
 * `useListings` uses a 15-minute stale time.
 */
export async function fetchListings(): Promise<Listing[]> {
  return SAMPLE_LISTINGS;
}

export async function fetchListing(id: string): Promise<Listing | null> {
  const listings = await fetchListings();
  return listings.find((l) => l.id === id) ?? null;
}
