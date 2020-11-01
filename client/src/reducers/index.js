import { combineReducers } from "redux";
import auth from "./auth";
import apps from "./apps";

export default combineReducers({
  auth,
  apps,
});
