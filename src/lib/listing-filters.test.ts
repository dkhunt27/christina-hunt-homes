// @vitest-environment node
import { describe, expect, it } from "vitest";
import { SAMPLE_LISTINGS } from "../data/listings";
import { estimateCommute } from "./commute";
import {
  DEFAULT_FILTERS,
  describeSearch,
  filterListings,
  filtersFromParams,
  listingsInTown,
  similarListings,
} from "./listing-filters";

const ids = (ls: { id: string }[]) => ls.map((l) => l.id);

describe("filterListings", () => {
  it("returns everything with default filters", () => {
    expect(filterListings(SAMPLE_LISTINGS, DEFAULT_FILTERS)).toHaveLength(SAMPLE_LISTINGS.length);
  });

  it("matches the query against area, city, address and county", () => {
    expect(ids(filterListings(SAMPLE_LISTINGS, { q: "royal oak" }))).toEqual(["l1"]);
    expect(ids(filterListings(SAMPLE_LISTINGS, { q: "Macomb" }))).toEqual(["l8"]);
    expect(filterListings(SAMPLE_LISTINGS, { q: "detroit" }).length).toBeGreaterThanOrEqual(2);
  });

  it("applies price, beds, type and county", () => {
    const result = filterListings(SAMPLE_LISTINGS, {
      ...DEFAULT_FILTERS,
      maxPrice: "400000",
      beds: "3",
      type: "House",
      county: "Oakland",
    });
    expect(ids(result).sort()).toEqual(["l1", "l9"]);
  });

  it("applies the commute filter", () => {
    const result = filterListings(SAMPLE_LISTINGS, {
      ...DEFAULT_FILTERS,
      dest: "annarbor",
      maxMin: "20",
    });
    expect(result.length).toBeGreaterThan(0);
    for (const l of result) expect(estimateCommute(l, "annarbor")).toBeLessThanOrEqual(20);
  });
});

describe("describeSearch", () => {
  it("names a search from its filters", () => {
    expect(describeSearch(DEFAULT_FILTERS)).toBe("All of Southeast Michigan");
    expect(
      describeSearch({
        ...DEFAULT_FILTERS,
        q: "Ferndale",
        maxPrice: "400000",
        beds: "3",
        dest: "troy",
      }),
    ).toBe("Ferndale · up to $400k · 3+ beds · 30 min to Troy");
  });
});

describe("filtersFromParams", () => {
  it("falls back to defaults and rejects unknown destinations", () => {
    const f = filtersFromParams(new URLSearchParams("q=Brighton&dest=mars"));
    expect(f.q).toBe("Brighton");
    expect(f.dest).toBe("none");
    expect(f.beds).toBe("0");
  });
});

describe("similarListings / listingsInTown", () => {
  it("picks the three closest in price, excluding the listing", () => {
    const current = SAMPLE_LISTINGS[0];
    const similar = similarListings(SAMPLE_LISTINGS, current);
    expect(similar).toHaveLength(3);
    expect(ids(similar)).not.toContain(current.id);
  });

  it("matches towns by city substring", () => {
    expect(ids(listingsInTown(SAMPLE_LISTINGS, { match: "Grosse Pointe" }))).toEqual(["l6"]);
  });
});
