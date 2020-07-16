import { ApolloClient, InMemoryCache } from '@apollo/client';
import { token } from './token';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default client;
