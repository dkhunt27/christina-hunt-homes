import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type ArrowLinkProps = {
  to: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

/** "See all homes →" style link in the seasonal script color. */
export function ArrowLink({ to, children, sx }: ArrowLinkProps) {
  return (
    <Button variant="link" component={RouterLink} to={to} sx={sx}>
      {children}
    </Button>
  );
}
