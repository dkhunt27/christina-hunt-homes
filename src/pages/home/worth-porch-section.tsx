import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { FieldInput } from "../../components/field-input";
import { PageSection } from "../../components/page-section";
import { SMS_CONSENT } from "../../constants";
import { useToast } from "../../contexts/toast-context";
import { createLead } from "../../lib/db/leads-db";
import { formatPhone, isTenDigitPhone } from "../../lib/format";
import { isEmailOrPhone } from "../../lib/validation";
import { autoGrid, COLORS, panelSx, SV } from "../../theme/tokens";

const FORM_ERROR = "That didn't go through. Please try again, or just text me.";

function HomeWorthCard() {
  const { showToast } = useToast();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const mutation = useMutation({ mutationFn: createLead, onError: () => showToast(FORM_ERROR) });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!address.trim() || !isTenDigitPhone(phone)) {
      showToast("Add your address and a 10-digit mobile number.");
      return;
    }
    mutation.mutate({ type: "home_worth", address: address.trim(), contact: phone });
  }

  return (
    <Box
      sx={{
        bgcolor: SV.accSoft,
        borderRadius: "14px",
        p: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "background .4s",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: 30, lineHeight: 1.1 }}>
        Curious what your home is worth?
      </Typography>
      <Typography sx={{ color: COLORS.bodyStrong }}>
        Not a robot estimate. I'll look at real sales on your street and text you an honest number
        within a day. No pressure to list.
      </Typography>
      {mutation.isSuccess ? (
        <Box sx={{ bgcolor: COLORS.card, borderRadius: "10px", p: "20px", lineHeight: 1.55 }}>
          Got it, thank you! I'll text you a no-pressure estimate for <strong>{address}</strong>{" "}
          within a day. — Christina
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <FieldInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your home address"
            borderColor={COLORS.lineWarm}
            inputProps={{ "aria-label": "Your home address", autoComplete: "street-address" }}
          />
          <FieldInput
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="Mobile number"
            borderColor={COLORS.lineWarm}
            inputProps={{ "aria-label": "Mobile number", inputMode: "tel", autoComplete: "tel" }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={mutation.isPending}
            sx={{ py: "14px" }}
          >
            Text me my estimate
          </Button>
          <Typography sx={{ fontSize: 12, color: COLORS.meta }}>{SMS_CONSENT}</Typography>
        </Box>
      )}
    </Box>
  );
}

function PorchReportCard() {
  const { showToast } = useToast();
  const [contact, setContact] = useState("");
  const mutation = useMutation({ mutationFn: createLead, onError: () => showToast(FORM_ERROR) });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmailOrPhone(contact)) {
      showToast("Add an email or a 10-digit mobile number.");
      return;
    }
    mutation.mutate({ type: "porch_report", contact: contact.trim() });
  }

  return (
    <Box
      sx={{
        ...panelSx,
        borderRadius: "14px",
        p: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <Typography variant="script">Once a month, on the porch</Typography>
      <Typography variant="h2" sx={{ fontSize: 30, lineHeight: 1.1 }}>
        The Porch Report
      </Typography>
      <Typography sx={{ color: COLORS.body }}>
        What homes sold for in your county, one seasonal recipe, and one home tip. Short enough to
        read with your morning coffee.
      </Typography>
      {mutation.isSuccess ? (
        <Box sx={{ bgcolor: SV.accSoft, borderRadius: "10px", px: "18px", py: 2 }}>
          You're on the list. First issue lands the first of the month.
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
        >
          <FieldInput
            tone="paper"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or mobile number"
            inputProps={{ "aria-label": "Email or mobile number" }}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={mutation.isPending}
            sx={{ px: "20px" }}
          >
            Sign me up
          </Button>
        </Box>
      )}
    </Box>
  );
}

export function WorthPorchSection() {
  return (
    <PageSection
      sx={{ py: "32px", display: "grid", gridTemplateColumns: autoGrid(380, "fit"), gap: "22px" }}
    >
      <HomeWorthCard />
      <PorchReportCard />
    </PageSection>
  );
}
