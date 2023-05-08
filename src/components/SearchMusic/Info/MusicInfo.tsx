import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import s from './MusicInfo.module.scss';
import { useAppDispatch } from './../../../hooks/reduxHooks';
import { addMusic, removeMusic, setChosenM } from './../../../redux/Slices/musicSlice';
import { setChosenSA } from '../../../redux/Slices/selectedAudioSlice';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingButton } from '@mui/lab';
import useFetching from '../../../hooks/useFetching';

export const MusicInfo = () => {
  const dispatch = useAppDispatch();
  const [withFetching, isLoading] = useFetching();
  const [info, isAuth] = useAppSelector((state) => [
    state.selectedAudio.audioInfo,
    state.auth.isAuth,
  ]);
  const addMusicHandler = async () => {
    if (info) {
      await withFetching(async () => dispatch(addMusic(info._id)));
      dispatch(setChosenM({ isChosen: true, num: 1, musicId: info._id }));
      dispatch(setChosenSA({ isChosen: true, num: 1 }));
    }
  };
  const removeMusicHandler = async () => {
    if (info) {
      await withFetching(async () => dispatch(removeMusic(info._id)));
      dispatch(setChosenM({ isChosen: false, num: -1, musicId: info._id }));
      dispatch(setChosenSA({ isChosen: false, num: -1 }));
    }
  };
  const buttonHandler = info?.isChosen ? removeMusicHandler : addMusicHandler;
  const buttonText = info?.isChosen ? 'Удалить из сохраненных' : 'Добавить в сохраненные';

  return (
    <div className={s.wrapper}>
      <div className={s.info_mainImg}>
        <img alt="background" src={info?.bg_img} />
        <div className={s.shade}></div>
        <span>{info?.songName}</span>
      </div>
      <p className={s.chosenCount}>
        {`Добавили в сохраненные: ${info?.chosenByCount || 0}`}
        <PersonIcon fontSize="large" />
      </p>
      <LoadingButton
        variant="contained"
        onClick={buttonHandler}
        disabled={!isAuth}
        loading={isLoading}
        sx={{
          backgroundColor: 'rgba(142, 142, 231, 0.468)',
          color: 'black',
          borderRadius: '10px',
          padding: '8px 14px',
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '5px',
          '&:hover': {
            backgroundColor: 'rgba(87, 87, 245, 0.468)',
          },
        }}>
        {buttonText}
      </LoadingButton>
      <p className={s.info_desc}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, velit. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Quidem, praesentium ex vero quia nostrum et
        non voluptatem iusto laborum impedit corrupti rem, dolorem ipsam mollitia consectetur
        perferendis ipsa aliquid ab?
      </p>
    </div>
  );
};
