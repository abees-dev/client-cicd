import { GlobalStyles, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';

export default function ProgressBar() {
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, []);
  return (
    <GlobalStyles
      styles={{
        '#nprogress': {
          pointerEvents: 'none',
          '& .bar': {
            background: theme.palette.primary.main,
            position: 'fixed',
            zIndex: 12312312,
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
          },
          '& .peg': {
            display: 'block',
            position: 'absolute',
            right: '0px',
            width: 100,
            height: '100%',
            boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
            opacity: 1.0,
          },
        },
      }}
    />
  );
}
