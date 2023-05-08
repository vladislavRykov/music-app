export interface IMusicItem {
  _id: string;
  idx?: number;
  songName: string;
  from: string;
  source: string;
  small_img: string;
  bg_img: string;
  genre: string;
  isFav?: boolean;
  isChosen?: boolean;
  chosenByCount?: number;
  type: 'globalMusic' | 'userMusic';
}
export enum MusicListType {
  USER = 'userMusic',
  GLOBAL = 'globalMusic',
}
export interface IMusicState {
  musics: IMusicItem[] | [];
  sortOrder: number;
  sortInfo: { sortTitle: string; sortKey: string };
  filters: { catTitle: string; catKey: string | null }[] | [];
  filterGenre: { catTitle: string; catKey: string | null };
  searchValue: string | null;
  showOnlyFavSongs: boolean;
  isFetching: boolean;
  errorMessage: null | string;
  status: null | string;
}

export interface ISelectedMusicState {
  isSelected: boolean;
  audioInfo: IMusicItem | null;
  isPaused: boolean;
  isChanging: boolean;
  loop: boolean;
  musicDur: number;
  currentMT: number;
  audioVolume: number;
}
export interface IGlobalSettingState {
  defaultBg: string;
  selectedBg: null | string;
}
export interface IAuthState {
  userData: IUserData | null;
  isAuth: boolean;
  errorMessage: string | null;
  isFetching: boolean;
}
export interface IUserData {
  refreshToken: string;
  accessToken: string;
  email: string;
  user_name: string;
}
