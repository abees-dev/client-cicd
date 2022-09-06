import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import CollapseSideBarProvider from '../contexts/CollapseSideBarContext';
import { CookiesProvider } from 'react-cookie';
import ThemeProvider from '../theme';
import SettingContextProvider from '../contexts/SettingContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <CookiesProvider>
        <CollapseSideBarProvider>
          <SettingContextProvider>
            <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
          </SettingContextProvider>
        </CollapseSideBarProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
