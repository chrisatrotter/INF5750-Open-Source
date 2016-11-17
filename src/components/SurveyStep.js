//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { StepTabs } from './common'
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

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
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
				<StepTabs stepIndex={this.props.stepIndex}/>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<FlatButton label="Select year(s):" />
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
				<List>
				{this.props.years.map(year =>
					(<ListItem key={year.SurveyYear}
										 primaryText={<Checkbox checkedIcon={<Visibility />}
				    																uncheckedIcon={<VisibilityOff />}
																						label={year.SurveyYear}
																						labelPosition="left"
																						onCheck={(event: any, isInputChecked: boolean) => isInputChecked ?
																								this.props.yearSelected(year.SurveyYear) :
																								this.props.yearDeselected(year.SurveyYear)}
																	/>}
					 />)
				 )}
				</List>
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
