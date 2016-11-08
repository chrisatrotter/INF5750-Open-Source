//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store'
import CountryStep from './components/CountryStep'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const StartPage = ({stepIndex}) => {
  return (
  <MuiThemeProvider>
    <CountryStep stepIndex={stepIndex}/>
  </MuiThemeProvider>
)}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.stepper.stepIndex,
  }),

)(StartPage);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedPage />
  </Provider>,
  document.getElementById('root')
);
