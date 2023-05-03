import uiReducer from "./ui";

import { combineReducers } from "redux";

export default combineReducers({
  ui: uiReducer,
});
