import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import delay from '../../utils/delay';
import { setBg } from './globalSettingSlice';
import { changeMusicDebounce } from '../../utils/changeMusicDebounce';
import { IMusicItem, ISelectedMusicState } from '../../types';

export const audioChangeWithTransition = createAsyncThunk<void, AnyAction>(
  'selectedAudio/audioTransitionStatus',
  async (params, { dispatch, getState }) => {
    dispatch(params);
    dispatch(setChanging(true));
    await changeMusicDebounce(dispatch, getState);
  },
);
export const totalStopMusic = createAsyncThunk(
  'selectedAudio/totalStopMusicS',
  async (_, { dispatch }) => {
    dispatch(setChanging(true));
    dispatch(stopMusic());
    await delay(600);
    dispatch(setBg(null));
    dispatch(setChanging(false));
  },
);

const initialState: ISelectedMusicState = {
  isSelected: false,
  audioInfo: null,
  isPaused: false,
  isChanging: false,
  loop: false,
  musicDur: 0,
  currentMT: 0,
  audioVolume: 0,
};

export const selectedAudioSlice = createSlice({
  name: 'selectedAudio',
  initialState,
  reducers: {
    setChosen: (state, action) => {
      state.audioInfo = {
        ...state.audioInfo,
        isChosen: action.payload.isChosen,
        chosenByCount: state.audioInfo?.chosenByCount + action.payload.num,
      };
    },
    setFav: (state, action) => {
      state.audioInfo = {
        ...state.audioInfo,
        isFav: action.payload,
      };
    },
    setAudio: (state, action: PayloadAction<{ music: IMusicItem; idx: number }>) => {
      state.audioInfo = { ...action.payload.music, idx: action.payload.idx };
      state.isSelected = true;
      state.isPaused = false;
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setAudioVolume: (state, action: PayloadAction<number>) => {
      state.audioVolume = action.payload;
    },
    setMusicDuration: (state, action: PayloadAction<number>) => {
      state.musicDur = action.payload;
    },
    setCurrentMT: (state, action: PayloadAction<number>) => {
      state.currentMT = action.payload;
    },
    setLoop: (state) => {
      state.loop = !state.loop;
    },
    setChanging: (state, action: PayloadAction<boolean>) => {
      state.isChanging = action.payload;
    },
    setNextAudio: (
      state,
      action: PayloadAction<{ musics: IMusicItem[]; audioInfo: IMusicItem | null }>,
    ) => {
      if (state.isSelected) {
        // const idx = action.payload.musics.findIndex(
        //   (obj) => obj.id === action.payload?.audioInfo?.id,
        // );
        const idx = action.payload?.audioInfo?.idx;
        if (idx !== undefined && idx + 1 == action.payload.musics.length) {
          state.audioInfo = { ...action.payload.musics[0], idx: 0 };
        } else if (idx != undefined) {
          state.audioInfo = { ...action.payload.musics[idx + 1], idx: idx + 1 };
        }
        state.isPaused = false;
      }
    },
    setPrevAudio: (
      state,
      action: PayloadAction<{ musics: IMusicItem[]; audioInfo: IMusicItem | null }>,
    ) => {
      if (state.isSelected) {
        // const idx = action.payload.musics.findIndex(
        //   (obj) => obj.id === action.payload?.audioInfo?.id,
        // );
        const idx = action.payload?.audioInfo?.idx;
        if (idx != undefined && idx == 0) {
          state.audioInfo = {
            ...action.payload.musics[action.payload.musics.length - 1],
            idx: action.payload.musics.length - 1,
          };
        } else if (idx != undefined) {
          state.audioInfo = { ...action.payload.musics[idx - 1], idx: idx - 1 };
        }
      }
    },
    stopMusic: (state) => {
      state.audioInfo = null;
      state.isSelected = false;
      state.isPaused = false;
    },
  },
});

export const {
  setChosen,
  setAudio,
  setNextAudio,
  setPaused,
  setChanging,
  setPrevAudio,
  setLoop,
  setMusicDuration,
  setCurrentMT,
  setAudioVolume,
  stopMusic,
  setFav,
} = selectedAudioSlice.actions;

export default selectedAudioSlice.reducer;
