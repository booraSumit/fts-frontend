import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import thunk from "redux-thunk";

const store = () =>
  configureStore({
    reducer,
    middleware: [thunk, api],
  });

export default store;
