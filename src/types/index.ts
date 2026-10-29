export type Season = "fall" | "winter" | "spring" | "summer";

/** Shape every IDX listing is mapped to (see src/lib/idx.ts). */
export type Listing = {
  id: string;
  address: string;
  area: string;
  city: string;
  county: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  year: number;
  status: string;
  /** Sample-map position in percent. Real listings carry lat/lng instead. */
  x: number;
  y: number;
  lat?: number;
  lng?: number;
  photos?: string[];
  desc: string;
  features: string[];
};

export type Town = {
  id: string;
  name: string;
  county: string;
  /** Substring matched against `Listing.city` to count and list a town's homes. */
  match: string;
  tag: string;
  vibe: string;
  schools: string;
  range: string;
  around: string;
  fav: string;
};

export type SiteEvent = { name: string; when: string; where: string };

export type Story = { quote: string; who: string; where: string };

export type Pro = { cat: string; note: string; name?: string };

export type Recipe = {
  id: string;
  name: string;
  time: string;
  serves: number;
  note: string;
  ingredients: string[];
  steps: string[];
};

export type ChecklistKey = "buy" | "sell" | "move";

/** `items` are [text, tip] pairs. */
export type ChecklistPhase = { title: string; when: string; items: [string, string][] };

export type CommuteDestination = "detroit" | "annarbor" | "troy" | "dtw";

export type ListingFilters = {
  q: string;
  maxPrice: string;
  beds: string;
  type: string;
  county: string;
  dest: CommuteDestination | "none";
  maxMin: string;
};

export type SavedSearch = ListingFilters & { id: string; name: string };

export type Take = "Love it" | "Maybe" | "Pass";

export type TourNote = { r: Partial<Record<RatingCategory, number>>; text: string };

export type RatingCategory = "kitchen" | "layout" | "outside" | "street";
