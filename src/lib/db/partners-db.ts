import { requireSupabase } from "../supabase";

/** The signed-in shopper's share code, created on first use. */
export async function getOrCreateShareCode(ownerId: string): Promise<string> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("partners")
    .select("share_code")
    .eq("owner_id", ownerId)
    .maybeSingle();
  if (error) throw error;
  const existing = (data as { share_code: string } | null)?.share_code;
  if (existing) return existing;
  const shareCode = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  const { error: insertError } = await db
    .from("partners")
    .insert({ owner_id: ownerId, share_code: shareCode });
  if (insertError) throw insertError;
  return shareCode;
}
