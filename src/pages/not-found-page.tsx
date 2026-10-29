import Typography from "@mui/material/Typography";
import { ArrowLink } from "../components/arrow-link";
import { PageSection } from "../components/page-section";
import { ROUTES } from "../routes";

export default function NotFoundPage() {
  return (
    <PageSection gap={16} sx={{ py: "64px" }}>
      <Typography variant="h1">That page isn't here.</Typography>
      <ArrowLink to={ROUTES.HOME}>Come back home →</ArrowLink>
    </PageSection>
  );
}
