import React, { useState } from 'react';
import s from '../Filters.module.scss';
import { SortItem } from './SortItem/SortItem';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { setSortOrder } from '../../../../redux/Slices/musicSlice';
export default function Sort({ dispatch }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log(isPopupOpen);
  const sortList = [
    { sortTitle: 'По названию', sortKey: 'songName' },
    { sortTitle: 'По автору', sortKey: 'from' },
    { sortTitle: 'По популярности', sortKey: 'chosenByCount' },
  ];
  const { sortInfo, sortOrder } = useAppSelector((state) => state.allMusic);
  return (
    <div className={s.sort}>
      <h2>
        <span>Сортировка: </span>
        <span onClick={() => setIsPopupOpen((prev) => !prev)} className={s.sort_dropDown}>
          <div className={s.sort_sortTitle}>{sortInfo.sortTitle}</div>
          {isPopupOpen && (
            <ul className={s.sort_list}>
              {sortList.map((sort) => (
                <SortItem sortInfo={sortInfo} sortTitle={sort.sortTitle} sortKey={sort.sortKey} />
              ))}
            </ul>
          )}
        </span>
        <div className={s.sort_arrows}>
          {sortOrder === 1 && (
            <BiUpArrowAlt color="white" onClick={() => dispatch(setSortOrder(-1))} />
          )}
          {sortOrder === -1 && (
            <BiDownArrowAlt color="white" onClick={() => dispatch(setSortOrder(1))} />
          )}
        </div>
      </h2>
    </div>
  );
}
