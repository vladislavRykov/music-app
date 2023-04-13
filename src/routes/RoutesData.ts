import { Navigate } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import MusicPage from '../pages/MusicPage/MusicPage';
import { Registration } from '../pages/Registration/Registration';
import { SearchMusic } from '../pages/SearchMusic/SearchMusic';
import StartPage from '../pages/StartPage/StartPage';

export const routes = [
  {
    path: '/',
    exact: true,
    element: StartPage,
    auth: false,
  },
  {
    path: '/music/my',
    exact: true,
    element: MusicPage,
    auth: true,
  },
  {
    path: '/music/all',
    exact: true,
    element: SearchMusic,
    auth: false,
  },
  {
    path: '/login',
    exact: true,
    element: Login,
    auth: false,
  },
  {
    path: '/register',
    exact: true,
    element: Registration,
    auth: false,
  },
];
