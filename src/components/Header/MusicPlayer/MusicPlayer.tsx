import React, { ChangeEvent } from 'react';
import s from '../Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { ImCross } from 'react-icons/im';
import {
  setNextAudio,
  setPrevAudio,
  audioChangeWithTransition,
  setCurrentMT,
  totalStopMusic,
} from '../../../redux/Slices/selectedAudioSlice';
import MusicButtons from './MusicButtons/MusicButtons';
import MusicVolume from './MusicVolume/MusicVolume';
import MusicTime from './MusicTime/MusicTime';
import { useKey } from '../../../hooks/useKey';

export default function MusicPlayer() {
  const navigate = useLocation();
  const dispatch = useAppDispatch();
  const [audioInfo, musics, userMusic, isSelected, loop, currentMT] = useAppSelector((state) => [
    state.selectedAudio.audioInfo,
    state.allMusic.musics,
    state.userMusic.musics,
    state.selectedAudio.isSelected,
    state.selectedAudio.loop,
    state.selectedAudio.currentMT,
  ]);
  const audio = useRef<HTMLAudioElement | null>(null);
  const nextSong = () => {
    dispatch(
      audioChangeWithTransition(
        setNextAudio({ audioInfo, musics: audioInfo?.type === 'globalMusic' ? musics : userMusic }),
      ),
    );
  };
  const prevSong = () => {
    dispatch(
      audioChangeWithTransition(
        setPrevAudio({ audioInfo, musics: audioInfo?.type === 'globalMusic' ? musics : userMusic }),
      ),
    );
  };
  useKey(38, () => prevSong(), []);
  useKey(40, () => nextSong(), []);
  return (
    <div className={s.music_wrapper}>
      <div
        style={!isSelected ? { opacity: -1, visibility: 'hidden', right: '-220px' } : undefined}
        className={s.music}>
        <span className={s.music_name}>
          <span className={s.music_nameAnimation}>
            <span className={s.music_animationContainer}>
              <span className={s.title}>
                {' '}
                {`${audioInfo?.from || ''} - ${audioInfo?.songName || ''}`}
              </span>
              <span className={s.otherText}>...CHILL MUSIC...</span>
            </span>
          </span>
        </span>
        <div className={s.music_controls}>
          <MusicButtons
            audio={audio}
            loop={loop}
            audioInfo={audioInfo}
            nextSong={nextSong}
            prevSong={prevSong}
            currentMT={currentMT}
          />
          <MusicVolume audio={audio} />
          <MusicTime isSelected={isSelected} currentMT={currentMT} audio={audio} />
        </div>
        <div className={s.cross} onClick={() => dispatch(totalStopMusic())}>
          <ImCross />
        </div>

        <audio
          onTimeUpdate={(e: ChangeEvent<HTMLAudioElement>) =>
            dispatch(setCurrentMT(e.target.currentTime))
          }
          loop={loop}
          onEnded={!loop ? nextSong : undefined}
          ref={audio}
          autoPlay
          src={audioInfo?.source}
        />
      </div>
    </div>
  );
}
