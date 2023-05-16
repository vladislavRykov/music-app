import React, { useEffect, useState } from 'react';
import s from './MusicPage.module.scss';
import NewLoader from '../../components/UI/Loader/NewLoader';
import { BackLink } from '../../components/UI/BackLink/BackLink';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import ServerAPI from '../../services/musciApi';
import { MusicAddModal } from '../../components/MusicPage/MusicAddModal/MusicAddModal';
import { fetchUserMusic } from '../../redux/Slices/userMusicSlice';
import MusicList from './../../components/MusicPage/MusicList/MusicList';

const MusicPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const [isModalShown, setIsModalShown] = useState(false);

  const { musics, isFetching, sortInfo, sortOrder, filterGenre, searchValue, showOnlyFavSongs } =
    useAppSelector((state) => state.userMusic);

  useEffect(() => {
    dispatch(
      fetchUserMusic(() =>
        ServerAPI.getUserMusic({
          sortOrder,
          sortField: sortInfo.sortKey,
          genre: filterGenre.catKey,
          searchValue,
          isShowFav: showOnlyFavSongs,
        }),
      ),
    );
  }, [sortInfo, filterGenre, sortOrder, searchValue, showOnlyFavSongs]);

  return (
    <div className={s.wrapper}>
      <div className={s.info_block}></div>
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
      <div className={s.bottom_block}>
        <BackLink to={'/'} classname={s.exit} />
        <button onClick={() => setIsModalShown(true)} className={s.upload_music}>
          Загрузить песню
        </button>
      </div>
      {isModalShown && (
        <MusicAddModal isModalShown={isModalShown} setIsModalShown={setIsModalShown} />
      )}
    </div>
  );
});
export default MusicPage;
