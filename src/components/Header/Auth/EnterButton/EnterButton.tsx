import React from 'react';
import s from '../Auth.module.scss';
import { Link } from 'react-router-dom';

export const EnterButton = () => {
  return (
    <Link to={'/login'} className={s.login}>
      <span>Войти</span>
    </Link>
  );
};
