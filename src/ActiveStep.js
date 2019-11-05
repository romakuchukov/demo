import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import ProductList from './ProductList';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import { AppContext } from './context/AppContext';
import { InfoProvider } from './context/InfoContext';

const useStyles = makeStyles(theme => ({
    stepper: {
      padding: theme.spacing(3, 0, 5),
      [theme.breakpoints.down(290)]: { display: 'none' }
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    typography: { padding: theme.spacing(2) },
}));

const getStepContent = (step) => {
    switch (step) {
      case 0: return <ProductList />;
      case 1: return <AddressForm />;
      case 2: return <PaymentForm />;
      case 3: return <Review />;
      default:throw new Error('Unknown step');
    }
}

const ActiveStep = ({steps, activeStep, setActiveStep}) => {

    const {buttons, button, typography} = useStyles();

    const [shoppingbag] = React.useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const popOverID = open ? 'simple-popover' : undefined;

    const handleNext = (event) => {
        (!shoppingbag.itemCounter) ? setAnchorEl(event.currentTarget) : setActiveStep(activeStep + 1);
    };

    const handleBack = () => setActiveStep(activeStep - 1);

    return(
        <InfoProvider>
            {getStepContent(activeStep)}
            <div className={buttons}>
                {activeStep !== 0 && (<Button onClick={handleBack} className={button}>Back</Button>)}
                <Button variant="contained" color="primary" onClick={handleNext} className={button}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
                <Popover id={popOverID} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Typography className={typography}>Please add at least one bike.</Typography>
                </Popover>
            </div>
        </InfoProvider>
    );
}

export default ActiveStep;