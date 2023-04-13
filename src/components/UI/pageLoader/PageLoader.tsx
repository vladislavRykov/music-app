import React from 'react';
import s from './PageLoader.module.scss';
import pageLoader from '../../../assets/pageLoader.gif';

export const PageLoader = ({ error = null }: { error: string | null }) => {
  return (
    <div className={s.loader}>
      <img src={pageLoader} />
      <p>{error && 'CONNECTION ERROR'}</p>
    </div>
  );
};
