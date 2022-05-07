import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import menuReducer from './menuSlice';
import userReducer from './userSlice';

const reducer = combineReducers({
  menuReducer,
  userReducer,
});

export default configureStore({
  reducer: reducer,
  devTools: true,
});
