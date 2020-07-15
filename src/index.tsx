import React from 'react';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './services/api';
import Home from './pages/Home';

const src: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
};

export default src;
