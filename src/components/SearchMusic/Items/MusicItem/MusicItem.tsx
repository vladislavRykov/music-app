import React from 'react';
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
  const dispatch = useAppDispatch();
  const _id = useAppSelector((state) => state.selectedAudio.audioInfo?._id);
  function audioChange() {
    if (!(music._id == _id)) {
      dispatch(audioChangeWithTransition(setAudio({ music, idx: index })));
    }
  }
  return (
    <div onClick={audioChange} className={cn(s.songWrap, { [s.selected]: _id === music._id })}>
      <img src={music.small_img} alt="123" />
      <h2>{music.songName}</h2>
      <h3>{music.from}</h3>
    </div>
  );
};
