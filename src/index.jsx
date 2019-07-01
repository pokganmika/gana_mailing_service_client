import "antd/dist/antd.css";
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root,
  .App {
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Fira Sans', sans-serif;
}
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root"),
);
