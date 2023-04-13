import React, { useState, useRef } from 'react';
import s from './MusicItem.module.scss';
import cn from 'classnames';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  audioChangeWithTransition,
  setAudio,
  totalStopMusic,
} from '../../../../redux/Slices/selectedAudioSlice';
import { ImCross } from 'react-icons/im';
import { fetchMusic, removeMusic } from './../../../../redux/Slices/musicSlice';
import ServerAPI from '../../../../services/musciApi';
import { useAppSelector } from '../../../../hooks/reduxHooks';
export default function MusicItem({ music, mountedStyles, index }) {
  const dispatch = useDispatch();
  const [_id, { sortOrder, sortInfo, filterGenre, searchValue, showOnlyFavSongs }] = useAppSelector(
    (state) => [state.selectedAudio.audioInfo?._id, state.allMusic],
  );
  function audioChange() {
    if (!(music._id == _id)) {
      dispatch(audioChangeWithTransition(setAudio({ music, idx: index })));
    }
  }
  const deleteMusic = async () => {
    await dispatch(removeMusic(music._id));
    await dispatch(
      fetchMusic(() =>
        ServerAPI.getUserMusic(
          sortOrder,
          sortInfo.sortKey,
          filterGenre.catKey,
          searchValue,
          showOnlyFavSongs,
        ),
      ),
    );
    dispatch(totalStopMusic());
  };

  return (
    <div
      onClick={audioChange}
      className={cn(s.music_item, { [s.selected]: _id === music._id })}
      style={mountedStyles}>
      <img src={music.small_img} />
      <div className={s.music_info}>
        <h2>{`${music.from} - ${music.songName}`}</h2>
        <div style={music.isFav ? undefined : { display: 'none' }} className={s.like}>
          <BsFillBookmarkHeartFill />
        </div>
      </div>
      <ImCross onClick={deleteMusic} className={s.deleteMusic} />
    </div>
  );
}
