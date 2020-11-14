import { combineReducers } from "redux";
import auth from "./auth";
import apps from "./apps";
import users from "./users";

export default combineReducers({
  auth,
  apps,
  users,
});
