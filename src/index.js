import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "./styles/muiTheme";
import router from "./routing/routes";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
