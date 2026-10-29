import { supabase } from "../supabase";

export type LeadType = "home_worth" | "porch_report" | "tour";

export type NewLead = {
  type: LeadType;
  contact: string;
  address?: string;
  listingId?: string;
  /** ISO date (yyyy-mm-dd) for tour requests. */
  tourDate?: string;
};

/**
 * Records a home-worth request, Porch Report signup or tour request for Christina.
 * Anyone can insert; nobody can read leads through the API (see the RLS policies).
 * Without Supabase configured this is a no-op so the site still works on sample data.
 */
export async function createLead(lead: NewLead) {
  if (!supabase) {
    console.info("[leads] Supabase not configured; lead not stored", lead);
    return;
  }
  const { error } = await supabase.from("leads").insert({
    type: lead.type,
    contact: lead.contact,
    address: lead.address ?? null,
    listing_id: lead.listingId ?? null,
    tour_date: lead.tourDate ?? null,
  });
  if (error) throw error;
}
