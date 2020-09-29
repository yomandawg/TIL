import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    color: #b2bbc8;
    font-family: Avenir, Nunito, sans-serif;
    font-size: 18px;
    font-weight: 500;
  }
`;

const POSTS = $POSTS;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App posts={POSTS} />
  </>,
  document.getElementById('root')
);
