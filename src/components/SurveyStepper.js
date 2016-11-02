//@flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper , StepButton } from 'material-ui/Stepper';

import FirstStep from './FirstStep.js';
import SecondStep from './SecondStep.js';
import ThirdStep from './ThirdStep.js';

class SurveyStepper extends Component {
  state: {
    stepIndex: number,
  };
  constructor() {
    super()
    this.state = {
      stepIndex: 0,
    }
  }
  getStepContent(stepIndex: number) {
    if (stepIndex === 0) return <FirstStep />
    if (stepIndex === 1) return <SecondStep/>
    if (stepIndex === 2) return <ThirdStep />
  }
  incrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex + 1})
  }
  decrementStep = () => {
    this.setState({ stepIndex: this.state.stepIndex - 1})
  }
  render() {
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <StepTabs stepIndex={this.state.stepIndex} />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {this.getStepContent(this.state.stepIndex)}
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <FlatButton
              label="Back"
              disabled={this.state.stepIndex === 0}
              onClick={() => this.decrementStep()}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={this.state.stepIndex === 2}
              primary={true}
              onClick={() => this.incrementStep()}
            />
          </div>
      </div>
    );
  }
}

const StepTabs = ({stepIndex}) => (
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

export default SurveyStepper;
