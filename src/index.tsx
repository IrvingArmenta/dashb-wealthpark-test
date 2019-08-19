import React from 'react';
import "react-app-polyfill/ie11";
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { defaultTheme } from './global-styles/default-theme';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
<ThemeProvider theme={defaultTheme}>
  <App />
  </ThemeProvider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
