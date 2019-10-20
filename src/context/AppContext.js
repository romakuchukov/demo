import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {

    const [store, setStore] = useState({});

    return (
        <AppContext.Provider value={[store, setStore]}>
            {props.children}
        </AppContext.Provider>
    );
}