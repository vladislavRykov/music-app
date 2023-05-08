import React from 'react';
import s from '../../Filters.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { setSortField } from '../../../../../redux/Slices/musicSlice';
import cn from 'classnames';
import { setUserSortField } from '../../../../../redux/Slices/userMusicSlice';

export const SortItem = ({ sortInfo, sortTitle, sortKey, isGlobalMusic }) => {
  const dispatch = useAppDispatch();
  const isSelected = sortKey === sortInfo.sortKey;
  const onSortClick = () => {
    !isSelected &&
      dispatch(
        isGlobalMusic
          ? setSortField({ sortTitle, sortKey })
          : setUserSortField({ sortTitle, sortKey }),
      );
  };
  return (
    <li className={s.sort_item}>
      <button className={`${s.item_btn} ${isSelected ? s.selectedItem : ''}`} onClick={onSortClick}>
        {sortTitle}
      </button>
    </li>
  );
};
