import { debounce } from 'lodash';
import { setChanging, setPaused } from '../redux/Slices/selectedAudioSlice';
import { setBg } from '../redux/Slices/globalSettingSlice';
import delay from './delay';
export const changeMusicDebounce = debounce(async (dispatch, getState) => {
  dispatch(setPaused(false));
  const bg = getState().selectedAudio.audioInfo.bg_img;
  dispatch(setBg(bg));
  dispatch(setChanging(false));
}, 600);
// 12312
