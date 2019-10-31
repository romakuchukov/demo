import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    stepper: {
      padding: theme.spacing(3, 0, 5),
      [theme.breakpoints.down(290)]: { display: 'none' }
    },
    steplabelInner: {
        [theme.breakpoints.down(600)]: { display: 'none' }
    }
}));

const Steps = ({steps, activeStep}) => {

    const classes = useStyles();

    return(
        <Fragment>
            <Typography component="h1" variant="h4" align="center">{steps[activeStep]}</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel><div className={classes.steplabelInner}>{label}</div></StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}

export default Steps;