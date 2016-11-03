//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store'
import SurveyStepper from './components/SurveyStepper'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const StartPage = ({stepIndex}) => {
  return (
  <MuiThemeProvider>
    <SurveyStepper stepIndex={stepIndex}/>
  </MuiThemeProvider>
)}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.stepper.stepIndex,
  }),
  (dispatch) => ({
    showNextStep: (stepIndex: number) => { dispatch({ type: 'NEXT_STEP_REQUESTED', stepIndex: stepIndex })},
    showPreviousStep: (stepIndex: number) => { dispatch({ type: 'PREVIOUS_STEP_REQUESTED', stepIndex: stepIndex})}
  })
)(StartPage);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedPage />
  </Provider>,
  document.getElementById('root')
);
