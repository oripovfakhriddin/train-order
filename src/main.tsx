import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
