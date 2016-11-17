//@flow
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper , StepButton } from 'material-ui/Stepper';

// Pass down some props from the Layout to know what step it is at.
export default class NavigationBar extends Component {
  render() {
    return (
      <Stepper linear={false} activeStep={this.props.stepIndex}>
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
    )
  }
}
