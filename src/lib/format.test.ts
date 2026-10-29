// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  formatPhone,
  formatPrice,
  formatPriceShort,
  isTenDigitPhone,
  monthlyPayment,
  toE164,
} from "./format";

describe("price formatting", () => {
  it("formats full and short prices", () => {
    expect(formatPrice(389000)).toBe("$389,000");
    expect(formatPriceShort(389000)).toBe("$389k");
    expect(formatPriceShort(1_250_000)).toBe("$1.3M");
  });
});

describe("monthlyPayment", () => {
  it("uses 20% down, 6.5% 30-year, 2.2% taxes and insurance, plus $120", () => {
    expect(monthlyPayment(389000)).toBe(2800);
  });
});

describe("phone helpers", () => {
  it("formats as the user types", () => {
    expect(formatPhone("313")).toBe("313");
    expect(formatPhone("3135")).toBe("(313) 5");
    expect(formatPhone("3135550142999")).toBe("(313) 555-0142");
  });

  it("validates and converts to E.164", () => {
    expect(isTenDigitPhone("(313) 555-0142")).toBe(true);
    expect(isTenDigitPhone("555-0142")).toBe(false);
    expect(toE164("(313) 555-0142")).toBe("+13135550142");
  });
});
