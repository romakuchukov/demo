import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

function Counted() {
    const counted = useSelector(state => state.counted);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    return (
      <React.Fragment>
        <button onClick={() => dispatch(increment(3))}>+</button>
        <Typography variant="h6" gutterBottom>Payment method {counted} {isLogged}</Typography>
        <button onClick={() => dispatch(decrement())}>-</button>
        <hr/>
      </React.Fragment>
    );
}

export default class PaymentForm extends Component {

  render(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>Payment method</Typography>
        <Counted />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Name on card" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="cardNumber" label="Card number" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Expiry date" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox color="secondary" name="saveCard" value="yes" />} label="Remember credit card details for next time" />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
