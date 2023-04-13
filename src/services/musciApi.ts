import axios, { AxiosResponse } from 'axios';
import { IMusicItem, IUserData } from './../types';
const BASE_URL = 'http://localhost:4444';

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
    console.log(error.response.status);
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originReq._isRetry = true;
      try {
        const res = await axios.post('/refresh', {
          withCredentials: true,
          baseURL: BASE_URL,
        });
        localStorage.setItem('token', res.data.accessToken);
        return instance.request(originReq);
      } catch (error) {
        console.log('не авторизован');
      }
    }
    throw error;
  },
);

const ServerAPI = {
  removeMusicFromFav: (
    id: string,
  ): Promise<AxiosResponse<{ status: string; error: null | string }>> => {
    return instance.post('/delete/user/music', { _id: id });
  },
  addMusicToFav: (id: string): Promise<AxiosResponse<{ status: string; error: null | string }>> => {
    return instance.put('/add/user/music', { _id: id });
  },
  removeMusic: (id: string): Promise<AxiosResponse<{ status: string; error: null | string }>> => {
    return instance.post('/delete/music', { _id: id });
  },
  addMusic: (id: string): Promise<AxiosResponse<{ status: string; error: null | string }>> => {
    return instance.put('/add/music', { _id: id });
  },
  getAllMusic: (sortOrder, sortField, genre, searchValue): Promise<AxiosResponse<IMusicItem[]>> => {
    return instance.get(
      `/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}`,
    );
  },
  getAuthAllMusic: (
    sortOrder,
    sortField,
    genre,
    searchValue,
  ): Promise<AxiosResponse<IMusicItem[]>> => {
    return instance.get(
      `/auth/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}`,
    );
  },
  getUserMusic: (
    sortOrder,
    sortField,
    genre,
    searchValue,
    isShowFav,
  ): Promise<AxiosResponse<IMusicItem[]>> => {
    return instance.get(
      `/user/music?sortField=${sortField}&sort=${sortOrder}&genre=${genre}&search=${searchValue}&isShowOnlyFav=${isShowFav}`,
    );
  },
  getMusicById: (id) => {
    return instance.get(`/music/${id}`);
  },
  register: (data) => {
    return instance.post('/register', data);
  },
  login: (data): Promise<AxiosResponse<IUserData>> => {
    return instance.post('/login', data);
  },
  logout: () => {
    return instance.post('/logout');
  },
  refresh: (): Promise<AxiosResponse<IUserData>> => {
    return instance.post('/refresh');
  },
};
export default ServerAPI;
