import React, { Fragment } from 'react';
import { Grid, Checkbox, TextField, Typography, FormControlLabel } from '@material-ui/core';
import { InfoContext } from './context';

const PaymentForm = () => {

  const [info, setInfo] = React.useContext(InfoContext);

  const setStore = (value, name) => {
    setInfo(prevState => ({
      ...prevState,
      paymentInfo: {
        ...prevState.paymentInfo, [name]:value
      }
    }));
  }

  const update = (e, name) => { setStore(e.target.value, name); };
  const toggle = (e, name) => { setStore(e.target.checked, name); };

  const { cardName, cardNumber, expDate, cvv, saveCard } = info.paymentInfo;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>Payment method</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField value={cardName} onChange={(e) => update(e, 'cardName')} id="cardName" label="Name on card" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField value={cardNumber} onChange={(e) => update(e, 'cardNumber')} id="cardNumber" label="Card number" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField value={expDate} onChange={(e) => update(e, 'expDate')} id="expDate" label="Expiry date" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField value={cvv} onChange={(e) => update(e, 'cvv')} id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={saveCard} onChange={(e) => toggle(e, 'saveCard')} color="secondary" />} label="Remember credit card details for next time" />
          </Grid>
        </Grid>
      </Fragment>
    );
};

export default PaymentForm;
