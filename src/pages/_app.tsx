import type { AppProps } from 'next/app';
import React from 'react';
import ThemeProvider from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
