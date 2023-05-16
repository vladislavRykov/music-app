import { debounce } from 'lodash';
import { setSearchValue } from '../redux/Slices/musicSlice';
export const searchInputDebounce = debounce(async (cb) => {
  cb();
}, 600);
