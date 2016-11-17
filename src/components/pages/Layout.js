import React, { Component } from "react";
import Header from "./../layout/Header";
import NavigationBar from "./../layout/NavigationBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CountryStep from './CountryStep';
import SurveyStep from './SurveyStep';
import VariableStep from './VariableStep';
import DisplayPage from './DisplayPage';
import { connect } from "react-redux";

/*
const pages = {
  'SelectCountry': CountryStep,
  'SelectSurveys': SurveyStep,
  'SelectData': VariableStep,
}

const Page = ({stepIndex, page}) => {
  const DisplayPage = pages[page]
  return (
    <div style={styles.appearance}>
      <MuiThemeProvider>
        <div>
        <NavigationBar stepIndex={stepIndex}/>
        <DisplayPage stepIndex={stepIndex}/>
        </div>
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

//@connect()
export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <DisplayPage />
      </div>
    )
  }
}
