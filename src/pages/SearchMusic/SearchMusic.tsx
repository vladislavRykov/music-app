import React from 'react';
import { useEffect } from 'react';
import { MusicInfo } from '../../components/SearchMusic/Info/MusicInfo';
import { MusicCollection } from '../../components/SearchMusic/Items/Items';
import { BackLink } from '../../components/UI/BackLink/BackLink';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchMusic, resetFilters } from '../../redux/Slices/musicSlice';
import { totalStopMusic } from '../../redux/Slices/selectedAudioSlice';
import s from './SearchMusic.module.scss';
import ServerAPI from './../../services/musciApi';

export const SearchMusic: React.FC = () => {
  const [isAuth, isSelected, { sortInfo, sortOrder, filterGenre, searchValue }] = useAppSelector(
    (state) => [state.auth.isAuth, state.selectedAudio.isSelected, state.allMusic],
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(
        fetchMusic(() =>
          ServerAPI.getAuthAllMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
        ),
      );
    } else {
      dispatch(
        fetchMusic(() =>
          ServerAPI.getAllMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
        ),
      );
    }
  }, [sortInfo, sortOrder, filterGenre, searchValue]);
  return (
    <div className={s.wrapper}>
      <MusicCollection />
      {isSelected && <MusicInfo />}
      <BackLink to={'/'} classname={s.exit} />
    </div>
  );
};
