// @vitest-environment node
import { describe, expect, it } from "vitest";
import { listingPath, ROUTES, searchPath, todosPath, townPath } from "./routes";

describe("route helpers", () => {
  it("builds detail paths", () => {
    expect(listingPath("l1")).toBe("/listing/l1");
    expect(townPath("royal-oak")).toBe("/towns/royal-oak");
    expect(todosPath("sell")).toBe("/todos?tab=sell");
  });

  it("drops default filters from search URLs", () => {
    expect(searchPath()).toBe(ROUTES.SEARCH);
    expect(searchPath({ q: "", maxPrice: "any", beds: "0" })).toBe(ROUTES.SEARCH);
    expect(searchPath({ q: "Royal Oak", beds: "3", dest: "none" })).toBe(
      "/search?q=Royal+Oak&beds=3",
    );
  });
});
