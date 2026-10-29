import Snackbar from "@mui/material/Snackbar";
import { useToast } from "../contexts/toast-context";
import { COLORS } from "../theme/tokens";

export function Toast() {
  const { toast, clearToast } = useToast();
  return (
    <Snackbar
      key={toast?.key}
      open={!!toast}
      message={toast?.message}
      autoHideDuration={3200}
      onClose={(_, reason) => reason !== "clickaway" && clearToast()}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ zIndex: 90, bottom: { xs: 24, sm: 24 } }}
      slotProps={{
        content: {
          sx: {
            bgcolor: COLORS.ink,
            color: COLORS.cream,
            px: "20px",
            py: "6px",
            borderRadius: "10px",
            fontSize: 15,
            boxShadow: "0 12px 30px rgba(0,0,0,.2)",
            maxWidth: "calc(100vw - 40px)",
            minWidth: 0,
          },
        },
      }}
    />
  );
}
