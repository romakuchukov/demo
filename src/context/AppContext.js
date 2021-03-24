import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

  const [store, setStore] = React.useState({
    1: { counter: 0, product: null, increment: false, decrement: true },
    2: { counter: 0, product: null, increment: false, decrement: true },
    3: { counter: 0, product: null, increment: false, decrement: true },
    4: { counter: 0, product: null, increment: true, decrement: true },
    5: { counter: 0, product: null, increment: true, decrement: true },
    6: { counter: 0, product: null, increment: true, decrement: true },
    itemCounter: 0
});

  return <AppContext.Provider value={[store, setStore]}>{children}</AppContext.Provider>;
};
