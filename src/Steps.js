import React, { Fragment } from 'react';

import { Step, Stepper, StepLabel, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    stepper: {
      padding: theme.spacing(3, 0, 5),
      [theme.breakpoints.down(290)]: { display: 'none' }
    },
    stepLabel: {
        [theme.breakpoints.down(600)]: { display: 'none' }
    }
}));

const Steps = ({steps, activeStep}) => {

    const {stepper, stepLabel} = useStyles();

    return(
        <Fragment>
            <Typography component="h1" variant="h4" align="center">{steps[activeStep]}</Typography>
            <Stepper activeStep={activeStep} className={stepper}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel><div className={stepLabel}>{label}</div></StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}

export default Steps;