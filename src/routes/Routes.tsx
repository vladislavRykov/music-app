import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { Layout } from '../pages/Layout';
import { routes } from './RoutesData';

interface RouterProps {
  startPageProps: { theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> };
}

export const Router: React.FC<RouterProps> = ({ startPageProps }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  // const location = useLocation();
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(resetFilters());
  // }, [location]);
  return (
    <Routes>
      {routes.map((route) => {
        if (route.auth && !isAuth) {
          return false;
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <route.element {...startPageProps} />
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
