//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper , StepButton } from 'material-ui/Stepper';

import FirstStep from './FirstStep.js';
import SecondStep from './SecondStep.js';
import ThirdStep from './ThirdStep.js';

import type { Action } from '../actions';

class SurveyStepper extends Component {
  props: {
    stepIndex: number,
    showNextStep: (stepIndex: number) => void,
    showPreviousStep: (stepIndex: number) => void,
  };
  constructor(props: any) {
    super(props)
  }
  getStepContent(stepIndex: number) {
    if (stepIndex === 0) return <FirstStep />
    if (stepIndex === 1) return <SecondStep/>
    if (stepIndex === 2) return <ThirdStep />
  }
  render() {
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <StepTabs stepIndex={this.props.stepIndex} />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {this.getStepContent(this.props.stepIndex)}
          </div>{console.log("step:", this.props.stepIndex)}
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <FlatButton
              label="Back"
              disabled={this.props.stepIndex === 0}
              onClick={() => this.props.showPreviousStep(this.props.stepIndex)}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={this.props.stepIndex === 2}
              primary={true}
              onClick={() => this.props.showNextStep(this.props.stepIndex)}
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

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.stepper.stepIndex,
  }),
  (dispatch) => ({
    showNextStep: (stepIndex: number) => dispatch({ type: 'NEXT_STEP_REQUESTED', stepIndex: stepIndex }),
    showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_STEP_REQUESTED', stepIndex: stepIndex}),
  }),
)(SurveyStepper);

export default ConnectedPage;
