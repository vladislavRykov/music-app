import { useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { MdOutlineDone } from 'react-icons/md';
import s from './MusicAddModal.module.scss';
import cn from 'classnames';
import imgPH from '../../../assets/imgUploadPH.jpg';
import ServerAPI, { BASE_URL } from '../../../services/musciApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchMusic } from '../../../redux/Slices/musicSlice';
import { fetchUserMusic } from '../../../redux/Slices/userMusicSlice';

interface MusicAddModalProps {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MusicAddModal: React.FC<MusicAddModalProps> = ({ isModalShown, setIsModalShown }) => {
  const dispatch = useAppDispatch();
  const { sortInfo, sortOrder, filterGenre, searchValue, showOnlyFavSongs } = useAppSelector(
    (state) => state.userMusic,
  );
  const [smallImgPrev, setSmallImgPrev] = useState('');
  const [bgImgPrev, setBgImgPrev] = useState('');
  const formik = useFormik({
    initialValues: {
      songName: '',
      from: '',
      musicFile: '',
      small_img: '',
      bg_img: '',
      genre: '',
    },
    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData();
      formData.append('bigImg', values.bg_img);
      formData.append('smallImg', values.small_img);
      formData.append('audio', values.musicFile);
      console.log(formData);
      const { data } = await ServerAPI.uploadFiles(formData);
      const musicData = {
        songName: values.songName,
        from: values.from,
        source: BASE_URL + data.audioPath,
        small_img: BASE_URL + data.smallImgPath,
        bg_img: BASE_URL + data.bigImgPath,
        genre: values.genre,
      };
      await ServerAPI.createMusic(musicData);
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
      setIsModalShown(false);
    },
  });
  // const validationSchema = yup.object().shape({
  //   email: yup.string().required('Это поле не должно быть пустым.').email('Введите почту.'),
  //   password: yup.string().required('Это поле не должно быть пустым'),
  // });
  const onSmallImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      formik.setFieldValue('small_img', event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSmallImgPrev(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const onBgImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      formik.setFieldValue('bg_img', event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImgPrev(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div onClick={() => setIsModalShown(false)} className={s.modal}>
      <div onClick={(e) => e.stopPropagation()} className={s.modal_block}>
        <ImCross className={s.closeCross} onClick={() => setIsModalShown(false)} />
        <h2>Форма добавления песни</h2>
        <form className={s.modal_form} onSubmit={formik.handleSubmit}>
          <div className={s.files_fields}>
            <div className={cn(s.input, s.input_img)}>
              <input
                hidden
                accept="image/*"
                className={''}
                type={'file'}
                required
                id="small_img"
                name="small_img"
                onChange={onSmallImgChange}
              />
              <label htmlFor="small_img">
                Загрузить изображения для музыки
                <img className={s.small_prev} src={smallImgPrev || imgPH} />
              </label>
              {/* <p>{formik.errors.email && formik.touched.email && formik.errors.email}</p> */}
            </div>
            <div className={cn(s.input, s.input_img)}>
              <input
                accept="image/*"
                hidden
                className={''}
                type={'file'}
                required
                id="bg_img"
                name="bg_img"
                onChange={onBgImgChange}
              />
              <label htmlFor="bg_img">
                Загрузить изображение-бэкграунд для музыки
                <img className={s.bg_prev} src={bgImgPrev || imgPH} />
              </label>
              {/* <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p> */}
            </div>
            <div className={cn(s.input, s.input_audio)}>
              <input
                hidden
                accept="audio/*"
                className={''}
                type={'file'}
                required
                id="musicFile"
                name="musicFile"
                onChange={(event) =>
                  formik.setFieldValue('musicFile', event.target.files && event.target.files[0])
                }
              />
              <label htmlFor="musicFile">
                Аудио файл формата .mp3
                {formik.values.musicFile && <MdOutlineDone color="green" size={25} />}
              </label>
              {/* <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p> */}
            </div>
          </div>
          <div className={s.string_fields}>
            <div className={cn(s.input, s.input_text)}>
              <input
                onChange={formik.handleChange}
                value={formik.values.songName}
                className={''}
                required
                id="songName"
                name="songName"
              />
              <label htmlFor="songName">Название</label>
              {/* <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p> */}
            </div>
            <div className={cn(s.input, s.input_text)}>
              <input
                onChange={formik.handleChange}
                value={formik.values.from}
                className={''}
                required
                id="from"
                name="from"
              />
              <label htmlFor="from">Автор</label>
              {/* <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p> */}
            </div>
            <div className={cn(s.input, s.input_text)}>
              <input
                onChange={formik.handleChange}
                value={formik.values.genre}
                className={''}
                required
                id="genre"
                name="genre"
              />
              <label htmlFor="genre">Жанр (1)</label>
              {/* <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p> */}
            </div>
          </div>

          <button
            disabled={!formik.isValid || formik.isSubmitting}
            className={cn(s.submit, { [s.error_submitBtn]: !formik.isValid })}
            type="submit">
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};
