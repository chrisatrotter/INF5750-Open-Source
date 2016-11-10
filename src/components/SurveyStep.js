//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import { StepTabs } from './common'
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
	root: {
    display: 'flex',
    justifyContent: 'center'
  },
	block: {
    maxWidth: 600,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const checkboxYear = (year) => (
	<div style={styles.block}>
		<Checkbox
      checkedIcon={<Visibility />}
      uncheckedIcon={<VisibilityOff />}
      label={year}
			labelPosition="left"
      style={styles.checkbox}
    />
  </div>
);

class SurveyStep extends Component {
	props: {
		stepIndex: number,
		years: any,
		fetchYears: () => void,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}
	state: {
		selectAll: boolean
	}
	constructor() {
		super();
		this.state = {
			selectAll: false
		}
	}
	componentWillMount() {
		this.props.fetchYears()
	}
	render() {
		if (!this.props.years) {
      return (<div> <p>Loading...</p> </div>)
    }
		return (
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
			<StepTabs stepIndex={this.props.stepIndex}/>
				<div>
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
				</div>

				<ListYears
						selectAll={this.state.selectAll}
						years={this.props.years}
				/>

				<div style={{display:'flex', justifyContent: 'center'}}>
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

function removeDuplicate(years: any) {
	const s = new Set();
	years.map(survey => s.add(survey.SurveyYear))
	return Array.from(s).sort().reverse()
					.map(year => (<ListItem
						key={year}
						primaryText={checkboxYear(year)} />
					));
}

const ListYears = ({selectAll, years}) => (
	<List>
		{removeDuplicate(years)}
	</List>
);

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
		years: state.fetching.years,
  }),
  (dispatch) => ({
		fetchYears: () => dispatch({ type: 'YEAR_FETCH_REQUESTED' }),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })

  }),
)(SurveyStep);

export default ConnectedPage;
