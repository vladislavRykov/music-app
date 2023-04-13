import React, { useEffect } from 'react';
import s from './Login.module.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import ServerAPI from '../../services/musciApi';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from './../../hooks/reduxHooks';
import { loginUser } from '../../redux/Slices/authSlice';
import { totalStopMusic } from '../../redux/Slices/selectedAudioSlice';

export const Login = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    email: yup.string().required('Это поле не должно быть пустым.').email('Введите почту.'),
    password: yup.string().required('Это поле не должно быть пустым'),
  });
  useEffect(() => {
    dispatch(totalStopMusic());
  }, []);
  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={s.login_wrap}>
      <div className={s.login_container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await dispatch(loginUser(values));
          }}>
          {({ errors, isSubmitting, touched, isValid }) => (
            <Form className={s.form}>
              <div className={s.input}>
                <Field
                  className={cn(
                    s.input_field,
                    { [s.normal_underLine]: !errors.email || !touched.email },
                    { [s.error_underLine]: errors.email && touched.email },
                  )}
                  required
                  id="email"
                  name="email"
                />
                <label htmlFor="email">Email</label>
                <p>{errors.email && touched.email && errors.email}</p>
              </div>
              <div className={s.input}>
                <Field
                  className={cn(
                    s.input_field,
                    { [s.normal_underLine]: !errors.password || !touched.password },
                    { [s.error_underLine]: errors.password && touched.password },
                  )}
                  type={'password'}
                  required
                  id="password"
                  name="password"
                />
                <label htmlFor="password">Password</label>
                <p>{errors.password && touched.password && errors.password}</p>
              </div>

              <button
                disabled={!isValid || isSubmitting}
                className={cn(s.submit, { [s.error_submitBtn]: !isValid })}
                type="submit">
                Войти
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Link className={s.registration_link} to={'/register'}>
        Пройти регистрацию
      </Link>
    </div>
  );
};
