import React, { useEffect } from 'react';
import s from './Routes.module.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { Layout } from '../pages/Layout';
import { routes } from './RoutesData';
import { useAppDispatch } from './../hooks/reduxHooks';
import { resetFilters } from '../redux/Slices/musicSlice';

export const Router: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetFilters());
  }, [location]);
  return (
    <Routes>
      {routes.map((route) => {
        if (route.auth && !isAuth) {
          return false;
        }

        return (
          <Route
            path={route.path}
            element={
              <Layout>
                <route.element />
              </Layout>
            }
          />
        );
      })}
      <Route
        path="*"
        element={
          <Layout>
            <Navigate replace to={'/'} />
          </Layout>
        }
      />
    </Routes>
  );
};
