import { createMuiTheme } from "@material-ui/core/styles";
import './material-ui-augment.d.ts';

// breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}

// Space-themed color palettes — one is picked at random on each visit
const colorPalettes = {
  deepSpace: {
    primary: {
      main: "#1a1a2e",
      light: "#232344",
      dark: "#0f0f1e",
    },
    secondary: {
      main: "#00d4ff",
      light: "#33ddff",
      dark: "#00a6cc",
    },
    accent: {
      main: "#ff006e",
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
  },
  nebula: {
    primary: {
      main: "#2d1b4e",
      light: "#3d2769",
      dark: "#1a0f3a",
    },
    secondary: {
      main: "#b794f6",
      light: "#d4b3ff",
      dark: "#8b5cf6",
    },
    accent: {
      main: "#f97316",
      light: "#fb923c",
      dark: "#ea580c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      accent: "#b794f6",
    },
    background: {
      main: "#1a0f3a",
      card: "rgba(45, 27, 78, 0.8)",
    },
  },
  eventHorizon: {
    primary: {
      main: "#1e293b",
      light: "#334155",
      dark: "#0f172a",
    },
    secondary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },
    accent: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      accent: "#06b6d4",
    },
    background: {
      main: "#0f172a",
      card: "rgba(30, 41, 59, 0.8)",
    },
  },
  aurora: {
    primary: {
      main: "#0d3d56",
      light: "#155270",
      dark: "#062838",
    },
    secondary: {
      main: "#14b8a6",
      light: "#2dd4bf",
      dark: "#0f766e",
    },
    accent: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      accent: "#14b8a6",
    },
    background: {
      main: "#062838",
      card: "rgba(13, 61, 86, 0.8)",
    },
  },
};

// Randomly select a palette on load
const paletteKeys = Object.keys(colorPalettes) as Array<keyof typeof colorPalettes>;
const randomPalette = paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
const modernColors = colorPalettes[randomPalette];

// The palette chosen for this visit — shared with the canvas scene and styles
export const paletteColors = modernColors;

// Convert a #rrggbb hex color to an rgba() string
export const withAlpha = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
    headerFamily: ['"Space Grotesk"', '"Inter"', '"Segoe UI"', 'sans-serif'].join(","),
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
    `0 2px 8px ${withAlpha(modernColors.secondary.main, 0.1)}`,
    `0 4px 16px ${withAlpha(modernColors.secondary.main, 0.15)}`,
    `0 8px 24px ${withAlpha(modernColors.secondary.main, 0.2)}`,
    `0 12px 32px ${withAlpha(modernColors.secondary.main, 0.25)}`,
    ...Array(20).fill("0 12px 32px rgba(0, 0, 0, 0.3)"),
  ] as any,
});
