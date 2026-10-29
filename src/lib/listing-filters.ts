import type { CommuteDestination, Listing, ListingFilters, Town } from "../types";
import { DESTS, estimateCommute } from "./commute";
import { formatPriceShort } from "./format";

export const DEFAULT_FILTERS: ListingFilters = {
  q: "",
  maxPrice: "any",
  beds: "0",
  type: "Any",
  county: "Any",
  dest: "none",
  maxMin: "30",
};

const DEST_VALUES = new Set<string>([...Object.keys(DESTS), "none"]);

/** Reads filters from URL search params, falling back to defaults for anything invalid. */
export function filtersFromParams(params: URLSearchParams): ListingFilters {
  const get = (key: keyof ListingFilters) => params.get(key) ?? DEFAULT_FILTERS[key];
  const dest = get("dest");
  return {
    q: get("q"),
    maxPrice: get("maxPrice"),
    beds: get("beds"),
    type: get("type"),
    county: get("county"),
    dest: DEST_VALUES.has(dest) ? (dest as CommuteDestination | "none") : "none",
    maxMin: get("maxMin"),
  };
}

/** Text query matches area, city, address and "<county> county". */
export function filterListings(listings: Listing[], f: Partial<ListingFilters>) {
  const q = (f.q ?? "").trim().toLowerCase();
  return listings.filter((l) => {
    const haystack = `${l.area} ${l.city} ${l.address} ${l.county} county`.toLowerCase();
    if (q && !haystack.includes(q)) return false;
    if (f.maxPrice && f.maxPrice !== "any" && l.price > Number(f.maxPrice)) return false;
    if (l.beds < Number(f.beds ?? 0)) return false;
    if (f.type && f.type !== "Any" && l.type !== f.type) return false;
    if (f.county && f.county !== "Any" && l.county !== f.county) return false;
    if (f.dest && f.dest !== "none" && estimateCommute(l, f.dest) > Number(f.maxMin ?? 30)) {
      return false;
    }
    return true;
  });
}

/** "Royal Oak · up to $400k · 3+ beds · houses · Oakland County · 30 min to Troy" */
export function describeSearch(f: ListingFilters) {
  const parts = [f.q.trim() || "All of Southeast Michigan"];
  if (f.maxPrice !== "any") parts.push(`up to ${formatPriceShort(Number(f.maxPrice))}`);
  if (f.beds !== "0") parts.push(`${f.beds}+ beds`);
  if (f.type !== "Any") parts.push(`${f.type.toLowerCase()}s`);
  if (f.county !== "Any") parts.push(`${f.county} County`);
  if (f.dest !== "none") parts.push(`${f.maxMin} min to ${DESTS[f.dest].label}`);
  return parts.join(" · ");
}

/** The `count` listings closest in price, excluding the listing itself. */
export function similarListings(listings: Listing[], current: Listing, count = 3) {
  return listings
    .filter((l) => l.id !== current.id)
    .sort((a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price))
    .slice(0, count);
}

export function listingsInTown(listings: Listing[], town: Pick<Town, "match">) {
  return listings.filter((l) => l.city.includes(town.match));
}

export function homesForSaleLabel(n: number) {
  return `${n} ${n === 1 ? "home" : "homes"} for sale`;
}
