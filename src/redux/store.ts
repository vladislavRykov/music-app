import { configureStore } from '@reduxjs/toolkit';
import selectedAudioReducer from './Slices/selectedAudioSlice';
import musicReducer from './Slices/musicSlice';
import settingRucer from './Slices/globalSettingSlice';
import authReducer from './Slices/authSlice';
import userMusicReducer from './Slices/userMusicSlice';

export const store = configureStore({
  reducer: {
    selectedAudio: selectedAudioReducer,
    allMusic: musicReducer,
    userMusic: userMusicReducer,
    setting: settingRucer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
