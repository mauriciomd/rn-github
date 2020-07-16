import React from 'react';

import { ButtonContextProvider } from './hooks/ButtonContext';
import Home from './pages/Home';

const src: React.FC = () => {
  return (
    <ButtonContextProvider>
      <Home />
    </ButtonContextProvider>
  );
};

export default src;
