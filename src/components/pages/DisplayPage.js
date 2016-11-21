//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from "./../layout/NavigationBar";
import CategoryStep from './CategoryStep';
import CountryStep from './CountryStep';
import YearStep from './YearStep';
import VariableStep from './VariableStep';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../styles/pagestyle';

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
  'SelectCategory': CategoryStep,
  'SelectCountry': CountryStep,
  'SelectSurveys': YearStep,
  'SelectData': VariableStep,
}

const Page = ({showPreviousStep, stepIndex, page}) => {
  const DisplayPage = pages[page]
  return (
      <MuiThemeProvider>
        <div>
          <NavigationBar stepIndex={stepIndex}/>
          <DisplayPage stepIndex={stepIndex}/>
          {stepIndex !== 0 && <BackButton showPreviousStep={showPreviousStep} stepIndex={stepIndex}/>}
        </div>
      </MuiThemeProvider>
)}

const BackButton = ({showPreviousStep, stepIndex}: {
  showPreviousStep: (stepIndex: number) => void,
  stepIndex: number,
}) => (
  <div style={styles.backButton}>
    <RaisedButton
      label="Back"
      primary={true}
      style={{marginRight: 12}}
      onClick={() => showPreviousStep(stepIndex)}
    />
  </div>
)

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
    page: state.routing.pageStack[state.routing.pageStack.length - 1],
  }),
  (dispatch) => ({
    showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex }),
  })
)(Page);
