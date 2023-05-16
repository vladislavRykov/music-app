import React from 'react';
import s from '../../Filters.module.scss';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setSortField } from '../../../../../redux/Slices/musicSlice';
import { setUserSortField } from '../../../../../redux/Slices/userMusicSlice';

interface SortItemProps {
  sortInfo: { sortTitle: string; sortKey: string };
  sortTitle: string;
  sortKey: string;
  isGlobalMusic: boolean;
}

export const SortItem: React.FC<SortItemProps> = ({
  sortInfo,
  sortTitle,
  sortKey,
  isGlobalMusic,
}) => {
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
