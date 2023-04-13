import React from 'react';
import { Oval } from 'react-loader-spinner';
import s from './Loader.module.scss';

export default function Loader({ styles = {} }) {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={styles}
      // wrapperStyle={{ marginBottom: '100px' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
