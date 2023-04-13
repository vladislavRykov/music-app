import React from 'react';
import s from '../../Header.module.scss';
import { useState, useEffect } from 'react';
import {
  audioChangeWithTransition,
  setFav,
  setLoop,
  setPaused,
} from '../../../../redux/Slices/selectedAudioSlice';
import { BsFillPauseFill } from 'react-icons/bs';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiSkipNext } from 'react-icons/bi';
import { BiSkipPrevious } from 'react-icons/bi';
import { TfiLoop } from 'react-icons/tfi';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { onSpaceBar } from './toggleOnSpaceBar';
import { useKey } from '../../../../hooks/useKey';
import ServerAPI from '../../../../services/musciApi';
import { addMusicFav, fetchMusic, removeMusicFav } from '../../../../redux/Slices/musicSlice';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { useLocation } from 'react-router-dom';

export default function MusicButtons({ audio, nextSong, prevSong, audioInfo, loop, currentMT }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isPaused, { sortInfo, sortOrder, searchValue, filterGenre, isFetching }] = useAppSelector(
    (state) => [state.selectedAudio.isPaused, state.allMusic],
  );
  const removeFromFav = async () => {
    await dispatch(removeMusicFav(audioInfo._id));
    await dispatch(
      fetchMusic(() =>
        ServerAPI.getUserMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
      ),
    );
    dispatch(setFav(false));
  };
  const addToFav = async () => {
    await dispatch(addMusicFav(audioInfo._id));
    await dispatch(
      fetchMusic(() =>
        ServerAPI.getUserMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
      ),
    );
    dispatch(setFav(true));
  };
  const audioPlay = () => {
    audio.current.play();
    dispatch(setPaused(false));
  };
  const audioPause = () => {
    audio.current.pause();
    dispatch(setPaused(true));
  };
  // useKey(32, () => onSpaceBar(isPaused, audioPlay, audioPause), [isPaused]);
  useKey(37, () => (audio.current.currentTime = currentMT - 5), [isPaused]);
  useKey(39, () => (audio.current.currentTime = currentMT + 5), [isPaused]);
  return (
    <div className={s.music_btns}>
      <div>
        <BiSkipPrevious onClick={prevSong} />
      </div>
      {isPaused ? (
        <div>
          <BsFillPlayFill onClick={audioPlay} />
        </div>
      ) : (
        <div>
          <BsFillPauseFill onClick={audioPause} />
        </div>
      )}
      <div>
        <BiSkipNext onClick={nextSong} />
      </div>
      <div onClick={() => dispatch(setLoop())} className={s.loop}>
        <TfiLoop color={loop ? '#0ff1ff' : 'white'} />
      </div>
      {Object.hasOwn(audioInfo || {}, 'isFav') && location.pathname == '/music/my' && (
        <div
          onClick={!isFetching && (audioInfo?.isFav ? removeFromFav : addToFav)}
          className={s.heart}>
          <AiFillHeart color={audioInfo?.isFav ? 'red' : 'white'} />
        </div>
      )}
    </div>
  );
}
