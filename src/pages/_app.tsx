import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import CollapseSideBarProvider from '../contexts/CollapseSideBarContext';
import { CookiesProvider } from 'react-cookie';
import ThemeProvider from '../theme';
import SettingContextProvider from '../contexts/SettingContext';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProgressBar from '../components/ProgressBar';

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
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CookiesProvider>
            <CollapseSideBarProvider>
              <SettingContextProvider>
                <ThemeProvider>
                  <>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </>
                </ThemeProvider>
              </SettingContextProvider>
            </CollapseSideBarProvider>
          </CookiesProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
