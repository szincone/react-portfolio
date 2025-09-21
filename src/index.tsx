import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import materialTheme from './theme';
import App from './App';

ReactDOM.render(
  <MuiThemeProvider theme={materialTheme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
