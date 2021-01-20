import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <ToastProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
