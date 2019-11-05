import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { InfoContext } from './context/InfoContext';


const AddressForm = () => {
    const [info, setInfo] = React.useContext(InfoContext);

    const update = (e, name) => {
        const value = (e.target.value === 'false') ? !!e.target.value : e.target.value;

        console.log(value)
        setInfo(prevState => ({...prevState, shippingInfo: {...prevState.shippingInfo, [name]:value} }));
    }

    const { firstName, lastName, address1, address2, city, state, zip, country, saveAddress } = info.shippingInfo;

    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField value={firstName} onChange={(e) => update(e, 'firstName')} required id="firstName" name="firstName" label="First name" fullWidth autoComplete="fname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={lastName} onChange={(e) => update(e, 'lastName')} required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="lname" />
          </Grid>
          <Grid item xs={12}>
            <TextField value={address1} onChange={(e) => update(e, 'address1')} required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="billing address-line1" />
          </Grid>
          <Grid item xs={12}>
            <TextField value={address2} onChange={(e) => update(e, 'address2')} id="address2" name="address2" label="Address line 2" fullWidth autoComplete="billing address-line2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={city} onChange={(e) => update(e, 'city')} required id="city" name="city" label="City" fullWidth autoComplete="billing address-level2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={state} onChange={(e) => update(e, 'state')} id="state" name="state" label="State/Province/Region" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={zip} onChange={(e) => update(e, 'zip')} required id="zip" name="zip" label="Zip / Postal code" fullWidth autoComplete="billing postal-code" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={country} onChange={(e) => update(e, 'country')} required id="country" name="country" label="Country" fullWidth autoComplete="billing country" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox onChange={(e) => update(e, 'saveAddress')} color="secondary" name="saveAddress" value={saveAddress} />} label="Use this address for payment details" />
          </Grid>
        </Grid>
      </Fragment>
    );
}
export default AddressForm;