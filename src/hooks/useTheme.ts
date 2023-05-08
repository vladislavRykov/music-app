import { useEffect, useState } from 'react';

export const useTheme = (): [
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
] => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('selected-theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
  }, [theme]);
  return [theme, setTheme];
};
