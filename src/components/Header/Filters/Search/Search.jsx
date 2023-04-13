import React, { useEffect, useRef, useState } from 'react';
import s from '../Filters.module.scss';
import { BiSearchAlt } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { setSearchValue } from '../../../../redux/Slices/musicSlice';
import { searchInputDebounce } from '../../../../utils/searchInputDebounce';
export default function Search({ dispatch }) {
  const searchValue = useAppSelector((state) => state.allMusic.searchValue);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputVal, setSearchInputVal] = useState(searchValue);
  const input = useRef();

  const onInputHandler = (e) => {
    setSearchInputVal(e.target.value);
    searchInputDebounce(dispatch, e.target.value);
  };
  const clearInput = () => {
    setSearchInputVal('');
    dispatch(setSearchValue(''));
    input.current.focus();
  };
  useEffect(() => {
    if (searchInputVal === '') {
      setSearchInput(false);
      input.current.blur();
    }
  }, [searchInputVal]);

  return (
    <div className={s.search_wrapper}>
      <div
        onMouseLeave={() => {
          if (searchInputVal === '') {
            setSearchInput(false);
            input.current.blur();
          }
        }}
        onMouseEnter={() => {
          setSearchInput(true);
          input.current.focus();
        }}
        className={s.search}>
        <input
          ref={input}
          onInput={onInputHandler}
          value={searchInputVal}
          placeholder="Type to search"
          className={s.search_input}
        />
        {searchInput ? (
          <ImCross onClick={clearInput} size={13} />
        ) : (
          <BiSearchAlt className={s.search_cross} size={20} />
        )}
      </div>
    </div>
  );
}
