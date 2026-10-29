import type { SavedSearch, Take, TourNote } from "../types";

/** Same key as the prototype, so hearts saved there carry over. */
export const STORAGE_KEY = "chuntHome_v2";

/** Everything a visitor can do without an account. Synced to Supabase after phone sign-in. */
export type LocalState = {
  favs: string[];
  searches: SavedSearch[];
  checks: Record<string, boolean>;
  notes: Record<string, TourNote>;
  takes: Record<string, Take>;
  alertsOff: Record<string, boolean>;
  partner: boolean;
  homeAddr: string;
};

export const EMPTY_STATE: LocalState = {
  favs: [],
  searches: [],
  checks: {},
  notes: {},
  takes: {},
  alertsOff: {},
  partner: false,
  homeAddr: "",
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Accepts the prototype's shapes too (numeric search ids). */
export function normalizeState(raw: unknown): LocalState {
  if (!isRecord(raw)) return { ...EMPTY_STATE };
  const notes: Record<string, TourNote> = {};
  if (isRecord(raw.notes)) {
    for (const [id, n] of Object.entries(raw.notes)) {
      if (typeof n === "string") notes[id] = { r: {}, text: n };
      else if (isRecord(n)) {
        notes[id] = {
          r: isRecord(n.r) ? (n.r as TourNote["r"]) : {},
          text: typeof n.text === "string" ? n.text : "",
        };
      }
    }
  }
  return {
    favs: Array.isArray(raw.favs) ? raw.favs.filter((f) => typeof f === "string") : [],
    searches: Array.isArray(raw.searches)
      ? (raw.searches as SavedSearch[]).map((s) => ({
          ...s,
          id: String(s.id),
          county: s.county ?? "Any",
          dest: s.dest ?? "none",
          maxMin: s.maxMin ?? "30",
        }))
      : [],
    checks: isRecord(raw.checks) ? (raw.checks as Record<string, boolean>) : {},
    notes,
    takes: isRecord(raw.takes) ? (raw.takes as Record<string, Take>) : {},
    alertsOff: isRecord(raw.alertsOff) ? (raw.alertsOff as Record<string, boolean>) : {},
    partner: Boolean(raw.partner),
    homeAddr: typeof raw.homeAddr === "string" ? raw.homeAddr : "",
  };
}

export function readLocalState(): LocalState {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
  } catch {
    return { ...EMPTY_STATE };
  }
}

export function writeLocalState(state: LocalState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or full storage: the session keeps working from memory.
  }
}

/**
 * Merges what's on this device with what's already saved to the account.
 * Hearts, searches and checks are unioned; per-home notes and takes prefer this device.
 */
export function mergeStates(local: LocalState, remote: LocalState): LocalState {
  const searchIds = new Set(local.searches.map((s) => s.id));
  const notes = { ...remote.notes };
  for (const [id, n] of Object.entries(local.notes)) {
    if (n.text || Object.values(n.r).some(Boolean)) notes[id] = n;
  }
  const checks = { ...remote.checks };
  for (const [key, done] of Object.entries(local.checks)) checks[key] = done || !!checks[key];
  return {
    favs: [...local.favs, ...remote.favs.filter((id) => !local.favs.includes(id))],
    searches: [...local.searches, ...remote.searches.filter((s) => !searchIds.has(s.id))],
    checks,
    notes,
    takes: { ...remote.takes, ...local.takes },
    alertsOff: { ...remote.alertsOff, ...local.alertsOff },
    partner: local.partner || remote.partner,
    homeAddr: local.homeAddr || remote.homeAddr,
  };
}

/** Average of the non-zero tour ratings, to one decimal, or null if unrated. */
export function tourScore(note: TourNote | undefined) {
  if (!note) return null;
  const values = Object.values(note.r).filter((v): v is number => !!v);
  if (!values.length) return null;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
}
