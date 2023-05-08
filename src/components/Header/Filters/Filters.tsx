import React from 'react';
import s from './Filters.module.scss';
import { useDispatch } from 'react-redux';
import Categories from './Categories/Categories';
import Sort from './Sort/Sort';
import Search from './Search/Search';
import { Autocomplete, TextField } from '@mui/material';
import { Favorities } from './Favorites/Favorities';
import { useLocation } from 'react-router-dom';
import { MusicListType } from '../../../types';

export default function Filters() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isGlobalMusic = pathname === '/music/all';

  return (
    <div className={s.wrapper}>
      <div className={s.catAndFav}>
        <Categories dispatch={dispatch} isGlobalMusic={isGlobalMusic} />
        {pathname === '/music/my' && <Favorities isGlobalMusic={isGlobalMusic} />}
      </div>
      <div className={s.sortAndSearch}>
        <Sort dispatch={dispatch} isGlobalMusic={isGlobalMusic} />
        <Search dispatch={dispatch} isGlobalMusic={isGlobalMusic} />
      </div>
    </div>
  );
}
