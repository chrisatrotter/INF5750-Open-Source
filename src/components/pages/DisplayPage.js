//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from "./../layout/NavigationBar";
import CountryStep from './CountryStep';
import SurveyStep from './SurveyStep';
import VariableStep from './VariableStep';

export default class DisplayPage extends Component {

  render() {
    return (
      <div style={styles.appearance}>
        <ConnectedPage />
      </div>
    )
  }
}

const pages = {
  'SelectCountry': CountryStep,
  'SelectSurveys': SurveyStep,
  'SelectData': VariableStep,
}

const Page = ({stepIndex, page}) => {
  const DisplayPage = pages[page]
  return (
      <MuiThemeProvider>
        <div>
          <NavigationBar stepIndex={stepIndex}/>
          <DisplayPage stepIndex={stepIndex}/>
        </div>
      </MuiThemeProvider>
)}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
    page: state.routing.pageStack[state.routing.pageStack.length - 1],
  }),
)(Page);

const styles = {
  appearance: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    maxWidth: 700,
    margin: 'auto',
    paddingTop: 30,
    paddingBottom: 10,
  },
};
