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

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    authError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message || payload.response.data;
    },
    logoutRequested: (state) => {
      state.isLoading = true;
    },
    logoutSuccessfull: (state, { payload }) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    logoutError: (state, { payload }) => {
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

export const logout = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      baseURL: BASE_URL,
      method: "post",
      data: { user_id: getState().entity.auth?.user?._id },
      url: `logout`,
      onStart: logoutRequested.type,
      onSuccess: logoutSuccessfull.type,
      onError: logoutError.type,
    })
  );
};

export const loadUserFromStorage = () => (dispatch) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (user && token) {
    dispatch(
      authSuccessfull({
        data: JSON.parse(user),
        headers: { "x-auth-token": token },
      })
    );
  }
};

export default slice.reducer;
export const {
  authRequested,
  authSuccessfull,
  authError,
  logoutError,
  logoutRequested,
  logoutSuccessfull,
} = slice.actions;
