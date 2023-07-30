import { combineReducers } from "redux";
import authReducer from "./auth";
import socketReducer from "./socket";
import departmentReducer from "./department";
import fileReducer from "./file";

export default combineReducers({
  auth: authReducer,
  socket: socketReducer,
  department: departmentReducer,
  file: fileReducer,
});
