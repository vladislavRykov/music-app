import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ServerAPI from '../../services/musciApi';
import { IMusicItem, IMusicState } from '../../types';
import { AxiosResponse } from 'axios';

export const fetchUserMusic = createAsyncThunk<
  IMusicItem[],
  () => Promise<AxiosResponse<IMusicItem[]>>,
  { rejectValue: string }
>('userMusic/fetchUserMusicStatus', async (cb, { rejectWithValue }) => {
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

export const UserRemoveMusicFav = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('userMusic/UserRemoveMusicFavStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.removeMusicFromFav(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const UserAddMusicFav = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('userMusic/UserAddMusicFavStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.addMusicToFav(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const UserRemoveMusic = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('userMusic/UserRemoveMusicStatus', async (id, { rejectWithValue }) => {
  try {
    const res = await ServerAPI.removeMusic(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const UserAddMusic = createAsyncThunk<
  { status: string; error: null },
  string,
  { rejectValue: { status: string; error: string } }
>('userMusic/UserAddMusicStatus', async (id, { rejectWithValue }) => {
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

export const userMusicSlice = createSlice({
  name: 'userMusic',
  initialState,
  reducers: {
    setUserChosenM: (
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
    setUserFavM: (state, action: PayloadAction<{ fav: boolean; musicId: string }>) => {
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
    resetUserFilters: (state) => {
      state.filters = [];
      state.filterGenre = { catTitle: 'all', catKey: null };
      state.searchValue = '';
      state.showOnlyFavSongs = false;
    },
    setUserShowOnlyFav: (state) => {
      state.showOnlyFavSongs = !state.showOnlyFavSongs;
    },
    setUserSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setUserSortOrder: (state, action: PayloadAction<number>) => {
      state.sortOrder = action.payload;
    },
    setUserSortField: (state, action: PayloadAction<{ sortTitle: string; sortKey: string }>) => {
      state.sortInfo = action.payload;
    },
    setUserFilterGenre: (
      state,
      action: PayloadAction<{ catTitle: string; catKey: string | null }>,
    ) => {
      state.filterGenre = action.payload;
    },
    setUserMusic: (state, action: PayloadAction<Array<IMusicItem>>) => {
      state.musics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserMusic.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserMusic.fulfilled, (state, action) => {
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
    builder.addCase(fetchUserMusic.rejected, (state, action) => {
      state.musics = [];
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(UserAddMusic.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(UserAddMusic.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(UserAddMusic.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(UserRemoveMusic.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(UserRemoveMusic.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(UserRemoveMusic.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(UserAddMusicFav.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(UserAddMusicFav.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(UserAddMusicFav.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(UserRemoveMusicFav.pending, (state) => {
      state.status = null;
      state.errorMessage = null;
    });
    builder.addCase(UserRemoveMusicFav.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = null;
    });
    builder.addCase(UserRemoveMusicFav.rejected, (state, action) => {
      state.status = action.payload.status;
      state.errorMessage = action.payload.error;
    });
  },
});

export const {
  setUserFavM,
  setUserChosenM,
  resetUserFilters,
  setUserShowOnlyFav,
  setUserSearchValue,
  setUserMusic,
  setUserSortOrder,
  setUserSortField,
  setUserFilterGenre,
} = userMusicSlice.actions;

export default userMusicSlice.reducer;
