import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    showDrawer: false,
  },
  reducers: {
    showDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
  },
});

export const { showDrawer } = slice.actions;
export default slice.reducer;

export const toggleDrawer = () => {
  return (dispatch) => {
    dispatch(showDrawer());
  };
};
