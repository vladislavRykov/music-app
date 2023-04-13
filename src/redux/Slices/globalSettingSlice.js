import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  defaultBg: 'https://mobimg.b-cdn.net/v3/fetch/3c/3c33b5e60d213462380dbfcba9a141c9.jpeg',
  selectedBg: null,
};

export const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBg: (state, action) => {
      state.selectedBg = action.payload;
    },
  },
});

export const { setBg } = settingSlice.actions;

export default settingSlice.reducer;
