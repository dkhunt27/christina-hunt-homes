import type { TourNote } from "../../types";
import { requireSupabase } from "../supabase";

type TourNoteRow = { listing_id: string; ratings: TourNote["r"]; text: string };

export async function getTourNotes(userId: string): Promise<Record<string, TourNote>> {
  const { data, error } = await requireSupabase()
    .from("tour_notes")
    .select("listing_id, ratings, text")
    .eq("user_id", userId);
  if (error) throw error;
  return Object.fromEntries(
    ((data ?? []) as TourNoteRow[]).map((r) => [
      r.listing_id,
      { r: r.ratings ?? {}, text: r.text },
    ]),
  );
}

export async function upsertTourNotes(userId: string, notes: Record<string, TourNote>) {
  const rows = Object.entries(notes).map(([listing_id, n]) => ({
    user_id: userId,
    listing_id,
    ratings: n.r,
    text: n.text,
    updated_at: new Date().toISOString(),
  }));
  if (!rows.length) return;
  const { error } = await requireSupabase()
    .from("tour_notes")
    .upsert(rows, { onConflict: "user_id,listing_id" });
  if (error) throw error;
}
