import React from 'react';
import s from '../../Filters.module.scss';
import cn from 'classnames';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setFilterGenre } from '../../../../../redux/Slices/musicSlice';
import { setUserFilterGenre } from '../../../../../redux/Slices/userMusicSlice';

interface CatElementsProps {
  genre: { catTitle: string; catKey: string | null };
  filterGenre: { catTitle: string; catKey: string | null };
  isGlobalMusic: boolean;
}

export const CatElements: React.FC<CatElementsProps> = ({ genre, filterGenre, isGlobalMusic }) => {
  const dispatch = useAppDispatch();
  const isSelected = filterGenre.catTitle === genre.catTitle;
  const onCatClick = () => {
    dispatch(isGlobalMusic ? setFilterGenre(genre) : setUserFilterGenre(genre));
  };
  return (
    <li className={s.categories_item}>
      <button className={cn(s.item_btn, { [s.selectedItem]: isSelected })} onClick={onCatClick}>
        {genre.catTitle.toUpperCase()}
      </button>
    </li>
  );
};
