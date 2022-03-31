import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import reportWebVitals from './reportWebVitals';
import App from './App';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  /* other styles */
`;

render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
