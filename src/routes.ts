import type { ChecklistKey, ListingFilters } from "./types";

/** Every app path. Never hardcode a path string; use these and the helpers below. */
export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  LISTING: "/listing/:id",
  TOWNS: "/towns",
  TOWN_DETAIL: "/towns/:slug",
  KITCHEN: "/kitchen",
  TODOS: "/todos",
  SAVED: "/saved",
  HUB: "/hub",
} as const;

/** Element ids that other pages deep-link to with a hash. */
export const ANCHORS = {
  EVENTS: "events",
  PROS: "pros",
} as const;

export function listingPath(id: string) {
  return ROUTES.LISTING.replace(":id", encodeURIComponent(id));
}

export function townPath(slug: string) {
  return ROUTES.TOWN_DETAIL.replace(":slug", encodeURIComponent(slug));
}

export function townsAnchorPath(anchor: (typeof ANCHORS)[keyof typeof ANCHORS]) {
  return `${ROUTES.TOWNS}#${anchor}`;
}

export function kitchenPath(recipeId?: string) {
  return recipeId ? `${ROUTES.KITCHEN}?recipe=${encodeURIComponent(recipeId)}` : ROUTES.KITCHEN;
}

export function todosPath(tab?: ChecklistKey) {
  return tab ? `${ROUTES.TODOS}?tab=${tab}` : ROUTES.TODOS;
}

/** Search URL with only the filters that differ from the defaults. */
export function searchPath(filters: Partial<ListingFilters> = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value && !SEARCH_DEFAULTS_SKIP.has(`${key}=${value}`)) params.set(key, value);
  }
  const query = params.toString();
  return query ? `${ROUTES.SEARCH}?${query}` : ROUTES.SEARCH;
}

const SEARCH_DEFAULTS_SKIP = new Set([
  "maxPrice=any",
  "beds=0",
  "type=Any",
  "county=Any",
  "dest=none",
  "maxMin=30",
]);
