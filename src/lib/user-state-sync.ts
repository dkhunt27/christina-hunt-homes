import type { Take } from "../types";
import { getChecklistProgress, upsertChecklistProgress } from "./db/checklist-progress-db";
import { getFavorites, replaceFavorites } from "./db/favorites-db";
import { getOwnedHomeAddress, upsertOwnedHomeAddress } from "./db/owned-homes-db";
import { getSavedSearches, replaceSavedSearches } from "./db/saved-searches-db";
import { getTourNotes, upsertTourNotes } from "./db/tour-notes-db";
import { EMPTY_STATE, type LocalState } from "./storage";

/** Loads everything saved to the account, in the localStorage shape. */
export async function pullRemoteState(userId: string): Promise<LocalState> {
  const [favorites, searches, notes, checks, homeAddr] = await Promise.all([
    getFavorites(userId),
    getSavedSearches(userId),
    getTourNotes(userId),
    getChecklistProgress(userId),
    getOwnedHomeAddress(userId),
  ]);
  const takes: Record<string, Take> = {};
  const alertsOff: Record<string, boolean> = {};
  for (const f of favorites) {
    if (f.take) takes[f.listing_id] = f.take;
    if (!f.alerts_on) alertsOff[f.listing_id] = true;
  }
  return {
    ...EMPTY_STATE,
    favs: favorites.map((f) => f.listing_id),
    searches,
    notes,
    checks,
    takes,
    alertsOff,
    homeAddr,
  };
}

/** Writes this device's state to the account. */
export async function pushLocalState(userId: string, state: LocalState) {
  await Promise.all([
    replaceFavorites(
      userId,
      state.favs.map((id) => ({
        listing_id: id,
        take: state.takes[id] ?? null,
        alerts_on: !state.alertsOff[id],
      })),
    ),
    replaceSavedSearches(userId, state.searches),
    upsertTourNotes(userId, state.notes),
    upsertChecklistProgress(userId, state.checks),
    upsertOwnedHomeAddress(userId, state.homeAddr),
  ]);
}
