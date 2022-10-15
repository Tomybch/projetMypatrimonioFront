import { combineReducers } from "redux";
import propertiesReducer from "./properties";
import mainReducer from "./main";
import formReducer from "./form";
import usersReducer from "./users";
import tenantsReducer from "./tenants";
import creditReducer from "./credit";

const rootReducer = combineReducers({
  properties: propertiesReducer,
  main: mainReducer,
  form: formReducer,
  user: usersReducer,
  tenants: tenantsReducer,
  credit: creditReducer,
});

export default rootReducer;
