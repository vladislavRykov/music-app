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
import { useAppDispatch } from '../../../hooks/reduxHooks';

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isGlobalMusic = pathname === '/music/all';

  return (
    <div className={s.wrapper}>
      <div className={s.catAndFav}>
        <Categories isGlobalMusic={isGlobalMusic} />
        {pathname === '/music/my' && <Favorities isGlobalMusic={isGlobalMusic} />}
      </div>
      <div className={s.sortAndSearch}>
        <Sort isGlobalMusic={isGlobalMusic} />
        <Search isGlobalMusic={isGlobalMusic} />
      </div>
    </div>
  );
};
export default Filters;
