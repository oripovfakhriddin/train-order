import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import AuthContextProvider from "./context/auth.tsx";
import StoreProvider from "./redux/store/index.tsx";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider>
        <ToastContainer />
        <App />
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
