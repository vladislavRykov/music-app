import React, { useRef, useEffect, useState } from 'react';
import MusicItem from './MusicItem/MusicItem';
import s from './MusicList.module.scss';
import { isEmpty } from 'lodash';
import { NoMusic } from '../../UI/NoMusic/NoMusic';
import { IMusicItem } from '../../../types';

interface MusicListProps {
  musics: IMusicItem[] | [];
}

const MusicList: React.FC<MusicListProps> = ({ musics }) => {
  const [mountedStyles, setMountedStyles] = useState<
    | {
        right: string;
        opacity: string;
      }
    | {}
  >({});
  const musicElemets = musics.map((el, index) => (
    <MusicItem key={index} music={el} index={index} mountedStyles={mountedStyles} />
  ));
  useEffect(() => {
    setMountedStyles({
      right: '0',
      opacity: '1',
    });
  }, []);
  const slider = useRef();
  const isDown = useRef(false);
  const startY = useRef();
  const scrollTop = useRef();
  return (
    <div
      style={isEmpty(mountedStyles) ? {} : { opacity: '1' }}
      ref={slider}
      className={s.music_list}
      onMouseDown={(e) => {
        isDown.current = true;
        startY.current = e.pageY - slider.current.offsetTop;
        scrollTop.current = slider.current.scrollTop;
      }}
      onMouseUp={() => {
        isDown.current = false;
      }}
      onMouseLeave={() => {
        isDown.current = false;
      }}
      onMouseMove={(e) => {
        if (isDown.current) {
          e.preventDefault();
          const y = e.pageY - slider.current.offsetTop;
          const walk = y - startY.current;
          slider.current.scrollTop = scrollTop.current - walk;
        }
      }}>
      <div className={s.music_wrapper}>
        {musics.length !== 0 ? musicElemets : <NoMusic className={s.NoMusic} />}
      </div>
    </div>
  );
};
export default MusicList;
