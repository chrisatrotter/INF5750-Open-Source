import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/pages/Layout';
import SurveyStep from './components/pages/SurveyStep';
import CountryStep from './components/pages/CountryStep';
import VariableStep from './components/pages/VariableStep';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from "react-router";


import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
/*
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

  /*
  const pages = {
    'SelectCountry': CountryStep,
    'SelectSurveys': SurveyStep,
    'SelectData': VariableStep,
  }

  const Page = ({stepIndex, page}) => {
    const DisplayPage = pages[page]
    return (
      <div>
        <MuiThemeProvider>
          <DisplayPage stepIndex={stepIndex}/>
        </MuiThemeProvider>
      </div>
  )}

  const ConnectedPage = connect(
    (state) => ({
      stepIndex: state.routing.stepIndex,
      page: state.routing.pageStack[state.routing.pageStack.length - 1],
    }),

  )(Page);
  */

  const router = (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={CountryStep} />
        <Route path="survey" component={SurveyStep} />
        <Route path="variable" component={VariableStep} />
      </Route>
    </Router>
  )

  ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    app);
