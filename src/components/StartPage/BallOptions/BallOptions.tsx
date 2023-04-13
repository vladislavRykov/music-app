import React from 'react';
import s from './BallOptions.module.scss';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';

interface PropsT {
  isBallOpen: boolean;
}

const BallOptions: React.FC<PropsT> = ({ isBallOpen }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  return (
    <>
      <Link to={'/music/all'}>
        <div className={cn(s.option, s.option1, { [s.showOptions]: isBallOpen })}>Найти</div>
      </Link>
      <Link
        onClick={() => {
          if (!isAuth) {
            alert('Войди в аккаунт');
          }
        }}
        to={isAuth ? '/music/my' : '/login'}>
        <div className={cn(s.option, s.option2, { [s.showOptions]: isBallOpen })}>Моя музыка</div>
      </Link>
      <div className={cn(s.option, s.option3, { [s.showOptions]: isBallOpen })}></div>
    </>
  );
};
export default BallOptions;
