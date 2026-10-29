import type { Take } from "../../types";
import { requireSupabase } from "../supabase";

export type FavoriteRow = { listing_id: string; take: Take | null; alerts_on: boolean };

/** PostgREST `in` list: ("a","b") */
export function postgrestList(values: string[]) {
  return `(${values.map((v) => `"${v.replace(/"/g, '\\"')}"`).join(",")})`;
}

export async function getFavorites(userId: string): Promise<FavoriteRow[]> {
  const { data, error } = await requireSupabase()
    .from("favorites")
    .select("listing_id, take, alerts_on")
    .eq("user_id", userId)
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as FavoriteRow[];
}

/** Makes the account's hearts exactly match `rows`. */
export async function replaceFavorites(userId: string, rows: FavoriteRow[]) {
  const db = requireSupabase();
  const del = db.from("favorites").delete().eq("user_id", userId);
  const { error: delError } = rows.length
    ? await del.not("listing_id", "in", postgrestList(rows.map((r) => r.listing_id)))
    : await del;
  if (delError) throw delError;
  if (!rows.length) return;
  const { error } = await db.from("favorites").upsert(
    rows.map((r) => ({ ...r, user_id: userId })),
    { onConflict: "user_id,listing_id" },
  );
  if (error) throw error;
}
