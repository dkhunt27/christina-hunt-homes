import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { type FormEvent, useEffect, useState } from "react";
import { SMS_CONSENT } from "../constants";
import { type SignInReason, useAuth } from "../hooks/use-auth";
import { formatPhone, isTenDigitPhone } from "../lib/format";
import { COLORS } from "../theme/tokens";
import { FieldInput } from "./field-input";

const COPY: Record<SignInReason, [title: string, sub: string]> = {
  search: [
    "Get texts for new matches",
    "Add your mobile number and I'll text you when a new home fits this search. No password, ever.",
  ],
  tour: ["Where should I text you?", "I'll confirm your tour time by text. No password, ever."],
  general: [
    "Sign in with your phone",
    "Sync your saved homes and open My Hub. We'll text you a 6-digit code. No password.",
  ],
};

function submitSx(enabled: boolean) {
  return {
    bgcolor: enabled ? COLORS.ink : COLORS.disabled,
    color: COLORS.cream,
    fontSize: 16,
    py: "14px",
    "&:hover": { bgcolor: enabled ? COLORS.inkHover : COLORS.disabled },
    "&.Mui-disabled": { bgcolor: COLORS.disabled, color: COLORS.cream },
  };
}

export function PhoneLoginModal() {
  const { signInOpen, signInReason, closeSignIn, requestCode, verifyCode, isDemoMode } = useAuth();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (signInOpen) {
      setStep("phone");
      setCode("");
      setError("");
    }
  }, [signInOpen]);

  const phoneOk = isTenDigitPhone(phone);
  const codeOk = code.length === 6;
  const [title, sub] =
    step === "code"
      ? ["Check your texts", `Enter the 6-digit code we sent to ${phone}.`]
      : COPY[signInReason];

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function onSendCode(e: FormEvent) {
    e.preventDefault();
    if (!phoneOk || busy) return;
    run(async () => {
      await requestCode(phone);
      setCode("");
      setStep("code");
    });
  }

  function onVerify(e: FormEvent) {
    e.preventDefault();
    if (!codeOk || busy) return;
    run(() => verifyCode(phone, code));
  }

  return (
    <Dialog
      open={signInOpen}
      onClose={closeSignIn}
      aria-labelledby="phone-login-title"
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(35,33,30,.45)" } },
        paper: {
          sx: {
            width: "100%",
            maxWidth: 420,
            m: "20px",
            bgcolor: COLORS.paper,
            borderRadius: "12px",
            p: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 30px 80px rgba(0,0,0,.25)",
          },
        },
      }}
    >
      <Typography id="phone-login-title" variant="h2" sx={{ fontSize: 28, lineHeight: 1.15 }}>
        {title}
      </Typography>
      <Typography sx={{ color: COLORS.body, fontSize: 15, lineHeight: 1.55 }}>{sub}</Typography>

      {step === "phone" ? (
        <Box
          component="form"
          onSubmit={onSendCode}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <FieldInput
            autoFocus
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(313) 555-0100"
            inputProps={{
              inputMode: "tel",
              autoComplete: "tel-national",
              "aria-label": "Mobile number",
            }}
            sx={{ fontSize: 20 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!phoneOk || busy}
            sx={submitSx(phoneOk)}
          >
            {busy ? "Sending…" : "Text me a code"}
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={onVerify}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <FieldInput
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="••••••"
            inputProps={{
              inputMode: "numeric",
              autoComplete: "one-time-code",
              "aria-label": "6-digit code",
            }}
            sx={{
              fontSize: 28,
              "& .MuiInputBase-input": { textAlign: "center", letterSpacing: ".4em" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!codeOk || busy}
            sx={submitSx(codeOk)}
          >
            {busy ? "Checking…" : "Continue"}
          </Button>
          {isDemoMode && (
            <Typography sx={{ fontSize: 13, color: COLORS.placeholderText, textAlign: "center" }}>
              Demo: any 6 digits works
            </Typography>
          )}
        </Box>
      )}

      {error && (
        <Typography role="alert" sx={{ fontSize: 14, color: COLORS.warning }}>
          {error}
        </Typography>
      )}
      <Typography sx={{ fontSize: 12, color: COLORS.placeholderText, lineHeight: 1.5 }}>
        {SMS_CONSENT}
      </Typography>
    </Dialog>
  );
}
