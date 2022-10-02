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
import { createClient } from 'graphql-ws';
import { useEffect, useState } from 'react';
import { injectStore } from 'src/utils/injectStore';

export default function useAppApolloClient() {
  const [optionClient, setOptionClient] = useState<ApolloClientOptions<NormalizedCacheObject>>({
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
      });

      const authLink = setContext((_, { headers }) => {
        const accessToken = injectStore().getState().auth.accessToken;
        return {
          headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        };
      });

      const wsLink = new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_SOCKET_URL as string,
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
