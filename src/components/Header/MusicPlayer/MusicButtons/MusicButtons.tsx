import React from 'react';
import s from '../../Header.module.scss';
import { setFavSA, setLoop, setPaused } from '../../../../redux/Slices/selectedAudioSlice';
import { BsFillPauseFill } from 'react-icons/bs';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiSkipNext } from 'react-icons/bi';
import { BiSkipPrevious } from 'react-icons/bi';
import { TfiLoop } from 'react-icons/tfi';
import { AiFillHeart } from 'react-icons/ai';
import { useKey } from '../../../../hooks/useKey';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import useFetching from '../../../../hooks/useFetching';
import {
  UserAddMusicFav,
  UserRemoveMusicFav,
  setUserFavM,
} from '../../../../redux/Slices/userMusicSlice';
import { IMusicItem } from '../../../../types';

interface MusicButtonsProps {
  audio: React.MutableRefObject<HTMLAudioElement | null>;
  nextSong: () => void;
  prevSong: () => void;
  audioInfo: IMusicItem | null;
  loop: boolean;
  currentMT: number;
}

const MusicButtons: React.FC<MusicButtonsProps> = ({
  audio,
  nextSong,
  prevSong,
  audioInfo,
  loop,
  currentMT,
}) => {
  const [withFetching, isLoading] = useFetching();
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector((state) => state.selectedAudio.isPaused);
  const removeFromFav = async () => {
    if (audioInfo) {
      await withFetching(async () => dispatch(UserRemoveMusicFav(audioInfo._id)));
      dispatch(setFavSA(false));
      dispatch(setUserFavM({ fav: false, musicId: audioInfo._id }));
    }
  };
  const addToFav = async () => {
    if (audioInfo) {
      await withFetching(async () => dispatch(UserAddMusicFav(audioInfo._id)));
      dispatch(setFavSA(true));
      dispatch(setUserFavM({ fav: true, musicId: audioInfo._id }));
    }
  };
  const audioPlay = () => {
    if (audio.current) {
      audio.current.play();
      dispatch(setPaused(false));
    }
  };
  const audioPause = () => {
    if (audio.current) {
      audio.current.pause();
      dispatch(setPaused(true));
    }
  };
  // useKey(32, () => onSpaceBar(isPaused, audioPlay, audioPause), [isPaused]);
  useKey(37, () => audio.current && (audio.current.currentTime = currentMT - 5), [isPaused]);
  useKey(39, () => audio.current && (audio.current.currentTime = currentMT + 5), [isPaused]);
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
      <div onClick={() => dispatch(setLoop())} className={s.loopWrap}>
        <TfiLoop className={s.loop} color={loop ? '#0ff1ff' : undefined} />
      </div>
      {audioInfo?.type === 'userMusic' && (
        <div onClick={!isLoading ? (audioInfo?.isFav ? removeFromFav : addToFav) : undefined}>
          <AiFillHeart
            className={s.heart}
            style={{ color: audioInfo?.isFav ? 'red' : undefined }}
          />
        </div>
      )}
    </div>
  );
};
export default MusicButtons;
