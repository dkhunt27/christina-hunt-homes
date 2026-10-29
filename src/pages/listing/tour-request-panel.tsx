import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CONTACT } from "../../constants";
import { useToast } from "../../contexts/toast-context";
import { useAuth } from "../../hooks/use-auth";
import { createLead } from "../../lib/db/leads-db";
import { addDays } from "../../lib/format";
import { COLORS, darkPanelSx, SV } from "../../theme/tokens";

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Next-five-days picker. Requesting a tour asks for a phone number first if needed. */
export function TourRequestPanel({ listingId }: { listingId: string }) {
  const { requireSignIn } = useAuth();
  const { showToast } = useToast();
  const days = useMemo(() => [1, 2, 3, 4, 5].map((offset) => addDays(offset)), []);
  const [selected, setSelected] = useState<number | null>(null);
  const mutation = useMutation({
    mutationFn: createLead,
    onError: () => showToast("That didn't go through. Please try again, or just text me."),
  });

  const tourLabel =
    selected !== null
      ? days[selected].toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      : "a day that works for you";

  function onRequest() {
    const day = selected;
    requireSignIn("tour", (user) =>
      mutation.mutate({
        type: "tour",
        listingId,
        contact: user.phone,
        tourDate: day !== null ? isoDate(days[day]) : undefined,
      }),
    );
  }

  return (
    <Box sx={{ ...darkPanelSx, p: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <Typography variant="h3" sx={{ fontSize: 24 }}>
        Come see it in person
      </Typography>
      <Box
        role="radiogroup"
        aria-label="Tour day"
        sx={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "6px" }}
      >
        {days.map((d, i) => {
          const on = selected === i;
          return (
            <ButtonBase
              key={d.toISOString()}
              role="radio"
              aria-checked={on}
              aria-label={d.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              onClick={() => {
                setSelected(i);
                mutation.reset();
              }}
              sx={{
                border: "1px solid rgba(255,255,255,.35)",
                bgcolor: on ? SV.acc : "transparent",
                color: on ? COLORS.ink : COLORS.cream,
                borderRadius: "6px",
                py: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <Box component="span" sx={{ fontSize: 12 }}>
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </Box>
              <Box component="span" sx={{ fontSize: 18, fontWeight: 600 }}>
                {d.getDate()}
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
      {mutation.isSuccess ? (
        <Box
          role="status"
          sx={{
            bgcolor: SV.panelDeep,
            borderRadius: "6px",
            p: "14px",
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          You're on my calendar for {tourLabel}. I'll text you to confirm a time.
        </Box>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={onRequest}
          disabled={mutation.isPending}
          sx={{ py: "14px" }}
        >
          Request a tour
        </Button>
      )}
      <Box
        component="a"
        href={CONTACT.smsHref}
        sx={{ color: SV.acc, fontSize: 15, fontWeight: 600, "&:hover": { color: SV.acc } }}
      >
        Or just text me a question
      </Box>
    </Box>
  );
}
