import React from 'react';
import s from '../../Filters.module.scss';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setFilterGenre } from '../../../../../redux/Slices/musicSlice';

export const CatElements = ({ genre }) => {
  const dispatch = useAppDispatch();
  const onCatClick = () => {
    dispatch(setFilterGenre(genre));
  };
  return (
    <li className={s.categories_item}>
      <button onClick={onCatClick}>{genre.catTitle.toUpperCase()}</button>
    </li>
  );
};
