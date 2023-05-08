import React from 'react';
import s from '../Filters.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setShowOnlyFav } from '../../../../redux/Slices/musicSlice';
import { setUserShowOnlyFav } from '../../../../redux/Slices/userMusicSlice';

export const Favorities = ({ isGlobalMusic }) => {
  const dispatch = useAppDispatch();
  const { showOnlyFavSongs } = useAppSelector((state) =>
    isGlobalMusic ? state.allMusic : state.userMusic,
  );
  return (
    <button
      className={s.toggleFav}
      style={{ width: '200px' }}
      onClick={() => dispatch(isGlobalMusic ? setShowOnlyFav() : setUserShowOnlyFav())}>
      {showOnlyFavSongs ? 'Показать все' : 'Только избранное'}
    </button>
  );
};
