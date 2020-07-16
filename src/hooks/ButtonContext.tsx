import React, { useContext, useState, createContext, useCallback } from 'react';

interface ButtonContextData {
  isRemoveButtonShown: boolean;
  showRemoveButton(): void;
  hideRemoveButton(): void;
}

const ButtonContext = createContext<ButtonContextData>({} as ButtonContextData);

const ButtonContextProvider: React.FC = ({ children }) => {
  const [isRemoveButtonShown, setIsRemoveButtonShown] = useState(false);

  const showRemoveButton = useCallback(() => {
    setIsRemoveButtonShown(true);
  }, []);

  const hideRemoveButton = useCallback(() => {
    setIsRemoveButtonShown(false);
  }, []);

  return (
    <ButtonContext.Provider
      value={{ isRemoveButtonShown, showRemoveButton, hideRemoveButton }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

function useButtonContex(): ButtonContextData {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButtonContext must be used inside a ButtonProvider');
  }

  return context;
}

export { ButtonContextProvider, useButtonContex };
