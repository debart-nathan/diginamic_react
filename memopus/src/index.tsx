import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./styles/scss/main.scss";
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.min.js';
import reportWebVitals from './reportWebVitals';
import JsonServer from './services/JsonServer';


JsonServer.getInstance("http://localhost:3001");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
