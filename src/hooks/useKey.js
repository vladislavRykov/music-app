import { useEffect, useRef } from 'react';
export const useKey = (key, cb, dep) => {
  const callBackRef = useRef(cb);
  useEffect(() => {
    callBackRef.current = cb;
  });
  useEffect(() => {
    const handle = (e) => {
      if (e.keyCode === key) {
        e.preventDefault();
        callBackRef.current();
      }
    };

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [...dep]);
};
