//@flow
import React, { Component } from 'react' 
import { connect } from 'react-redux' 
import { Step, Stepper , StepButton } from 'material-ui/Stepper' 

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
}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
  }),
)(NavigationBar) 

export default ConnectedPage 
