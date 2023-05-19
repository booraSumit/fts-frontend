import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import thunk from "redux-thunk";

import { loadUserFromStorage } from "./auth";

const store = configureStore({
  reducer,
  middleware: [thunk, api],
});

store.dispatch(loadUserFromStorage());

export default store;
