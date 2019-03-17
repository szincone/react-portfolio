import { createMuiTheme } from '@material-ui/core/styles';

// breakpoint values {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    body1: { color: '#FFFFFF' },
    body2: { color: '#FFFFFF' },
    headerFamily: ['"Rubik Mono One"', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#02182b',
      contrastText: '#FFFFFF',
      accent: '#d7263d',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#02182b',
    },
    background: {
      default: '#02182b',
      paper: '#02182b',
    },
  },
});
