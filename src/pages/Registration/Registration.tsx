import { Field, Formik, Form } from 'formik';
import React from 'react';
import ServerAPI from '../../services/musciApi';
import s from './Registration.module.scss';
import cn from 'classnames';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from './../../hooks/reduxHooks';
import { registerUser } from '../../redux/Slices/authSlice';
import { Navigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export const Registration = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isFetching } = useAppSelector((state) => state.auth);
  const validationSchema = yup.object().shape({
    email: yup.string().required('Это поле не должно быть пустым.').email('Введите почту.'),
    password: yup
      .string()
      .required('Это поле не должно быть пустым')
      .min(5, 'Пароль должен быть минимум из 5 символов')
      .max(15, 'Длина пароля не должна превыщать 15 символов'),
  });
  if (isAuth) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={s.reg_wrap}>
      <div className={s.reg_container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            dispatch(registerUser(values));
          }}>
          {({ errors, touched, isValid, isSubmitting }) => (
            <Form className={s.form}>
              <div className={s.input}>
                <Field
                  className={cn(
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

              <LoadingButton
                variant="outlined"
                loading={isFetching}
                disabled={!isValid || isSubmitting}
                type="submit">
                Зарегистрироваться
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
