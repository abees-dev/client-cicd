import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { OverrideScroll } from 'src/components/OverrideScroll';
import useAppApolloClient from 'src/hooks/useAppApolloClient';
import { NextPageWithLayout } from 'src/types';
import NotistackProvider from '../components/Notistack';
import ProgressBar from '../components/ProgressBar';
import CollapseSideBarProvider from '../contexts/CollapseSideBarContext';
import SettingContextProvider from '../contexts/SettingContext';
import store, { persistor } from '../redux/store';
import ThemeProvider from '../theme';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const queryClient = new QueryClient();

  const apolloClient = useAppApolloClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <CookiesProvider>
                <CollapseSideBarProvider>
                  <SettingContextProvider>
                    <ThemeProvider>
                      <NotistackProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <ProgressBar />
                          <OverrideScroll />
                          <ReactQueryDevtools initialIsOpen={false} />
                          {getLayout(<Component {...pageProps} />)}
                        </LocalizationProvider>
                      </NotistackProvider>
                    </ThemeProvider>
                  </SettingContextProvider>
                </CollapseSideBarProvider>
              </CookiesProvider>
            </PersistGate>
          </ReduxProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
