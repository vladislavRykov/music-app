import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { IMusicItem } from '../../../../types';
import s from '../MusicItems.module.scss';
import { audioChangeWithTransition, setAudio } from './../../../../redux/Slices/selectedAudioSlice';
interface MusicItemProps {
  music: IMusicItem;
  index: number;
}
export const MusicItem: React.FC<MusicItemProps> = ({ music, index }) => {
  const [mountStyles, setMountStyles] = useState({});
  useEffect(() => {
    setMountStyles({
      opacity: '1',
    });
  }, []);
  const dispatch = useAppDispatch();
  const [_id, type] = useAppSelector((state) => [
    state.selectedAudio.audioInfo?._id,
    state.selectedAudio.audioInfo?.type,
  ]);
  const selectCondition = music._id == _id && music.type === type;
  function audioChange() {
    if (!selectCondition) {
      dispatch(audioChangeWithTransition(setAudio({ music, idx: index })));
    }
  }
  return (
    <div
      onClick={audioChange}
      style={mountStyles}
      className={cn(s.songWrap, { [s.selected]: selectCondition })}>
      <img src={music.small_img} alt="123" />
      <div className={s.text}>
        <h2>{music.songName}</h2>
        <h3>{music.from}</h3>
      </div>
    </div>
  );
};
