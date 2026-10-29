import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { describeSearch } from "../lib/listing-filters";
import { type LocalState, mergeStates, readLocalState, writeLocalState } from "../lib/storage";
import { pullRemoteState, pushLocalState } from "../lib/user-state-sync";
import type { ListingFilters, RatingCategory, Take } from "../types";
import { useToast } from "./toast-context";

type SiteStateValue = LocalState & {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  toggleCheck: (key: string) => void;
  addSearch: (filters: ListingFilters) => void;
  removeSearch: (id: string) => void;
  setRating: (listingId: string, category: RatingCategory, value: number) => void;
  setNoteText: (listingId: string, text: string) => void;
  setTake: (listingId: string, take: Take) => void;
  toggleAlert: (listingId: string) => void;
  setPartner: (on: boolean) => void;
  setHomeAddr: (address: string) => void;
};

const SiteStateContext = createContext<SiteStateValue | null>(null);
const PUSH_DELAY_MS = 1200;

/**
 * Hearts, saved searches, tour notes, checklist checks and partner/home settings.
 * Local-first: always kept in localStorage. Once a real (non-demo) user signs in, the account's
 * saved data is merged in, and every later change is pushed to Supabase after a short pause.
 */
export function SiteStateProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [state, setState] = useState<LocalState>(readLocalState);
  const syncedUserId = useRef<string | null>(null);

  useEffect(() => writeLocalState(state), [state]);

  // Pull and merge once per sign-in.
  useEffect(() => {
    syncedUserId.current = null;
    if (!user || user.demo) return;
    let cancelled = false;
    pullRemoteState(user.id)
      .then((remote) => {
        if (cancelled) return;
        setState((local) => mergeStates(local, remote));
        syncedUserId.current = user.id;
      })
      .catch((error) => console.error("[sync] could not load saved data", error));
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Push changes (including the merge result) after a pause.
  useEffect(() => {
    const userId = syncedUserId.current;
    if (!userId || !user || user.id !== userId) return;
    const timer = window.setTimeout(() => {
      pushLocalState(userId, state).catch((error) =>
        console.error("[sync] could not save changes", error),
      );
    }, PUSH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state, user]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const adding = !state.favs.includes(id);
      setState((s) => ({
        ...s,
        favs: s.favs.includes(id) ? s.favs.filter((f) => f !== id) : [...s.favs, id],
      }));
      if (adding) showToast("Saved. I'll text you if the price drops.");
    },
    [state.favs, showToast],
  );

  const addSearch = useCallback(
    (filters: ListingFilters) => {
      setState((s) => ({
        ...s,
        searches: [
          ...s.searches,
          { ...filters, id: crypto.randomUUID(), name: describeSearch(filters) },
        ],
      }));
      showToast("Search saved. I'll text you new matches.");
    },
    [showToast],
  );

  const value = useMemo<SiteStateValue>(
    () => ({
      ...state,
      isFavorite: (id) => state.favs.includes(id),
      toggleFavorite,
      addSearch,
      toggleCheck: (key) =>
        setState((s) => ({ ...s, checks: { ...s.checks, [key]: !s.checks[key] } })),
      removeSearch: (id) =>
        setState((s) => ({ ...s, searches: s.searches.filter((x) => x.id !== id) })),
      setRating: (listingId, category, rating) =>
        setState((s) => {
          const note = s.notes[listingId] ?? { r: {}, text: "" };
          const next = note.r[category] === rating ? 0 : rating;
          return {
            ...s,
            notes: { ...s.notes, [listingId]: { ...note, r: { ...note.r, [category]: next } } },
          };
        }),
      setNoteText: (listingId, text) =>
        setState((s) => {
          const note = s.notes[listingId] ?? { r: {}, text: "" };
          return { ...s, notes: { ...s.notes, [listingId]: { ...note, text } } };
        }),
      setTake: (listingId, take) =>
        setState((s) => {
          const takes = { ...s.takes };
          if (takes[listingId] === take) delete takes[listingId];
          else takes[listingId] = take;
          return { ...s, takes };
        }),
      toggleAlert: (listingId) =>
        setState((s) => ({
          ...s,
          alertsOff: { ...s.alertsOff, [listingId]: !s.alertsOff[listingId] },
        })),
      setPartner: (partner) => setState((s) => ({ ...s, partner })),
      setHomeAddr: (homeAddr) => setState((s) => ({ ...s, homeAddr })),
    }),
    [state, toggleFavorite, addSearch],
  );

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState() {
  const value = useContext(SiteStateContext);
  if (!value) throw new Error("useSiteState must be used inside SiteStateProvider");
  return value;
}
