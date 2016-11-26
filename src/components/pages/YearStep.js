//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Loading from '../layout/Loading';
import DisplayText from '../layout/DisplayText';
import Divider from 'material-ui/Divider';
import ListButton from '../layout/ListButton';


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
      return <Loading />
    }
		if (this.props.years.length === 0) {
			return <DisplayText text={"There exists no survey for " + this.props.countryName} />
		}

		return (
			<div>
				<div style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'}}>
					<p>Select survey year from {this.props.countryName}</p>
				</div>
				<Divider/>
				<List>
				{this.props.years.map((year, index) =>
						<ListButton key={year.SurveyYear}
												label={year.SurveyYear}
												onClick={() => this.props.yearSelected(year.SurveyYear, this.props.countryCode, this.props.stepIndex)} />)}
				</List>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	countryCode: state.survey.countryCode,
	countryName: state.survey.countryName,
	selectedYears: state.survey.years,
	stepIndex: state.routing.stepIndex,
	years: state.fetching.years
})

const mapDispatchToProps = (dispatch) => ({
	showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex }),
	yearSelected: (year: number, countryCode: string, stepIndex: number) => {
		dispatch({ type: "YEAR_SELECTED", year: year })
		dispatch({ type: 'META_DATA_FETCH_REQUESTED', countryCode: countryCode, surveyYears: year })
		dispatch({ type: 'PAGE_REQUESTED', name: 'SelectCategory', stepIndex: stepIndex })
	}
})

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(YearStep);

export default ConnectedPage;
