import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = props => {

    const [store, setStore] = React.useState({ itemCounter: 0 });

    return (<AppContext.Provider value={[store, setStore]}>{props.children}</AppContext.Provider>);
}