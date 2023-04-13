import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import s from './App.module.scss';
import { isEqual } from 'lodash';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { Router } from './routes/Routes';
import ServerAPI from './services/musciApi';
import { refreshUser, setIsFetching } from './redux/Slices/authSlice';
import { PageLoader } from './components/UI/pageLoader/PageLoader';
import delay from './utils/delay';
const App: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const firstMount = useRef(true);
  const [defaultBg, selectedBg, isChanging, { isFetching, errorMessage }] = useAppSelector(
    (state) => [
      state.setting.defaultBg,
      state.setting.selectedBg,
      state.selectedAudio.isChanging,
      state.auth,
      state.allMusic,
    ],
    isEqual,
  );
  const styles: React.CSSProperties = {
    backgroundImage: `url("${selectedBg ? selectedBg : defaultBg}")`,
  };
  useEffect(() => {
    (async () => {
      await delay(2000);
      const res = await dispatch(refreshUser());
      // dispatch(setIsFetching(true));
    })();
  }, []);
  if (isFetching && firstMount.current) {
    firstMount.current = false;
    return <PageLoader error={errorMessage} />;
  }
  return (
    <BrowserRouter>
      <div style={styles} className={s.app}>
        <div
          style={isChanging ? { opacity: '1' } : { opacity: '0' }}
          className={s.blackBlock}></div>
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;
