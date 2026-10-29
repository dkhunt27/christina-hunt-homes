import { hashString } from "./format";

/**
 * SAMPLE 12-month value series derived from the address, as in the prototype. Replace with a
 * monthly estimate from an AVM provider (or Christina's comps) stored per `owned_homes` row.
 */
export function sampleValueSeries(address: string) {
  const base = 280000 + (hashString(address) % 320000);
  return Array.from(
    { length: 12 },
    (_, i) => base * (0.958 + i * 0.0038 + ((hashString(address + i) % 10) - 5) / 1000),
  );
}
