//@flow
import React from 'react';
import { Step, Stepper , StepButton } from 'material-ui/Stepper';

export const StepTabs = ({stepIndex}: {stepIndex: number}) => (
  <Stepper linear={false} activeStep={stepIndex}>
    <Step>
      <StepButton>
        Select Country
      </StepButton>
    </Step>
    <Step>
      <StepButton>
        Select year(s)
      </StepButton>
    </Step>
    <Step>
      <StepButton>
        Select variables
      </StepButton>
    </Step>
  </Stepper>
);
