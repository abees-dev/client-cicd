import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';

interface IGuestGuard {
  children: ReactElement;
}

export default function GuestGuard({ children }: IGuestGuard) {
  const { push } = useRouter();

  const path = useAppSelector((state) => state.location.path);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      push(path);
    }
  }, [isAuthenticated, path]);

  return <>{children}</>;
}
