import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loader({ styles = {} }) {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={styles}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
