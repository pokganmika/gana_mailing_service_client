import "antd/dist/antd.css";
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { createGlobalStyle } from "styled-components";

import App from "./App";
// import Login from "./pages/Login";

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
// ReactDOM.render(<Login />, document.getElementById("root"));
