import React, { useState } from 'react';
import s from '../Auth.module.scss';
import ava from '../../../../assets/ava3.webp';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { logoutUser } from '../../../../redux/Slices/authSlice';

export const UserInfo = ({ userData }) => {
  const dispatch = useAppDispatch();
  const [isPopup, setIsPopup] = useState(false);

  return (
    <div className={s.userMenu}>
      <img onClick={() => setIsPopup((prev) => !prev)} className={s.userMenu_img} src={ava}></img>
      <div style={{ opacity: isPopup ? 1 : 0 }} className={s.popup}>
        <div className={s.container}>
          <h2 className={s.userName}>{userData?.user_name}fewfwefewffwefwe</h2>
          <button onClick={() => dispatch(logoutUser())}>Выйти</button>
        </div>
      </div>
    </div>
  );
};
