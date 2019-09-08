import { createGlobalStyle, css } from "styled-components";
import { dark } from "./themes/dark";
import { light } from "./themes/light";

export const themes = {
  dark,
  light,
};

export const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    min-height: 100vh;
    min-width: 350px;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  div {
    box-sizing: border-box;
  }
`;

export const centered = css`
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;