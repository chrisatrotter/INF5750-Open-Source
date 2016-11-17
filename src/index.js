//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/pages/Layout';

/*
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const pages = {
  'SelectCountry': CountryStep,
  'SelectSurveys': SurveyStep,
  'SelectData': VariableStep,
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
*/

const app = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  app);

/*
ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);*/
