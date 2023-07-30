import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    showDrawer: false,
    showFIlePreviewer: false,
    headerBound: null,
  },
  reducers: {
    showDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
    showFIlePreviewer: (state) => {
      state.showFIlePreviewer = !state.showFIlePreviewer;
    },
    setHeaderBound: (state, { payload }) => {
      state.headerBound = payload.bound;
    },
  },
});

export const { showDrawer, showFIlePreviewer, setHeaderBound } = slice.actions;
export default slice.reducer;

export const toggleDrawer = () => (dispatch) => {
  dispatch(showDrawer());
};

export const toggleFilePreviewer = () => (dispatch) => {
  dispatch(showFIlePreviewer());
};

export const setHeadersBound = (bound) => (dispatch) => {
  dispatch(setHeaderBound(bound));
};
