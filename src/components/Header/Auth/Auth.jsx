import React from 'react';
import { useLocation } from 'react-router-dom';
import ava from '../../../assets/ava.png';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { logoutUser } from '../../../redux/Slices/authSlice';
import Loader from '../../UI/Loader/Loader';
import s from './Auth.module.scss';
import { EnterButton } from './EnterButton/EnterButton';
import { UserInfo } from './UserInfo/UserInfo';

export default function Login() {
  const location = useLocation();
  const { isAuth, userData, isFetching } = useAppSelector((state) => state.auth);

  const AuthElement = isAuth ? (
    <UserInfo userData={userData} />
  ) : (
    location.pathname !== '/login' && <EnterButton />
  );

  return (
    <div className={s.logWrapper}>
      {!isFetching ? AuthElement : <Loader styles={{ paddingLeft: '50px' }} />}
    </div>
  );
}
