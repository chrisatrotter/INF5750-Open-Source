//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import NavigationBar from "./../layout/NavigationBar";
import CategoryStep from './CategoryStep';
import CountryStep from './CountryStep';
import YearStep from './YearStep';
import VariableStep from './VariableStep';
import styles from '../../styles/pagestyle';


export default class DisplayPage extends Component {
  render() {
    return (
      <div>
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
        <div>
          <div style={styles.appearance} >
          <NavigationBar stepIndex={stepIndex}/>
            <DisplayPage stepIndex={stepIndex} backButtonClick={() => showPreviousStep(stepIndex)}/>
          </div>
        </div>
)}

const mapStateToProps = (state) => ({
  stepIndex: state.routing.stepIndex,
  page: state.routing.pageStack[state.routing.pageStack.length - 1]
})

const mapDispatchToProps = (dispatch) => ({
  showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
 })

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
