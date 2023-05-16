import React, { ChangeEvent, ChangeEventHandler } from 'react';
import s from '../../Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAudioVolume } from '../../../../redux/Slices/selectedAudioSlice';
import { Slider, SliderTypeMap } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

interface MusicVolumeProps {
  audio: React.MutableRefObject<HTMLAudioElement | null>;
}

const MusicVolume: React.FC<MusicVolumeProps> = ({ audio }) => {
  const dispatch = useAppDispatch();
  const audioVolume = useAppSelector((state) => state.selectedAudio.audioVolume);
  useEffect(() => {
    if (audio.current) {
      audio.current.volume = audioVolume;
    }
  }, [audioVolume]);
  return (
    <div className={s.music_volume}>
      <Slider
        value={audioVolume * 100}
        onChange={(e: any) => dispatch(setAudioVolume(e.target.value / 100))}
        min={0}
        max={100}
        className={s.mui_slider}
        // sx={{ width: 130 }}
      />
    </div>
  );
};
export default MusicVolume;
