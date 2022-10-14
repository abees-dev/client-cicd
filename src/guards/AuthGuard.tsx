import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setLocation } from 'src/redux/slice/location.slice';
import { PATH_AUTH } from 'src/routes/paths';
import socket from 'src/utils/socket';
import { whiteListUrl } from 'src/utils/whitelistUrl';

interface IAuthGuard {
  children: ReactElement;
}

export const AuthGuard = ({ children }: IAuthGuard) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const locationPath = useAppSelector((state) => state.location.path);
  const dispatch = useAppDispatch();
  const { replace, asPath } = useRouter();
  // const socket = useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      replace(PATH_AUTH.login);
    }
    if (locationPath !== asPath && isAuthenticated && !whiteListUrl(asPath)) {
      dispatch(setLocation(asPath));
    }
  }, [isAuthenticated, asPath]);

  useEffect(() => {
    if (isAuthenticated) {
      socket?.emit('JOIN_ROOM', user?.id);
    }
  }, [asPath]);

  return <>{children}</>;
};
