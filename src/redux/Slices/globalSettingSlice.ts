import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGlobalSettingState } from '../../types';

const initialState: IGlobalSettingState = {
  defaultBg: 'https://mobimg.b-cdn.net/v3/fetch/3c/3c33b5e60d213462380dbfcba9a141c9.jpeg',
  selectedBg: null,
};

export const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBg: (state, action: PayloadAction<string | null>) => {
      // state.selectedBg = action.payload ? action.payload.replaceAll('\\', '/') : action.payload;
      state.selectedBg = action.payload ? action.payload.split('\\').join('/') : action.payload;
    },
  },
});

export const { setBg } = settingSlice.actions;

export default settingSlice.reducer;
