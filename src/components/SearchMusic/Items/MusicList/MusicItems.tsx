import React from 'react';
import s from '../MusicItems.module.scss';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { MusicItem } from '../MusicItem/MusicItem';

export const MusicItems = () => {
  const { musics, isFetching } = useAppSelector(({ allMusic }) => allMusic);
  const musicElements = isFetching ? (
    <div>123</div>
  ) : (
    musics.map((el, index: number) => <MusicItem key={el.id} music={el} index={index} />)
  );
  return <div className={s.music_list}>{musicElements}</div>;
};
