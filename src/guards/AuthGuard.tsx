import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setLocation } from 'src/redux/slice/location.slice';
import { PATH_AUTH } from 'src/routes/paths';

interface IAuthGuard {
  children: ReactElement;
}

export const AuthGuard = ({ children }: IAuthGuard) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const locationPath = useAppSelector((state) => state.location.path);
  const dispatch = useAppDispatch();
  const { replace, pathname } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      replace(PATH_AUTH.login);
    }
    if (locationPath !== pathname && isAuthenticated) {
      dispatch(setLocation(pathname));
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};
