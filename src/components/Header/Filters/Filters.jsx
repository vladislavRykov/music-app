import React from 'react';
import s from './Filters.module.scss';
import { useDispatch } from 'react-redux';
import Categories from './Categories/Categories';
import Sort from './Sort/Sort';
import Search from './Search/Search';

export default function Filters() {
  const dispatch = useDispatch();
  return (
    <div className={s.wrapper}>
      <Categories dispatch={dispatch} />
      <Sort dispatch={dispatch} />
      <Search dispatch={dispatch} />
    </div>
  );
}
