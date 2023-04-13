import React from 'react';
import s from '../../Filters.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { setSortField } from '../../../../../redux/Slices/musicSlice';
import cn from 'classnames';

export const SortItem = ({ sortInfo, sortTitle, sortKey }) => {
  const dispatch = useAppDispatch();
  const onSortClick = () => {
    dispatch(setSortField({ sortTitle, sortKey }));
  };
  return (
    <li className={cn(s.sort_item, { [s.sort_selectedItem]: sortKey === sortInfo.sortKey })}>
      <button onClick={onSortClick}>{sortTitle}</button>
    </li>
  );
};
