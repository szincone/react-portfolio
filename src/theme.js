import { createMuiTheme } from "@material-ui/core/styles";

// breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}
const getRandomColor = (type) => {
  const colors = {
    primary: [
      "#02182b",
      "#05668D",
      "#648767",
      "#00CC99",
      "#7F2982",
      "#1C7C54",
      "#3F88C5",
    ],
    secondary: ["#d7263d", "#EB9486", "#3AB795", "#2D936C"],
    background: [
      "#02182b",
      "#05668D",
      "#648767",
      "#00CC99",
      "#7F2982",
      "#1C7C54",
      "#3F88C5",
    ],
  };
  const selectedColors = colors[type] || colors.primary;
  return selectedColors[Math.floor(Math.random() * selectedColors.length)];
};

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    body1: { color: "#FFFFFF" },
    body2: { color: "#FFFFFF" },
    headerFamily: ['"Rubik Mono One"', "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: getRandomColor("primary"),
      contrastText: "#FFFFFF",
      accent: getRandomColor("secondary"),
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#02182b",
    },
    background: {
      default: getRandomColor("background"),
      paper: getRandomColor("background"),
    },
  },
});
