import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "../lib/idx";
import { QK } from "../lib/query-keys";

/** The IDX feed updates every 15 minutes. */
const FEED_STALE_MS = 15 * 60 * 1000;

export function useListings() {
  return useQuery({ queryKey: QK.listings(), queryFn: fetchListings, staleTime: FEED_STALE_MS });
}

/** Looks the listing up in the cached feed, so opening a card never refetches. */
export function useListing(id: string | undefined) {
  const query = useListings();
  return { ...query, data: query.data?.find((l) => l.id === id) ?? null };
}
