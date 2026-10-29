// @vitest-environment node
import { describe, expect, it } from "vitest";
import { EMPTY_STATE, mergeStates, normalizeState, tourScore } from "./storage";

describe("normalizeState", () => {
  it("accepts the prototype's shapes", () => {
    const s = normalizeState({
      favs: ["l1", 7],
      searches: [
        { id: 1712345, name: "Royal Oak", q: "Royal Oak", maxPrice: "any", beds: "0", type: "Any" },
      ],
      notes: { l1: { r: { kitchen: 4 }, text: "nice" }, l2: "old string note" },
    });
    expect(s.favs).toEqual(["l1"]);
    expect(s.searches[0]).toMatchObject({
      id: "1712345",
      county: "Any",
      dest: "none",
      maxMin: "30",
    });
    expect(s.notes.l2).toEqual({ r: {}, text: "old string note" });
  });

  it("returns an empty state for junk", () => {
    expect(normalizeState("nope")).toEqual(EMPTY_STATE);
  });
});

describe("mergeStates", () => {
  it("unions hearts and checks and prefers this device's notes", () => {
    const local = {
      ...EMPTY_STATE,
      favs: ["l1", "l2"],
      checks: { "buy-0-0": true },
      notes: { l1: { r: { kitchen: 5 }, text: "" } },
      takes: { l1: "Love it" as const },
    };
    const remote = {
      ...EMPTY_STATE,
      favs: ["l2", "l3"],
      checks: { "buy-0-1": true, "buy-0-0": false },
      notes: { l1: { r: { kitchen: 2 }, text: "old" }, l3: { r: {}, text: "remote" } },
      takes: { l1: "Pass" as const, l3: "Maybe" as const },
      homeAddr: "1 Main St",
    };
    const merged = mergeStates(local, remote);
    expect(merged.favs).toEqual(["l1", "l2", "l3"]);
    expect(merged.checks).toEqual({ "buy-0-0": true, "buy-0-1": true });
    expect(merged.notes.l1.r.kitchen).toBe(5);
    expect(merged.notes.l3.text).toBe("remote");
    expect(merged.takes).toEqual({ l1: "Love it", l3: "Maybe" });
    expect(merged.homeAddr).toBe("1 Main St");
  });
});

describe("tourScore", () => {
  it("averages non-zero ratings", () => {
    expect(tourScore({ r: { kitchen: 4, layout: 5, outside: 0 }, text: "" })).toBe("4.5");
    expect(tourScore({ r: {}, text: "x" })).toBeNull();
    expect(tourScore(undefined)).toBeNull();
  });
});
