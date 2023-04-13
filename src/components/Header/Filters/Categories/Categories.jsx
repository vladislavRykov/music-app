import React, { useState } from 'react';
import s from '../Filters.module.scss';
import { fetchMusic, setShowOnlyFav } from '../../../../redux/Slices/musicSlice';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { CatElements } from './CatElement/CatElements';
export default function Categories({ dispatch }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { filters, filterGenre, showOnlyFavSongs } = useAppSelector((state) => state.allMusic);
  return (
    <div className={s.categories}>
      <h2>
        Категории:
        <span className={s.categories_dropDown}>
          <div
            onClick={() => setIsPopupOpen((prev) => !prev)}
            className={s.categories_selectedGenre}>
            {filterGenre.catTitle.toUpperCase() || filters[0].catTitle.toUpperCase()}
            {isPopupOpen && (
              <ul className={s.categories_list}>
                {filters.map((genre, idx) => (
                  <CatElements key={idx} genre={genre} />
                ))}
              </ul>
            )}
          </div>
        </span>
      </h2>
      <button style={{ width: '200px' }} onClick={() => dispatch(setShowOnlyFav())}>
        {showOnlyFavSongs ? 'Показать все' : 'Только избранное'}
      </button>
    </div>
  );
}
