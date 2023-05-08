import React from 'react';
import s from './Header.module.scss';
import Login from './Auth/Auth';
import MusicPlayer from './MusicPlayer/MusicPlayer';
import Filters from './Filters/Filters';
import { useLocation } from 'react-router-dom';

const Header = React.memo(() => {
  const location = useLocation();
  const isFilterShow = location.pathname.includes('music') ? true : false;
  return (
    <header>
      <div className={s.wrapper}>
        <Login />
        {isFilterShow && <Filters />}
        <MusicPlayer />
      </div>
    </header>
  );
});
export default Header;
