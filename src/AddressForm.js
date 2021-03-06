import React, { Fragment } from 'react';
import { Grid, Checkbox, Typography, TextField, FormControlLabel } from '@material-ui/core';
import { InfoContext } from './context';


const AddressForm = () => {

  const [info, setInfo] = React.useContext(InfoContext);

  const setStore = (value, name) => {
    setInfo(prevState => ({
      ...prevState,
      shippingInfo: {
        ...prevState.shippingInfo, [name]: value
      }
    }));
  };

  const update = (e, name) => { setStore(e.target.value, name); };
  const toggle = (e, name) => { setStore(e.target.checked, name); };

  const { firstName, lastName, address1, address2, city, state, zip, country, saveAddress } = info.shippingInfo;

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField value={firstName} onChange={(e) => update(e, 'firstName')} label="First name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={lastName} onChange={(e) => update(e, 'lastName')} label="Last name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField value={address1} onChange={(e) => update(e, 'address1')} label="Address line 1" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField value={address2} onChange={(e) => update(e, 'address2')} label="Address line 2" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={city} onChange={(e) => update(e, 'city')} label="City" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={state} onChange={(e) => update(e, 'state')} label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={zip} onChange={(e) => update(e, 'zip')} label="Zip / Postal code" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={country} onChange={(e) => update(e, 'country')} label="Country" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox checked={saveAddress} onChange={(e) => toggle(e, 'saveAddress')} color="secondary" />} label="Use this address for payment details" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AddressForm;
