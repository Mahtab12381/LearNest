import userReducer from "./Slices/userSlice";
// import modalReducer from "./Slices/modalSlice";
import filterReducer from "./Slices/filterSlice";
import cartReducer from "./Slices/cartSlice";
import tabReducer from "./Slices/tabSlice";
import wishReducer from "./Slices/wishSlice";
import contentReducer from "./Slices/contentSlice";
import reloadReducer from "./Slices/reloadSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  tab: tabReducer,
  // modal: modalReducer,
  filter: filterReducer,
  cart: cartReducer,
  wish: wishReducer,
  content: contentReducer,
  reload: reloadReducer

});

export default rootReducer;
