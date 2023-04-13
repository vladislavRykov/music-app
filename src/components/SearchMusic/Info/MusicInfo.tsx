import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import s from './MusicInfo.module.scss';
import { useAppDispatch } from './../../../hooks/reduxHooks';
import { addMusic, fetchMusic, removeMusic } from './../../../redux/Slices/musicSlice';
import { setChosen } from '../../../redux/Slices/selectedAudioSlice';
import ServerAPI from '../../../services/musciApi';

export const MusicInfo = () => {
  const dispatch = useAppDispatch();
  const [info, isAuth, { isFetching, filterGenre, sortInfo, sortOrder, searchValue }] =
    useAppSelector((state) => [state.selectedAudio.audioInfo, state.auth.isAuth, state.allMusic]);
  const addMusicHandler = async () => {
    if (info) {
      await dispatch(addMusic(info._id));
      await dispatch(
        fetchMusic(() =>
          ServerAPI.getAuthAllMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
        ),
      );
      dispatch(setChosen({ isChosen: true, num: 1 }));
    }
  };
  const removeMusicHandler = async () => {
    if (info) {
      await dispatch(removeMusic(info._id));
      await dispatch(
        fetchMusic(() =>
          ServerAPI.getAuthAllMusic(sortOrder, sortInfo.sortKey, filterGenre.catKey, searchValue),
        ),
      );
      dispatch(setChosen({ isChosen: false, num: -1 }));
    }
  };
  const buttonHandler = info?.isChosen ? removeMusicHandler : addMusicHandler;
  const buttonText = info?.isChosen ? 'Удалить из сохраненных' : 'Добавить в сохраненные';

  return (
    <div className={s.wrapper}>
      <div className={s.info_mainImg}>
        <img src={info?.bg_img} />
        <div className={s.shade}></div>
        <span>{info?.songName}</span>
      </div>
      <p className={s.chosenCount}>{`Добавили в сохраненные: ${info?.chosenByCount || 0}`}</p>
      <button onClick={buttonHandler} disabled={!isAuth || isFetching} className={s.save_song_btn}>
        {buttonText}
      </button>
      <p className={s.info_desc}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, velit. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Quidem, praesentium ex vero quia nostrum et
        non voluptatem iusto laborum impedit corrupti rem, dolorem ipsam mollitia consectetur
        perferendis ipsa aliquid ab?
      </p>
    </div>
  );
};
