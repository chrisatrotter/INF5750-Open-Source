//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../layout/Loading';
import DisplayText from '../layout/DisplayText';


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
			return <DisplayText text={"There exists no survey for" + this.props.countryName} />
		}

		return (
			<div>
				<Paper zDepth={1}>
				<List>
				{this.props.years.map(year =>
					(<FlatButton style={styles.appearance}
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

const styles = {
  appearance: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

	textStyle: {
		fontFamily: 'Courier New',
		fontWeight: 'bold',
	},

  backbutton: {
    marginRight: 12,
  },
};

export default ConnectedPage;
