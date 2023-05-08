import { AnyAction } from '@reduxjs/toolkit';
import { useState } from 'react';

const useFetching = (): [
  withFetching: (callback: () => Promise<any>) => Promise<void>,
  isLoading: boolean,
] => {
  const [isLoading, setIsLoading] = useState(false);

  const withFetching = async (callback: () => Promise<any>) => {
    setIsLoading(true);
    await callback();
    setIsLoading(false);
  };
  return [withFetching, isLoading];
};
export default useFetching;
