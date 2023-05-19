import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { BASE_URL } from "../api/client";
const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    authRequested: (state) => {
      state.isLoading = true;
    },
    authSuccessfull: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload?.data;
      state.error = null;
      state.isAuthenticated = true;
      state.token = payload.headers["x-auth-token"];
    },
    authError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message || payload.response.data;
    },
  },
});

export const login = (data) => {
  return apiCallBegan({
    baseURL: BASE_URL,
    method: "post",
    data: data,
    url: `auth`,
    onStart: authRequested.type,
    onSuccess: authSuccessfull.type,
    onError: authError.type,
  });
};

export default slice.reducer;
export const { authRequested, authSuccessfull, authError } = slice.actions;
