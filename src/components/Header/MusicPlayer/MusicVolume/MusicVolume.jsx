import React from 'react';
import s from '../../Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAudioVolume } from '../../../../redux/Slices/selectedAudioSlice';

export default function MusicVolume({ audio }) {
  const dispatch = useDispatch();
  const audioVolume = useSelector((state) => state.selectedAudio.audioVolume);
  useEffect(() => {
    if (audio.current) {
      audio.current.volume = audioVolume;
    }
  }, [audioVolume]);
  return (
    <div className={s.music_volume}>
      <input
        min={0}
        max={100}
        type="range"
        value={audioVolume * 100}
        onInput={(e) => dispatch(setAudioVolume(e.target.value / 100))}
      />
    </div>
  );
}
