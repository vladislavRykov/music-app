import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ServerAPI from '../../services/musciApi';
import { IMusicItem, IMusicState } from '../../types';
import { AxiosResponse } from 'axios';

export const fetchMusic = createAsyncThunk<
  IMusicItem[],
  () => Promise<AxiosResponse<IMusicItem[]>>,
  { rejectValue: string }
>('musics/fetchMusicStatus', async (cb, { rejectWithValue }) => {
  try {
    const res = await cb();
    if (!(res.statusText === 'OK')) {
      throw new Error('Server error');
    }
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message as string);
  }
});

export const removeMusicFav = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('musics/removeMusicFavStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.removeMusicFromFav(id);
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});
export const addMusicFav = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('musics/addMusicFavStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.addMusicToFav(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const removeMusic = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('musics/removeMusicStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.removeMusic(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const addMusic = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('musics/addMusicStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.addMusic(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState: IMusicState = {
  musics: [],
  sortOrder: 1,
  sortInfo: { sortTitle: 'По названию', sortKey: 'songName' },
  filters: [],
  filterGenre: { catTitle: 'all', catKey: null },
  searchValue: '',
  showOnlyFavSongs: false,
  isFetching: false,
  errorMessage: null,
  status: null,
};

export const musicSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    setChosenM: (
      state,
      action: PayloadAction<{ isChosen: boolean; num: number; musicId: string }>,
    ) => {
      state.musics = state.musics.map((el) => {
        if (action.payload.musicId === el._id) {
          const update = {
            ...el,
            isChosen: action.payload.isChosen,
            chosenByCount: el.chosenByCount + action.payload.num,
          };
          return update;
        }
        console.log(el);
        return el;
      });
    },
    setFavM: (state, action: PayloadAction<{ fav: boolean; musicId: string }>) => {
      state.musics = state.musics.map((el) => {
        if (action.payload.musicId === el._id) {
          const update = {
            ...el,
            isFav: action.payload.fav,
          };
          return update;
        }
        return el;
      });
    },
    resetFilters: (state) => {
      state.filters = [];
      state.filterGenre = { catTitle: 'all', catKey: null };
      state.searchValue = '';
      state.showOnlyFavSongs = false;
    },
    setShowOnlyFav: (state) => {
      state.showOnlyFavSongs = !state.showOnlyFavSongs;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<number>) => {
      state.sortOrder = action.payload;
    },
    setSortField: (state, action: PayloadAction<{ sortTitle: string; sortKey: string }>) => {
      state.sortInfo = action.payload;
    },
    setFilterGenre: (state, action: PayloadAction<{ catTitle: string; catKey: string | null }>) => {
      state.filterGenre = action.payload;
    },
    setMusic: (state, action: PayloadAction<Array<IMusicItem>>) => {
      state.musics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMusic.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchMusic.fulfilled, (state, action) => {
      state.musics = action.payload;
      state.isFetching = false;
      if (state.filters.length <= 1) {
        const uniqueGenre = [...new Set(action.payload.map((obj) => obj.genre))].sort();
        state.filters = [
          { catTitle: 'all', catKey: null },
          ...uniqueGenre.map((genre) => {
            return { catTitle: genre, catKey: genre };
          }),
        ];
      }
    });
    builder.addCase(fetchMusic.rejected, (state, action) => {
      state.musics = [];
      state.isFetching = false;
      state.errorMessage = action.payload ? action.payload : null;
    });
    builder.addCase(addMusic.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(addMusic.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(addMusic.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(removeMusic.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(removeMusic.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(removeMusic.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(addMusicFav.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(addMusicFav.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(addMusicFav.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(removeMusicFav.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(removeMusicFav.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(removeMusicFav.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
  },
});

export const {
  setFavM,
  setChosenM,
  resetFilters,
  setShowOnlyFav,
  setSearchValue,
  setMusic,
  setSortOrder,
  setSortField,
  setFilterGenre,
} = musicSlice.actions;

export default musicSlice.reducer;
