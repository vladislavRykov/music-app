import React, { CSSProperties } from 'react';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import s from './NoMusic.module.scss';

export const NoMusic = (props: { className: CSSProperties }) => {
  return (
    <div className={s.wrap + ' ' + props.className}>
      <span>Не найдено</span>
      <MusicOffIcon fontSize="large" />
    </div>
  );
};
