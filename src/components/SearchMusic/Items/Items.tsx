import React from 'react';
import s from './MusicItems.module.scss';
import { MusicItems } from './MusicList/MusicItems';

export const MusicCollection = () => {
  return (
    <div className={s.wrapper}>
      <MusicItems />
    </div>
  );
};
