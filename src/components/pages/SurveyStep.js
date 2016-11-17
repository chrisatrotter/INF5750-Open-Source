//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Paper from 'material-ui/Paper';


class SurveyStep extends Component {
	props: {
		countryCode: string,
		selectedYears: Array<number>,
		stepIndex: number,
		years: any,
		fetchYears: (countryCode: string) => void,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
		yearSelected: (year: number) => void,
		yearDeselected: (year: number) => void,
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
	componentWillMount() {
		this.props.fetchYears(this.props.countryCode)
	}
	render() {
		if (!this.props.years) {
      return (<div> <p>Loading...</p> </div>)
    }
		return (
			<div>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<FlatButton
						label="Select all"
						primary={true}
						onClick={() => this.setState({selectAll: true})}
						/>
						<FlatButton
							label="Reset"
							secondary={true}
							onClick={() => this.setState({selectAll: false})}
						/>
						<FlatButton
							label={"Selected (" + this.props.selectedYears.length + ")"}
							hoverColor="green"
						/>
					</div>
				<Paper zDepth={1}>
				<List>
				{this.props.years.map(year =>
					(<ListItem key={year.SurveyYear}
										 primaryText={<Checkbox checkedIcon={<Visibility />}
				    																uncheckedIcon={<VisibilityOff />}
																						iconStyle={{marginRight: 50}}
																						label={year.SurveyYear}
																						labelStyle={{marginLeft: 50}}
																						labelPosition="left"
																						onCheck={(event: any, isInputChecked: boolean) => isInputChecked ?
																								this.props.yearSelected(year.SurveyYear) :
																								this.props.yearDeselected(year.SurveyYear)}
																	/>}
					 />)
				 )}
				</List>
				</Paper>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<FlatButton
						label="Back"
						style={{marginRight: 12}}
						onClick={ () => this.props.showPreviousStep(this.props.stepIndex) }
					/>
					<RaisedButton
						label="Next"
						primary={true}
						onClick={ () => this.props.showNextStep(this.props.stepIndex) }
					/>
				</div>
			</div>
		);
	}
}

const ConnectedPage = connect(
  (state) => ({
		countryCode: state.survey.countryCode,
		selectedYears: state.survey.years,
		stepIndex: state.routing.stepIndex,
		years: state.fetching.years,
  }),
  (dispatch) => ({
		fetchYears: (countryCode: string) => dispatch({ type: 'YEAR_FETCH_REQUESTED', countryCode: countryCode }),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex }),
		yearSelected: (year: number) => dispatch({ type: 'YEAR_SELECTED', year: year }),
		yearDeselected: (year: number) => dispatch({ type: 'YEAR_DESELECTED', year: year }),
  }),
)(SurveyStep);

export default ConnectedPage;
