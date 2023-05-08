import React from 'react';
import s from './MusicItem.module.scss';
import cn from 'classnames';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import {
  audioChangeWithTransition,
  setAudio,
  totalStopMusic,
} from '../../../../redux/Slices/selectedAudioSlice';
import { ImCross } from 'react-icons/im';
import ServerAPI from '../../../../services/musciApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { UserRemoveMusic, fetchUserMusic } from '../../../../redux/Slices/userMusicSlice';
import { IMusicItem } from '../../../../types';

interface MusicItemProps {
  music: IMusicItem;
  mountedStyles:
    | {
        right: string;
        opacity: string;
      }
    | {};
  index: number;
}

const MusicItem: React.FC<MusicItemProps> = ({ music, mountedStyles, index }) => {
  const dispatch = useAppDispatch();
  const [_id, type, { sortOrder, sortInfo, filterGenre, searchValue, showOnlyFavSongs }] =
    useAppSelector((state) => [
      state.selectedAudio.audioInfo?._id,
      state.selectedAudio.audioInfo?.type,
      state.userMusic,
    ]);
  const selectCondition = music._id == _id && music.type === type;
  function audioChange() {
    if (!selectCondition) {
      dispatch(audioChangeWithTransition(setAudio({ music, idx: index })));
    }
  }
  const deleteMusic = async () => {
    await dispatch(UserRemoveMusic(music._id));
    await dispatch(
      fetchUserMusic(() =>
        ServerAPI.getUserMusic({
          sortOrder,
          sortField: sortInfo.sortKey,
          genre: filterGenre.catKey,
          searchValue,
          isShowFav: showOnlyFavSongs,
        }),
      ),
    );
    dispatch(totalStopMusic());
  };

  return (
    <div
      onClick={audioChange}
      className={cn(s.music_item, { [s.selected]: selectCondition })}
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
};
export default MusicItem;
