import { requireSupabase } from "../supabase";

export async function getOwnedHomeAddress(userId: string): Promise<string> {
  const { data, error } = await requireSupabase()
    .from("owned_homes")
    .select("address")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as { address: string } | null)?.address ?? "";
}

export async function upsertOwnedHomeAddress(userId: string, address: string) {
  if (!address) return;
  const { error } = await requireSupabase()
    .from("owned_homes")
    .upsert({ user_id: userId, address }, { onConflict: "user_id" });
  if (error) throw error;
}
