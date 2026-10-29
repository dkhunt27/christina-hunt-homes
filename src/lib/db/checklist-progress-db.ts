import { requireSupabase } from "../supabase";

/** Keys look like `buy-0-2` (checklist-phase-item) or `chore-fall-1`. */
export async function getChecklistProgress(userId: string): Promise<Record<string, boolean>> {
  const { data, error } = await requireSupabase()
    .from("checklist_progress")
    .select("key, done")
    .eq("user_id", userId);
  if (error) throw error;
  return Object.fromEntries(
    ((data ?? []) as { key: string; done: boolean }[]).map((r) => [r.key, r.done]),
  );
}

export async function upsertChecklistProgress(userId: string, checks: Record<string, boolean>) {
  const rows = Object.entries(checks).map(([key, done]) => ({
    user_id: userId,
    key,
    done,
    updated_at: new Date().toISOString(),
  }));
  if (!rows.length) return;
  const { error } = await requireSupabase()
    .from("checklist_progress")
    .upsert(rows, { onConflict: "user_id,key" });
  if (error) throw error;
}
