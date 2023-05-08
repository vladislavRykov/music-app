import axios, { AxiosResponse } from 'axios';
import { IMusicItem, IUserData } from './../types';
export const BASE_URL = 'http://localhost:4444';

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originReq = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originReq._isRetry = true;
      try {
        const res = await axios.post(
          '/refresh',
          {},
          {
            withCredentials: true,
            baseURL: BASE_URL,
          },
        );
        localStorage.setItem('token', res.data.accessToken);
        return instance.request(originReq);
      } catch (error) {}
    }
    throw error;
  },
);

type CreateMusciType = {
  uploadedBy?: string;
  songName: string;
  from: string;
  source: string;
  small_img: string;
  bg_img: string;
  genre: string;
};
type GetMusicArgs = {
  sortOrder: number;
  sortField: string;
  genre: string | null;
  searchValue: null | string;
  isShowFav?: boolean;
};

const ServerAPI = {
  uploadFiles: (files) => {
    return instance.post<{ smallImgPath: string; bigImgPath: string; audioPath: string }>(
      '/upload',
      files,
    );
  },
  createMusic: (data: CreateMusciType) => {
    return instance.post<CreateMusciType>('/user/music/create', data);
  },
  removeMusicFromFav: (id: string) => {
    return instance.post<{ status: string; error: null | string }>('/delete/user/music', {
      _id: id,
    });
  },
  addMusicToFav: (id: string) => {
    return instance.put<{ status: string; error: null | string }>('/add/user/music', { _id: id });
  },
  removeMusic: (id: string) => {
    return instance.post<{ status: string; error: null | string }>('/delete/music', { _id: id });
  },
  addMusic: (id: string) => {
    return instance.put<{ status: string; error: null | string }>('/add/music', { _id: id });
  },
  getAllMusic: ({ sortOrder, sortField, genre, searchValue }: GetMusicArgs) => {
    return instance.get<IMusicItem[]>(
      `/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}`,
    );
  },
  getAuthAllMusic: ({ sortOrder, sortField, genre, searchValue }: GetMusicArgs) => {
    return instance.get<IMusicItem[]>(
      `/auth/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}`,
    );
  },
  getUserMusic: ({ sortOrder, sortField, genre, searchValue, isShowFav }: GetMusicArgs) => {
    return instance.get<IMusicItem[]>(
      `/user/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}&isShowOnlyFav=${isShowFav}`,
    );
  },
  getMusicById: (id: string) => {
    return instance.get(`/music/${id}`);
  },
  register: (data: { email: string; password: string }) => {
    return instance.post('/register', data);
  },
  login: (data: { email: string; password: string }) => {
    return instance.post<IUserData>('/login', data);
  },
  logout: () => {
    return instance.post('/logout');
  },
  refresh: () => {
    return instance.post<IUserData>('/refresh');
  },
};
export default ServerAPI;
