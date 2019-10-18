import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import ProductList from './ProductList';
import Review from './Review';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

import { Provider } from './Context'



const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
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
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.down(290)]: {
      display: 'none'
  }
  },
  steplabelInner: {
    [theme.breakpoints.down(600)]: {
        display: 'none'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const steps = ['Select a product', 'Review your purchase', 'Shipping address', 'Payment details'];

function getStepContent(step) {
  switch (step) {
    case 0: return <ProductList />;
    case 1: return <Review />;
    case 2: return <AddressForm />;
    case 3: return <PaymentForm />;
    default:throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (event) => {
    if(!parseInt(localStorage.getItem('itemCounter'), 10)) {
      setAnchorEl(event.currentTarget);
      return;
    }
    setActiveStep(activeStep + 1);

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const popOverID = open ? 'simple-popover' : undefined;
  const user = { name: 'Tania', loggedIn: true }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>Roma Inc.</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">{steps[activeStep]}</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel className={classes.steplabel}>
                  <div className={classes.steplabelInner}>{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>Thank you for your order.</Typography>
                <Typography variant="subtitle1">Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Provider value={user}>
                  {getStepContent(activeStep)}
                </Provider>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>Back</Button>
                  )}
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                  <Popover id={popOverID} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Typography className={classes.typography}>Please add at least one bike.</Typography>
                  </Popover>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Typography variant="body2" color="textSecondary" align="center">{'Copyright © '}Roma Inc.{' '}{new Date().getFullYear()}{'.'}</Typography>
      </div>
    </React.Fragment>
  );
}