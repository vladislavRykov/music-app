import React, { useState } from 'react';
import s from '../Filters.module.scss';
import { SortItem } from './SortItem/SortItem';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { setSortOrder } from '../../../../redux/Slices/musicSlice';
import { useLocation } from 'react-router-dom';
import { MusicListType } from '../../../../types';
import { setUserSortOrder } from '../../../../redux/Slices/userMusicSlice';

interface SortProps {
  isGlobalMusic: boolean;
}

const Sort: React.FC<SortProps> = ({ isGlobalMusic }) => {
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const sortList = [
    { sortTitle: 'По названию', sortKey: 'songName' },
    { sortTitle: 'По автору', sortKey: 'from' },
    { sortTitle: 'По популярности', sortKey: 'chosenByCount' },
  ];

  const { sortInfo, sortOrder } = useAppSelector((state) =>
    isGlobalMusic ? state.allMusic : state.userMusic,
  );

  return (
    <div className={s.sort}>
      <h2>
        <span>Сортировка: </span>
        <span onClick={() => setIsPopupOpen((prev) => !prev)} className={s.sort_dropDown}>
          <div className={s.sort_sortTitle}>{sortInfo.sortTitle}</div>
          {isPopupOpen && (
            <ul className={s.sort_list}>
              {sortList.map((sort) => (
                <SortItem
                  key={sort.sortKey}
                  sortInfo={sortInfo}
                  sortTitle={sort.sortTitle}
                  sortKey={sort.sortKey}
                  isGlobalMusic={isGlobalMusic}
                />
              ))}
            </ul>
          )}
        </span>
        <div className={s.sort_arrows}>
          {sortOrder === 1 && (
            <BiUpArrowAlt
              color="white"
              onClick={() => dispatch(isGlobalMusic ? setSortOrder(-1) : setUserSortOrder(-1))}
            />
          )}
          {sortOrder === -1 && (
            <BiDownArrowAlt
              color="white"
              onClick={() => dispatch(isGlobalMusic ? setSortOrder(1) : setUserSortOrder(1))}
            />
          )}
        </div>
      </h2>
    </div>
  );
};
export default Sort;
