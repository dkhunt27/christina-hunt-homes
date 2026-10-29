import { ArrowLink } from "../../components/arrow-link";
import { ListingGrid } from "../../components/listing-grid";
import { PageSection } from "../../components/page-section";
import { SectionHeading } from "../../components/section-heading";
import { useListings } from "../../hooks/use-listings";
import { ROUTES } from "../../routes";

export function JustListedSection() {
  const { data: listings = [] } = useListings();
  const featured = listings.filter((l) => l.status === "New this week").slice(0, 3);
  return (
    <PageSection sx={{ py: "32px" }}>
      <SectionHeading
        eyebrow="Just listed"
        title="Fresh on the market"
        action={
          <ArrowLink to={ROUTES.SEARCH} sx={{ fontSize: 16, py: 1 }}>
            See all homes →
          </ArrowLink>
        }
        sx={{ mb: "22px" }}
      />
      <ListingGrid listings={featured} minCardWidth={280} gap={22} />
    </PageSection>
  );
}
