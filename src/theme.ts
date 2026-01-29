import { createMuiTheme } from "@material-ui/core/styles";
import './material-ui-augment.d.ts';

// breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}

// Modern, professional color palette with subtle gradients
const modernColors = {
  primary: {
    main: "#1a1a2e", // Deep navy blue - professional and modern
    light: "#232344",
    dark: "#0f0f1e",
  },
  secondary: {
    main: "#00d4ff", // Bright cyan - modern accent
    light: "#33ddff",
    dark: "#00a6cc",
  },
  accent: {
    main: "#ff006e", // Vibrant pink - eye-catching
    light: "#ff3388",
    dark: "#cc0058",
  },
  text: {
    primary: "#ffffff",
    secondary: "#e0e0e0",
    accent: "#00d4ff",
  },
  background: {
    main: "#0f0f1e",
    card: "rgba(26, 26, 46, 0.8)",
  },
};

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['"Inter"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(","),
    body1: { 
      color: modernColors.text.primary,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: { 
      color: modernColors.text.secondary,
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    headerFamily: ['"Inter"', '"Segoe UI"', 'sans-serif'].join(","),
  } as any,
  palette: {
    primary: {
      main: modernColors.primary.main,
      light: modernColors.primary.light,
      dark: modernColors.primary.dark,
      contrastText: modernColors.text.primary,
      accent: modernColors.secondary.main,
    } as any,
    secondary: {
      main: modernColors.text.primary,
      contrastText: modernColors.primary.main,
    },
    background: {
      default: modernColors.background.main,
      paper: modernColors.primary.main,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 2px 8px rgba(0, 212, 255, 0.1)",
    "0 4px 16px rgba(0, 212, 255, 0.15)",
    "0 8px 24px rgba(0, 212, 255, 0.2)",
    "0 12px 32px rgba(0, 212, 255, 0.25)",
    ...Array(20).fill("0 12px 32px rgba(0, 0, 0, 0.3)"),
  ] as any,
});
