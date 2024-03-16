import React from "react";
import ReactDOM from "react-dom";
import App from "./app";


const wrap = document.createElement("div");
wrap.setAttribute("id", "content-script-root");
const sr = wrap.attachShadow({ mode: "open" });
document.body.appendChild(wrap);

// Inject @font-face rule into the current page.
// const fontsStyleSheet = document.createElement("style");
// document.head.appendChild(fontsStyleSheet);
// fontsStyleSheet.sheet.insertRule(fontsCSS, 0);

ReactDOM.render(<App/>, sr);
