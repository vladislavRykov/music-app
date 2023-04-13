import { debounce } from 'lodash';
import { setSearchValue } from '../redux/Slices/musicSlice';
export const searchInputDebounce = debounce(async (dispatch, value) => {
  dispatch(setSearchValue(value));
}, 600);
