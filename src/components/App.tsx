import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import s from './App.module.scss';
import { isEqual } from 'lodash';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { Router } from '../routes/Routes';
import { refreshUser } from '../redux/Slices/authSlice';
import { PageLoader } from './UI/pageLoader/PageLoader';
import delay from '../utils/delay';
import { useTheme } from '../hooks/useTheme';
const App: React.FC = (): React.ReactElement => {
  const [theme, setTheme] = useTheme();
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
    backgroundImage: `url(${selectedBg ? selectedBg : defaultBg})`,
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
    <BrowserRouter basename="/music-app">
      <div style={styles} className={s.app}>
        <div
          style={isChanging ? { opacity: '1' } : { opacity: '0' }}
          className={s.blackBlock}></div>
        <Router startPageProps={{ theme, setTheme }} />
      </div>
    </BrowserRouter>
  );
};

export default App;
