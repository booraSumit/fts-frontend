import uiReducer from "./ui";
import entity from "./entity";

import { combineReducers } from "redux";

export default combineReducers({
  ui: uiReducer,
  entity,
});
