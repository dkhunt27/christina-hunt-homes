import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import type { Season } from "../types";
import { THEMES } from "./seasons";
import { COLORS, FONTS, SHIPLAP, SV } from "./tokens";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    script: CSSProperties;
    label: CSSProperties;
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    script?: CSSProperties;
    label?: CSSProperties;
    mono?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    script: true;
    label: true;
    mono: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    /** Text-only arrow link ("See all homes →") in the seasonal script color. */
    link: true;
  }
}

const serif = (fontSize: number | string, lineHeight: number) => ({
  fontFamily: FONTS.serif,
  fontWeight: 400,
  fontSize,
  lineHeight,
});

/**
 * MUI theme for one season. Seasonal colors that animate (`background .4s`) are used through
 * CSS variables in `sx` (see `SV`); the palette carries the same season's hex values for MUI's
 * own components.
 */
export function createSiteTheme(season: Season) {
  const t = THEMES[season];
  return createTheme({
    palette: {
      primary: { main: COLORS.ink, contrastText: COLORS.cream },
      secondary: { main: t.acc, contrastText: COLORS.ink },
      error: { main: COLORS.warning },
      success: { main: COLORS.positive },
      background: { default: t.bg, paper: COLORS.card },
      text: { primary: COLORS.ink, secondary: COLORS.body },
      divider: COLORS.line,
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: FONTS.sans,
      h1: serif("clamp(34px, 7vw, 44px)", 1.05),
      h2: serif("clamp(28px, 5vw, 34px)", 1.15),
      h3: serif(26, 1.15),
      h4: serif(22, 1.2),
      h5: serif(20, 1.25),
      h6: serif(18, 1.3),
      body1: { fontSize: 16, lineHeight: 1.6 },
      body2: { fontSize: 15, lineHeight: 1.55 },
      button: { fontFamily: FONTS.sans },
      script: {
        fontFamily: FONTS.script,
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 1,
        color: SV.ink,
        display: "block",
      },
      label: {
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: COLORS.meta,
        lineHeight: 1.4,
      },
      mono: { fontFamily: FONTS.mono, fontSize: 12, color: COLORS.placeholderText },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: SV.bg,
            backgroundImage: SHIPLAP,
            transition: "background-color .4s",
            color: COLORS.ink,
            WebkitFontSmoothing: "antialiased",
          },
          a: {
            color: COLORS.ink,
            textDecorationColor: COLORS.underline,
            textUnderlineOffset: 3,
            "&:hover": { color: COLORS.linkHover },
          },
          "input, select, button, textarea": { fontFamily: "inherit" },
          ":focus-visible": { outline: `2px solid ${COLORS.ink}`, outlineOffset: 2 },
          "@keyframes chFall": {
            from: { transform: "translateY(-40px)" },
            to: { transform: "translateY(110vh)" },
          },
          "@keyframes chSway": {
            "0%, 100%": { transform: "translateX(-16px) rotate(-30deg)" },
            "50%": { transform: "translateX(16px) rotate(30deg)" },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "[data-fx]": { display: "none !important" },
          },
          "@media print": {
            "header, footer, .noprint": { display: "none !important" },
            body: { backgroundImage: "none" },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: { script: "span", label: "span", mono: "span" },
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            lineHeight: 1.3,
            padding: "12px 18px",
            minWidth: 0,
            boxShadow: "none",
          },
          sizeLarge: { fontSize: 16, padding: "14px 24px" },
          sizeSmall: { fontSize: 14, padding: "9px 14px" },
        },
        variants: [
          {
            props: { variant: "contained", color: "primary" },
            style: { "&:hover": { backgroundColor: COLORS.inkHover } },
          },
          {
            props: { variant: "contained", color: "secondary" },
            style: {
              backgroundColor: SV.acc,
              color: COLORS.ink,
              "&:hover": { backgroundColor: SV.acc, filter: "brightness(.95)" },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              borderColor: COLORS.ink,
              color: COLORS.ink,
              padding: "11px 17px",
              "&:hover": { borderColor: COLORS.ink, backgroundColor: "rgba(35,33,30,.05)" },
            },
          },
          {
            props: { variant: "link" },
            style: {
              padding: "6px 0",
              fontSize: 15,
              color: SV.ink,
              backgroundColor: "transparent",
              alignSelf: "flex-start",
              "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
            },
          },
        ],
      },
      MuiInputBase: {
        styleOverrides: { root: { fontFamily: "inherit" } },
      },
    },
  });
}
