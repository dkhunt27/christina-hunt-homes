import { requireSupabase } from "../supabase";

export type DealStep = { title: string; desc: string; date: Date };
export type Deal = { address: string; steps: DealStep[] };

type DealRow = { address: string; steps: { title: string; desc: string; date: string }[] };

/** The client's most recent deal, or null. Christina enters deals with the service role. */
export async function getLatestDeal(userId: string): Promise<Deal | null> {
  const { data, error } = await requireSupabase()
    .from("deals")
    .select("address, steps")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  const row = data as DealRow | null;
  if (!row) return null;
  return {
    address: row.address,
    steps: row.steps.map((s) => ({ ...s, date: new Date(`${s.date}T12:00:00`) })),
  };
}
