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
import NotistackProvider from '../components/Notistack';
import { NextPageWithLayout } from 'src/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const queryClient = new QueryClient();
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <CookiesProvider>
              <CollapseSideBarProvider>
                <SettingContextProvider>
                  <ThemeProvider>
                    <NotistackProvider>
                      <ProgressBar />
                      <ReactQueryDevtools initialIsOpen={false} />
                      {getLayout(<Component {...pageProps} />)}
                    </NotistackProvider>
                  </ThemeProvider>
                </SettingContextProvider>
              </CollapseSideBarProvider>
            </CookiesProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
