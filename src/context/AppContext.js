import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

  const [store, setStore] = React.useState({
    1:{ counter: 0, product: null },
    2:{ counter: 0, product: null },
    3:{ counter: 0, product: null },
    4:{ counter: 0, product: null },
    5:{ counter: 0, product: null },
    6:{ counter: 0, product: null },
    itemCounter: 0
  });

  return <AppContext.Provider value={[store, setStore]}>{children}</AppContext.Provider>;
};
