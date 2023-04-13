import React from 'react';
import s from './Header.module.scss';
import Login from './Auth/Auth';
import MusicPlayer from './MusicPlayer/MusicPlayer';
import Filters from './Filters/Filters';

const Header = React.memo(() => {
  return (
    <header>
      <div className={s.wrapper}>
        <Login />
        <Filters />
        <MusicPlayer />
      </div>
    </header>
  );
});
export default Header;
