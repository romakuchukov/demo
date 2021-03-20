import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

const ThankYouMessage = () => {

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>Thank you for your order.</Typography>
      <Typography variant="subtitle1">Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.</Typography>
    </Fragment>
  );
};

export default ThankYouMessage;
