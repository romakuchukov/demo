import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Steps from './Steps';
import ActiveStep from './ActiveStep';
import ThankYouMessage from './ThankYouMessage';

const useStyles = makeStyles(theme => ({
  appBar: { position: 'relative' },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: '100%',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }
}));

const steps = ['Select a product', 'Shipping address', 'Payment details', 'Review your purchase'];

const Checkout = () => {

  const {appBar, layout, paper} = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const props = {steps, activeStep, setActiveStep};

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>Roma Inc.</Typography>
        </Toolbar>
      </AppBar>
      <div className={layout}>
        <Paper className={paper}>
          <Steps {...props} />
          {(activeStep !== steps.length) ? (<ActiveStep {...props} />) : (<ThankYouMessage />)}
        </Paper>
        <Typography variant="body2" color="textSecondary" align="center">{'Copyright © '}Roma Inc.{' '}{new Date().getFullYear()}{'.'}</Typography>
      </div>
    </Fragment>
  );
}
export default Checkout;