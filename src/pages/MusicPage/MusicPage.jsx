import React, { useEffect, useState } from 'react';
import MusicList from '../../components/MusicPage/MusicList/MusicList';
import s from './MusicPage.module.scss';
import { fetchMusic, resetFilters, setMusic } from '../../redux/Slices/musicSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewLoader from '../../components/UI/Loader/NewLoader';
import { Link, Navigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { BsFillDoorClosedFill } from 'react-icons/bs';
import { BackLink } from '../../components/UI/BackLink/BackLink';
import { totalStopMusic } from '../../redux/Slices/selectedAudioSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import ServerAPI from './../../services/musciApi';

const MusicPage = React.memo(() => {
  const dispatch = useDispatch();
  const [
    { musics, isFetching, sortInfo, sortOrder, filterGenre, searchValue, showOnlyFavSongs },
    isAuth,
  ] = useAppSelector((state) => [state.allMusic, state.auth.isAuth]);

  useEffect(() => {
    dispatch(
      fetchMusic(() =>
        ServerAPI.getUserMusic(
          sortOrder,
          sortInfo.sortKey,
          filterGenre.catKey,
          searchValue,
          showOnlyFavSongs,
        ),
      ),
    );
  }, [sortInfo, filterGenre, sortOrder, searchValue, showOnlyFavSongs]);

  return (
    <div className={s.wrapper}>
      <div className={s.list_wrapper}>
        {!isFetching ? (
          <MusicList musics={musics} />
        ) : (
          <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NewLoader />
            <NewLoader />
            <NewLoader />
            <NewLoader />
            <NewLoader />
            <NewLoader />
          </div>
        )}
      </div>
      <BackLink to={'/'} classname={s.exit} />
    </div>
  );
});
export default MusicPage;
