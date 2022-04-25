import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import menuReducer from './menuSlice';

const reducer = combineReducers({
  menuReducer,
});

export default configureStore({
  reducer: reducer,
  devTools: true,
});
