import type { ListingFilters, SavedSearch } from "../../types";
import { requireSupabase } from "../supabase";
import { postgrestList } from "./favorites-db";

type SavedSearchRow = { id: string; name: string; filters: ListingFilters };

export async function getSavedSearches(userId: string): Promise<SavedSearch[]> {
  const { data, error } = await requireSupabase()
    .from("saved_searches")
    .select("id, name, filters")
    .eq("user_id", userId)
    .order("created_at");
  if (error) throw error;
  return ((data ?? []) as SavedSearchRow[]).map((r) => ({ ...r.filters, id: r.id, name: r.name }));
}

/** Makes the account's saved searches exactly match `searches`. */
export async function replaceSavedSearches(userId: string, searches: SavedSearch[]) {
  const db = requireSupabase();
  const del = db.from("saved_searches").delete().eq("user_id", userId);
  const { error: delError } = searches.length
    ? await del.not("id", "in", postgrestList(searches.map((s) => s.id)))
    : await del;
  if (delError) throw delError;
  if (!searches.length) return;
  const rows = searches.map(({ id, name, ...filters }) => ({ id, name, filters, user_id: userId }));
  const { error } = await db.from("saved_searches").upsert(rows, { onConflict: "user_id,id" });
  if (error) throw error;
}
