import React from 'react';

export const InfoContext = React.createContext();

export const InfoProvider = ({ children }) => {

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
        paymentInfo:{
            cvv: '',
            expDate: '',
            cardName: '',
            cardNumber: '',
            saveCard: false
        }
    });

    return (<InfoContext.Provider value={[info, setInfo]}>{children}</InfoContext.Provider>);
}