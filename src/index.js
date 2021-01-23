import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js';
import { ToastProvider } from 'react-toast-notifications';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontSize: 12
  }
});

ReactDOM.render(
  <ToastProvider>
    {/* <React.StrictMode> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    {/* </React.StrictMode> */}
  </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
