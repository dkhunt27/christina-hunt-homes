// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getSeason, THEMES } from "./seasons";

describe("getSeason", () => {
  it.each([
    [0, "winter"],
    [1, "winter"],
    [2, "spring"],
    [4, "spring"],
    [5, "summer"],
    [7, "summer"],
    [8, "fall"],
    [10, "fall"],
    [11, "winter"],
  ])("month index %i is %s", (month, season) => {
    expect(getSeason(new Date(2026, month, 15))).toBe(season);
  });
});

describe("THEMES", () => {
  it("defines every seasonal variable for every season", () => {
    const keys = Object.keys(THEMES.fall).sort();
    for (const theme of Object.values(THEMES)) expect(Object.keys(theme).sort()).toEqual(keys);
  });

  it("uses the buffalo-check gingham in winter", () => {
    expect(THEMES.winter.gingB).toBe("#A8392B");
  });
});
