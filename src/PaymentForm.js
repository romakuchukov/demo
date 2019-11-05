import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { InfoContext } from './context/InfoContext';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

function Counted() {
    const counted = useSelector(state => state.counted);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    return (
      <Fragment>
        <button onClick={() => dispatch(increment(3))}>+</button>
        <Typography variant="h6" gutterBottom>Payment method {counted} {isLogged}</Typography>
        <button onClick={() => dispatch(decrement())}>-</button>
        <hr/>
      </Fragment>
    );
}

const PaymentForm = () => {

  const [info, setInfo] = React.useContext(InfoContext);

  const setStore = (value, name) => {
    setInfo(prevState => ({...prevState, paymentInfo: {...prevState.paymentInfo, [name]:value} }));
  }

  const update = (e, name) => { setStore(e.target.value, name); }
  const toggle = (e, name) => { setStore(e.target.checked, name); }

  const { cardName, cardNumber, expDate, cvv, saveCard } = info.paymentInfo;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>Payment method</Typography>
        <Counted />
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
}

export default PaymentForm;