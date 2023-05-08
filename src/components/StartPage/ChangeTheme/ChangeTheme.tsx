import React, { CSSProperties } from 'react';
import s from './ChangeTheme.module.scss';
import cn from 'classnames';
import classNames from 'classnames';

interface ChangeTimeProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  className?: CSSProperties;
}

export const ChangeTheme = ({ theme, setTheme, className = {} }: ChangeTimeProps) => {
  const buttonText = theme === 'dark' ? 'Темная тема' : 'Светлая тема';
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <button className={cn(s.button, className)} onClick={toggleTheme}>
      {buttonText}
    </button>
  );
};
