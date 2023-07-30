import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/client";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    error: null,
  },
  reducers: {
    departmentRequested: (state, { payload }) => {
      state.error = null;
    },
    departmentSuccess: (state, { payload }) => {
      state.departments = payload?.data;
      console.log(state.departments);
    },
    departmentError: (state, { payload }) => {
      state.error = payload?.response?.data || payload.message;
    },
  },
});

export const fetchDepartment = () => {
  return apiCallBegan({
    baseURL: BASE_URL,
    method: "get",
    url: `department`,
    onStart: departmentRequested.type,
    onSuccess: departmentSuccess.type,
    onError: departmentError.type,
  });
};

export const { departmentError, departmentRequested, departmentSuccess } =
  slice.actions;
export default slice.reducer;
