import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuId: 0,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.menuId = action.payload;
    },
  },
});

export const { setId } = menuSlice.actions;

export default menuSlice.reducer;
