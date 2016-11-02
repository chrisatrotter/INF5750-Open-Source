import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//import logo from './logo.svg';
import './App.css';

import FirstStep from './components/FirstStep.js';
import SecondStep from './components/SecondStep.js';
import ThirdStep from './components/ThirdStep.js';

class App extends React.Component {

    state = {
      stepIndex: 0,
    };

    handleNext = () => {
      const {stepIndex} = this.state;
      if (stepIndex < 2) {
        this.setState({stepIndex: stepIndex + 1});
      }
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    };

    getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return <FirstStep />;
        case 1:
          return <SecondStep />;
        case 2:
          return <ThirdStep />;
        default:
          return 'You\'re a long way from home sonny jim!';
      }
    }

    render() {
      const {stepIndex} = this.state;
      const contentStyle = {margin: '0 16px'};

      return (
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper linear={false} activeStep={stepIndex}>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0})}>
                Select Country
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
                Select year(s)
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
                Select variables
              </StepButton>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            <div>{this.getStepContent(stepIndex)}</div>
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label="Next"
                disabled={stepIndex === 2}
                primary={true}
                onClick={this.handleNext}
              />
            </div>
          </div>
        </div>
      );
    }
}

export default App;
