import React, { useState } from 'react';
import s from './StartPage.module.scss';
import cn from 'classnames';
import BallOptions from '../../components/StartPage/BallOptions/BallOptions';
import { useTheme } from '../../hooks/useTheme';
import { ChangeTheme } from '../../components/StartPage/ChangeTheme/ChangeTheme';

interface StartPageProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const StartPage: React.FC<StartPageProps> = ({ theme, setTheme }) => {
  console.log(theme, setTheme);
  const [isBallOpen, setIsBallOpen] = useState<boolean>(false);
  const onBallClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsBallOpen(!isBallOpen);
  };
  return (
    <div className={s.wrapper}>
      <div onClick={onBallClick} className={cn(s.container, { [s.moveBall]: isBallOpen })}>
        <div className={s.main_shape}></div>
        <BallOptions isBallOpen={isBallOpen} />
        <div className={s.small_circle}>CHILL</div>
      </div>
      <ChangeTheme theme={theme} setTheme={setTheme} />
    </div>
  );
};
export default StartPage;
