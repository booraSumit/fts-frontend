import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    showDrawer: false,
    showFIlePreviewer: false,
  },
  reducers: {
    showDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
    showFIlePreviewer: (state) => {
      state.showFIlePreviewer = !state.showFIlePreviewer;
    },
  },
});

export const { showDrawer, showFIlePreviewer } = slice.actions;
export default slice.reducer;

export const toggleDrawer = () => (dispatch) => {
  dispatch(showDrawer());
};

export const toggleFilePreviewer = () => (dispatch) => {
  dispatch(showFIlePreviewer());
};
