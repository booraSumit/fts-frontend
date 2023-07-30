import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { BASE_URL } from "../api/client";

const slice = createSlice({
  name: "file",
  initialState: {
    files: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    fileRequested: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    fileSuccessfull: (state, { payload }) => {
      state.isLoading = false;
      state.files = payload?.data;
      state.error = null;
    },
    fileError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data || payload.message;
      console.log(state.error);
    },
  },
});

export const sendFile = (data, signal, progress) => {
  return apiCallBegan({
    baseURL: BASE_URL,
    method: "post",
    data: data,
    url: `send-file`,
    onStart: fileRequested.type,
    onSuccess: fileSuccessfull.type,
    onError: fileError.type,
    signal,
    progress,
  });
};

export default slice.reducer;
export const { fileError, fileRequested, fileSuccessfull } = slice.actions;
