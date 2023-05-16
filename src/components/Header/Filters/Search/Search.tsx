import React, { ChangeEvent, useState } from 'react';
import s from '../Filters.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { searchInputDebounce } from '../../../../utils/searchInputDebounce';
import { Autocomplete, TextField } from '@mui/material';
import { setSearchValue } from '../../../../redux/Slices/musicSlice';
import { setUserSearchValue } from '../../../../redux/Slices/userMusicSlice';

interface SearchProps {
  isGlobalMusic: boolean;
}

const Search: React.FC<SearchProps> = ({ isGlobalMusic }) => {
  const dispatch = useAppDispatch();
  const { searchValue, musics } = useAppSelector((state) =>
    isGlobalMusic ? state.allMusic : state.userMusic,
  );
  const musicTitles = musics.map((music) => music.from + ' - ' + music.songName);
  const [searchInputVal, setSearchInputVal] = useState(searchValue);

  const onInputHandler = (e) => {
    setSearchInputVal(e.target.value === '' ? null : e.target.value);
    searchInputDebounce(() =>
      dispatch(isGlobalMusic ? setSearchValue(e.target.value) : setUserSearchValue(e.target.value)),
    );
  };
  const onChangeHandler = (e, newValue) => {
    setSearchInputVal(newValue);
    searchInputDebounce(() =>
      dispatch(isGlobalMusic ? setSearchValue(newValue) : setUserSearchValue(newValue)),
    );
  };

  return (
    <div className={s.search_wrapper}>
      <div className={s.search}>
        <Autocomplete
          freeSolo
          color="secondary"
          size="small"
          onInput={onInputHandler}
          onChange={onChangeHandler}
          value={searchInputVal}
          id="search-input-1"
          options={musicTitles}
          renderInput={(params) => (
            <TextField sx={{}} onClick={() => console.log(params)} {...params} label="Search" />
          )}
          noOptionsText={'Такой музыки нет'}
        />
      </div>
    </div>
  );
};
export default Search;
