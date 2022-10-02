import {
  ApolloClient,
  ApolloClientOptions,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import axios from 'axios';
import { createClient } from 'graphql-ws';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { refreshToken } from 'src/redux/slice/auth.slice';
import { injectStore } from 'src/utils/injectStore';

export default function useAppApolloClient() {
  const [optionClient, setOptionClient] = useState<ApolloClientOptions<NormalizedCacheObject>>({
    cache: new InMemoryCache(),
  });

  const getToken = (): string => {
    return injectStore().getState().auth.accessToken || '';
  };

  const setToken = (token: string): void => {
    injectStore().dispatch(refreshToken(token));
  };

  const { pathname } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const httpLink = createHttpLink({
        uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
        credentials: 'include',
      });

      const authLink = setContext(async (_, { headers }) => {
        const accessToken = getToken();

        try {
          const payload = accessToken && (jwtDecode(accessToken as string) as JwtPayload);

          const currentTime = (new Date().getTime() + 1) / 1000;

          const whiteListUrl = ['/auth/login', '/auth/register'].includes(pathname);

          if (payload && Number(payload.exp) < currentTime && !whiteListUrl) {
            const response = await axios({
              method: 'POST',
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/refreshToken`,
              withCredentials: true,
            });

            setToken(response.data.accessToken);
          }
        } catch (error: any) {
          console.log(error.message);
        }

        return {
          headers: {
            ...headers,
            authorization: `Bearer ${getToken()}`,
          },
        };
      });

      const wsLink = new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_SOCKET_URL as string,
          webSocketImpl: {},
        })
      );

      const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink
      );
      setOptionClient((prev) => ({ ...prev, link: authLink.concat(splitLink) }));
    }
  }, []);

  const apolloClient = new ApolloClient(optionClient);

  return apolloClient;
}
