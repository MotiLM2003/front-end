import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import menuReducer from "./menuSlice";
import userReducer from "./userSlice";
import selectedSwitcherSlice from "./selectedSwitcherSlice";

const reducer = combineReducers({
  menuReducer,
  userReducer,
  selectedSwitcherSlice,
});

export default configureStore({
  reducer: reducer,
  devTools: true,
});
