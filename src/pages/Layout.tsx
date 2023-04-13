import React from 'react';
import Header from './../components/Header/Header';
import s from '../App.module.scss';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <footer className={s.footer}>
        <span>all rights mine</span>
      </footer> */}
    </>
  );
};
