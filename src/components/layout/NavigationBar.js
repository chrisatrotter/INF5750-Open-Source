//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Step, Stepper , StepButton } from 'material-ui/Stepper';

// Pass down some props from the Layout to know what step it is at.
class NavigationBar extends Component {
  props: {
    stepIndex: number,
  }
  render() {
    return (
      <Stepper linear={true} style={{flexWrap:'wrap'}} activeStep={this.props.stepIndex}>
        <Step>
          <StepButton>
            Select Country
          </StepButton>
        </Step>
        <Step>
          <StepButton>
            Select year
          </StepButton>
        </Step>
        <Step>
          <StepButton>
            Select category
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

  countrypage = () => {
    alert("Countrypage pop up");
    // Set up the actions needed. INITAL_PAGE_REQUESTED
  }

  surveypage = () => {
    alert("surveypage pop up");
    // Set up the actions needed. SURVEY_PAGE_REQUESTED
  }
}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
  }),
)(NavigationBar);

export default ConnectedPage;
