//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import { StepTabs } from './common'
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
	block: {
		maxWidth: 120,
	},
	checkbox: {
		marginBottom: 16,
	},
	root: {
    display: 'flex',
    justifyContent: 'space-around',
		alignItems: 'center',
  },
	gridList: {
		display: 'flex',
		justifyContent: 'center',
    width: 550,
    height: 500,
    overflowY: 'auto',
  },
};

class SurveyStep extends Component {
	props: {
		stepIndex: number,
		years: any,
		fetchyears: () => void,
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
		this.props.fetchyears()
	}
	render() {
		if (!this.props.years) {
      return (<div> <p>Loading...</p> </div>)
    }
		return (
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
			<StepTabs stepIndex={this.props.stepIndex}/>
				<div>
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

				< GridListExampleSimple
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

const CheckboxExampleSimple = ({year, selectAll}) => (
	<div style={styles.block}>
		<Checkbox
			checkedIcon={<Visibility />}
			uncheckedIcon={<VisibilityOff />}
			label={year}
			labelPosition="left"
			style={styles.checkbox}
			defaultChecked={selectAll}
		/>
	</div>
);

function removeDuplicate(years: any) {
	const s = new Set();
	years.map(survey => s.add(survey.SurveyYear))
	return Array.from(s).sort().reverse()
}

const GridListExampleSimple = ({selectAll, years}) => (
  <div style={styles.root}>
		<GridList cellHeight={20} cols={3} style={styles.gridList} >
      {removeDuplicate(years).map((year) => (
        <GridTile key={year}>
					<CheckboxExampleSimple year={year} selectAll={selectAll} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
		years: state.fetching.years,
  }),
  (dispatch) => ({
		fetchyears: () => dispatch({ type: 'YEAR_FETCH_REQUESTED' }),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })

  }),
)(SurveyStep);

export default ConnectedPage;
