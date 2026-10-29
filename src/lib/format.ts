/** "$389,000" */
export function formatPrice(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** "$389k", "$1.2M" (map pins, saved-search names). */
export function formatPriceShort(n: number) {
  return n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${Math.round(n / 1000)}k`;
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

/** 20% down, 30-year fixed at 6.5%, plus 2.2%/yr taxes & insurance, plus $120/mo. */
export function monthlyPayment(price: number) {
  const principal = price * 0.8;
  const rate = 0.065 / 12;
  const months = 360;
  const loan = (principal * rate) / (1 - (1 + rate) ** -months);
  return Math.round(loan + (price * 0.022) / 12 + 120);
}

/** Formats as the user types: "(313) 555-0142". */
export function formatPhone(input: string) {
  const d = input.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function phoneDigits(input: string) {
  return input.replace(/\D/g, "");
}

export function isTenDigitPhone(input: string) {
  return phoneDigits(input).length === 10;
}

/** E.164 for Supabase Auth: "+13135550142". Assumes a US number. */
export function toE164(input: string) {
  return `+1${phoneDigits(input).slice(-10)}`;
}

/** Stable 32-bit string hash, for deterministic sample values. */
export function hashString(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function addDays(offset: number, from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + offset);
  return d;
}

/** "Nov 18" */
export function dayLabel(offset: number, from = new Date()) {
  return addDays(offset, from).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
