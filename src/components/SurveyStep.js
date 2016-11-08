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

const yearList = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998"];

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
	render() {
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

				<GridListExampleSimple selectAll={this.state.selectAll} />

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

const GridListExampleSimple = ({selectAll}) => (
  <div style={styles.root}>
		<GridList cellHeight={20} cols={3} style={styles.gridList} >
      {yearList.map((year) => (
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
  }),
  (dispatch) => ({
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })

  }),
)(SurveyStep);

export default ConnectedPage;
