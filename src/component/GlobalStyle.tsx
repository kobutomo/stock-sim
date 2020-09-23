import { css, Global } from "@emotion/core"
import { h } from "preact"

const GlobalStyle = () => <Global styles={global} />

const global = css`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700&subset=japanese");
  html {
    font-size: 62.5% !important;
  }
  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    overflow: auto !important;
    height: 100% !important;
  }
  body {
    color: #2c2c2c;
    font-size: 1.4rem;
    line-height: 1.75;
    font-family: "Noto Sans JP", sans-serif;
    letter-spacing: 0.05em;
  }
  @media screen and (min-width: 1025px) {
    body {
      font-size: 1.6rem;
    }
  }
  img {
    width: 100%;
    height: auto;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  input,
  textarea {
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    font-family: "Noto Sans JP", sans-serif;
    -webkit-appearance: none;
    appearance: none;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
  li {
    list-style: none;
  }
  html,
  body,
  div,
  span,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  abbr,
  address,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  samp,
  small,
  strong,
  sub,
  sup,
  var,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  nav ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  a {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    background: transparent;
  }

  /* change colours to suit your needs */
  ins {
    background-color: #ff9;
    color: #000;
    text-decoration: none;
  }

  /* change colours to suit your needs */
  mark {
    background-color: #ff9;
    color: #000;
    font-style: italic;
    font-weight: bold;
  }

  del {
    text-decoration: line-through;
  }

  abbr[title],
  dfn[title] {
    border-bottom: 1px dotted;
    cursor: help;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* change border colour to suit your needs */
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #cccccc;
    margin: 1em 0;
    padding: 0;
  }

  input,
  select {
    vertical-align: middle;
  }
`
export default GlobalStyle