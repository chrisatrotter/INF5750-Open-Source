import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/pages/Layout';
import SurveyStep from './components/pages/SurveyStep';
import CountryStep from './components/pages/CountryStep';
import VariableStep from './components/pages/VariableStep';
import { Router, Route, IndexRoute, hashHistory } from "react-router";


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
const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={<Displaypage}>
    </Route>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      {router}
    </div>
  </Provider>,
  app);
