import React from 'react';
import s from '../MusicItems.module.scss';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { MusicItem } from '../MusicItem/MusicItem';
import SearchMusicLoader from '../../../UI/Loader/SearchMusicLoader';
import { NoMusic } from '../../../UI/NoMusic/NoMusic';
import { IMusicItem } from '../../../../types';

export const MusicItems = () => {
  const { musics, isFetching } = useAppSelector(({ allMusic }) => allMusic);
  const musicSkeleton = Array(12)
    .fill(5)
    .map((el, idx) => <SearchMusicLoader key={idx} />);
  const musicElements = isFetching ? (
    <div>{musicSkeleton}</div>
  ) : (
    musics.map((el: IMusicItem, index: number) => (
      <MusicItem key={el._id} music={el} index={index} />
    ))
  );
  return (
    <div className={s.music_list}>
      {musics.length !== 0 ? musicElements : <NoMusic className={s.NoMusic} />}
    </div>
  );
};
