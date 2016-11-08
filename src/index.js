//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store'
import CountryStep from './components/CountryStep'
import SurveyStep from './components/SurveyStep'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const pages = {
  'SelectCountry': CountryStep,
  'SelectSurveys': SurveyStep,
}

const Page = ({stepIndex, page}) => {
  const DisplayPage = pages[page]
  return (
  <MuiThemeProvider>
    <DisplayPage stepIndex={stepIndex}/>
  </MuiThemeProvider>
)}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
    page: state.routing.pageStack[state.routing.pageStack.length - 1],
  }),

)(Page);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedPage />
  </Provider>,
  document.getElementById('root')
);
