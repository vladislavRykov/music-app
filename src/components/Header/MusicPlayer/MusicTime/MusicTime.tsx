import React from 'react';
import s from '../../Header.module.scss';
import convertToTime from '../../../../utils/convertToTime';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { setMusicDuration } from '../../../../redux/Slices/selectedAudioSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
interface MusicTimeProps {
  audio: React.MutableRefObject<HTMLAudioElement | null>;
  currentMT: number;
  isSelected: boolean;
}
const MusicTime: React.FC<MusicTimeProps> = ({ audio, currentMT, isSelected }) => {
  const dispatch = useAppDispatch();
  const [musicDur, isChanging] = useAppSelector((state) => [
    state.selectedAudio.musicDur,
    state.selectedAudio.isChanging,
  ]);
  const [mouseOnInputTime, setMouseOnInputTime] = useState<string>('');
  const [timeBlockPosition, setTimeBlockPosition] = useState<number>(0);
  const [preRangeValue, setPreRangeValue] = useState<number>(0);
  const timeInput = useRef<HTMLInputElement | null>(null);
  const currentTimer = convertToTime(currentMT);
  const durationTimer = convertToTime(musicDur);

  const onMouseOnInput: React.MouseEventHandler<HTMLInputElement> = (e) => {
    const offset = (e.nativeEvent.offsetX / (e.target as HTMLInputElement).clientWidth) * musicDur;
    const { minutes, seconds } = convertToTime(offset);
    if (offset > 0 && offset <= musicDur) {
      setMouseOnInputTime(`${minutes}:${seconds}`);
      setTimeBlockPosition(e.nativeEvent.offsetX - 25);
      setPreRangeValue((e.nativeEvent.offsetX / (e.target as HTMLInputElement).clientWidth) * 100);
    } else if (offset <= 0) {
      setMouseOnInputTime('0:00');
    } else {
      setMouseOnInputTime(`${durationTimer.minutes}:${durationTimer.seconds}`);
    }
  };
  useEffect(() => {
    if (audio?.current?.duration) {
      dispatch(setMusicDuration(audio.current.duration));
      setMouseOnInputTime('');
      if (!isSelected) {
        audio.current.src = '';
        audio.current.removeAttribute('src');
      }
    }
  }, [isChanging]);
  return (
    <div className={s.music_time}>
      <span>
        {audio?.current?.currentTime ? `${currentTimer.minutes}:${currentTimer.seconds}` : '0:00'}
      </span>
      <div className={s.input_wrapper}>
        <div style={{ width: `${(currentMT / musicDur) * 100}%` }} className={s.range_value}></div>
        <div style={{ width: `${preRangeValue}%` }} className={s.range_prevalue}></div>
        <div style={{ left: timeBlockPosition + 'px' }} className={s.moving_timeBlock}>
          {mouseOnInputTime}
        </div>
        <input
          className={s.music_range}
          onMouseMove={onMouseOnInput}
          onMouseLeave={() => setPreRangeValue(0)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (audio.current) audio.current.currentTime = Number(e.target.value);
          }}
          value={currentMT}
          ref={timeInput}
          type="range"
          min={0}
          max={musicDur}
        />
      </div>
      <span>{musicDur && `${durationTimer.minutes}:${durationTimer.seconds}`}</span>
    </div>
  );
};
export default MusicTime;
