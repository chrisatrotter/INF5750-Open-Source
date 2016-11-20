//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';


class YearStep extends Component {
	props: {
		countryCode: string,
		countryName: string,
		selectedYears: Array<number>,
		stepIndex: number,
		years: any,
		showPreviousStep: (stepIndex: number) => void,
		yearSelected: (year: number) => void,
	}
	state: {
		selectAll: boolean,
	}
	constructor() {
		super();
		this.state = {
			selectAll: false,
		}
	}
	render() {
		if (!this.props.years) {
      return (
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<CircularProgress size={60} thickness={5} />
				</div>
			)
    }
		if (this.props.years.length === 0) {
			return (
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<p>There exist no survey for {this.props.countryName}</p>
				</div>
			)
		} else {
		return (
			<div>
				<Paper zDepth={1}>
				<List>
				{this.props.years.map(year =>
					(<FlatButton style={{ display: 'flex', justifyContent: 'center', width: '100%'}}
											 key={year.SurveyYear}
											 hoverColor={'#B5D66B'}
											 label={year.SurveyYear}
											 labelStyle={{textTransform: 'capitalize'}}
											 onClick={() => this.props.yearSelected(year.SurveyYear, this.props.countryCode, this.props.stepIndex)}/>))}
				</List>
				</Paper>
			</div>
		);
	}
}
}

const ConnectedPage = connect(
  (state) => ({
		countryCode: state.survey.countryCode,
		countryName: state.survey.countryName,
		selectedYears: state.survey.years,
		stepIndex: state.routing.stepIndex,
		years: state.fetching.years,
  }),
  (dispatch) => ({
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex }),
		yearSelected: (year: number, countryCode: string, stepIndex: number) => {
			dispatch({ type: 'META_DATA_FETCH_REQUESTED', countryCode: countryCode, surveyYears: year })
			dispatch({ type: 'PAGE_REQUESTED', name: 'SelectCategory', stepIndex: stepIndex })
		},
  }),
)(YearStep);

export default ConnectedPage;
