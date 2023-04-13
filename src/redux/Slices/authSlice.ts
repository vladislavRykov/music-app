import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ServerAPI from '../../services/musciApi';
import { IAuthState } from '../../types';
import delay from '../../utils/delay';
import { IUserData } from './../../types';
import { totalStopMusic } from './selectedAudioSlice';

export const registerUser = createAsyncThunk(
  'auth/registerUserStatus',
  async (params: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await ServerAPI.register(params);
      if (!(res.statusText === 'OK')) {
        throw new Error('Неудачный запрос');
      }
      localStorage.setItem('token', res.data.accessToken);
      return res.data as IUserData;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error?.response.data.message as string);
      }
      return rejectWithValue(error.message as string);
    }
  },
);
export const loginUser = createAsyncThunk(
  'auth/loginUserStatus',
  async (params: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await ServerAPI.login(params);
      await delay(500);
      if (!(res.statusText === 'OK')) {
        throw new Error('Неудачный запрос');
      }
      localStorage.setItem('token', res.data.accessToken);
      return res.data as IUserData;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error?.response.data.message as string);
      }
      return rejectWithValue(error.message as string);
    }
  },
);
export const refreshUser = createAsyncThunk(
  'auth/refreshUserStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await ServerAPI.refresh();
      if (!(res.statusText === 'OK')) {
        throw new Error('Неудачный запрос');
      }
      localStorage.setItem('token', res.data.accessToken);
      return res.data as IUserData;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error?.response.data.message as string);
      }
      return rejectWithValue(error.message as string);
    }
  },
);
export const logoutUser = createAsyncThunk(
  'auth/logoutUserStatus',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await ServerAPI.logout();
      await delay(500);
      if (!(res.statusText === 'OK')) {
        throw new Error('Неудачный запрос');
      }
      localStorage.removeItem('token');
      dispatch(totalStopMusic());
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error?.response.data.message as string);
      }
      return rejectWithValue(error.message as string);
    }
  },
);

const initialState: IAuthState = {
  userData: null,
  isFetching: true,
  isAuth: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isAuth = false;
      state.errorMessage = null;
      state.isFetching = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      state.errorMessage = null;
      state.isFetching = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.errorMessage = null;
      state.isFetching = true;
      state.isAuth = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userData = action.payload;
      state.isAuth = true;
      state.errorMessage = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.errorMessage = null;
      state.isAuth = false;
      state.isFetching = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userData = action.payload;
      state.isAuth = true;
      state.errorMessage = null;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isFetching = true;
      state.errorMessage = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isAuth = false;
      state.errorMessage = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { setIsFetching } = authSlice.actions;

export default authSlice.reducer;
