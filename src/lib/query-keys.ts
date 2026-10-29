export const QK = {
  listings: () => ["listings"] as const,
  deal: (userId: string | undefined) => ["deal", userId] as const,
};
