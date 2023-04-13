import React, { useState } from 'react';
import { BsFillDoorClosedFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';
import s from './BackLink.module.scss';
interface BackLinkProps {
  to: string;
  classname?: string;
  color?: string;
  onclick?: () => void;
}

export const BackLink: React.FC<BackLinkProps> = ({
  onclick,
  color = 'black',
  to,
  classname = '',
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Link
      onClick={onclick}
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
      className={s.backArrow + ' ' + classname}
      to={to}>
      <h2>Назад</h2>
      <ImExit
        className={s.openedDoor}
        style={isOpened ? { display: 'block' } : {}}
        size={50}
        color={color}
        stroke={'white'}
        strokeWidth={'0.4px'}
      />
      <BsFillDoorClosedFill
        className={s.closedDoor}
        style={isOpened ? { display: 'none' } : {}}
        size={50}
        color={color}
        stroke={'white'}
        strokeWidth={'0.4px'}
      />
    </Link>
  );
};
