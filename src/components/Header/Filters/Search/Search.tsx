import React, { useState } from 'react';
import s from '../Filters.module.scss';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { searchInputDebounce } from '../../../../utils/searchInputDebounce';
import { Autocomplete, TextField } from '@mui/material';
import { setSearchValue } from '../../../../redux/Slices/musicSlice';
import { setUserSearchValue } from '../../../../redux/Slices/userMusicSlice';
export default function Search({ dispatch, isGlobalMusic }) {
  const { searchValue, musics } = useAppSelector((state) =>
    isGlobalMusic ? state.allMusic : state.userMusic,
  );
  const musicTitles = musics.map((music) => music.from + ' - ' + music.songName);
  const [searchInputVal, setSearchInputVal] = useState(searchValue);
  const autoCompSX = {
    width: '400px',
    '& label': {
      // fontSize: '20px',
      // right: '0px',
      // bottom: '0px',
      // left: 'unset',
      // top: 'unset,',
    },
    '& .MuiAutocomplete-inputRoot': {
      // fontSize: '18px',
      // fontWeight: '700',
      // backgroundColor: 'rgba(103, 174, 212, 0.6)',
      // padding: '5px 5px',
      '& .MuiAutocomplete-input': {
        // height: '16px',
        // padding: '0px 5px',
        // color: 'white',
        // textShadow: '1px 1px 1px black',
      },
    },
  };

  const onInputHandler = (e, newValue) => {
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
  // const clearInput = () => {
  //   setSearchInputVal('');
  //   dispatch(setSearchValue(''));
  //   input.current.focus();
  // };
  // useEffect(() => {
  //   if (searchInputVal === '') {
  //     setSearchInput(false);
  //     input.current.blur();
  //   }
  // }, [searchInputVal]);

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
          sx={autoCompSX}
          renderInput={(params) => (
            <TextField sx={{}} onClick={() => console.log(params)} {...params} label="Search" />
          )}
          noOptionsText={'Такой музыки нет'}
        />

        {/* {searchInput ? (
          <ImCross onClick={clearInput} size={13} />
        ) : (
          <BiSearchAlt className={s.search_cross} size={20} />
        )} */}
      </div>
    </div>
  );
}
