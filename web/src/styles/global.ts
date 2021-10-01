import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: transparent;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: #1b203c;

    color: #7159c1;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;

    font-size: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  body,
  input,
  textarea,
  button {
    font-weight: 400;
    font-family: Roboto, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
