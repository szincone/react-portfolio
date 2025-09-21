import { Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    palette: {
      primary: {
        main: string;
        contrastText: string;
        accent: string;
      };
      secondary: {
        main: string;
        contrastText: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    headerFamily: string;
  }
  interface TypographyOptions {
    headerFamily?: string;
    useNextVariants?: boolean;
  }
}