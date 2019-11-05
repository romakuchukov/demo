import React from 'react';

export const InfoContext = React.createContext();

export const InfoProvider = props => {

    const [info, setInfo] = React.useState({
        shippingInfo: {
            firstName:'',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            saveAddress: false
        },
        paymentInfo:{}
    });

    return (<InfoContext.Provider value={[info, setInfo]}>{props.children}</InfoContext.Provider>);
}