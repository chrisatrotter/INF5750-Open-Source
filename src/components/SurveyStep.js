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
    maxWidth: 650,
  },
  checkbox: {
    marginBottom: 16,
  }
};

class SurveyStep extends Component {
	props: {
		stepIndex: number,
		years: any,
		count: number,
		addSelectedYear: (selectYear: number) => void,
		removeSelectedYear: (selectYear: number) => void,
		fetchYears: () => void,
		increaseCount: (count: number) => void,
		decreaseCount: (count: number) => void,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
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
		this.props.fetchYears()
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
							label={"Selected (" + this.props.count + ")"}
							hoverColor="green"
						/>
					</div>

					<List>
						{this.removeDuplicate(
							this.state.selectAll,
							this.props.years,
							this.props.count,
							this.props.increaseCount,
							this.props.decreaseCount,
							this.props.addSelectedYear,
							this.props.removeSelectedYear,
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

	removeDuplicate(selectAll, years, count, increaseCount, decreaseCount, addYear, removeYear) {
		const tempYear = new Set();
		years.map(survey => tempYear.add(survey.SurveyYear))
		return Array.from(tempYear).sort().reverse()
						.map(year => (
							<ListItem
								key={year}
								primaryText={this.checkboxYear(selectAll, year, count, increaseCount, decreaseCount, addYear, removeYear)}
							/>
						));
	}

	checkboxYear = (selectAll, year, count, increaseCount, decreaseCount, addYear, removeYear) => (
		<div style={styles.block}>
			<Checkbox
	      checkedIcon={<Visibility />}
	      uncheckedIcon={<VisibilityOff />}
	      label={year}
				defaultChecked={selectAll}
				labelPosition="left"
	      style={{display: 'flex', justifyContent: 'space-between'}}
				onCheck={ function(event: Object, isInputChecked: boolean) {
						if (isInputChecked === true) {
							increaseCount(count)
							addYear(year)
						} else {
							decreaseCount(count)
							removeYear(year)
						}
					}
				}
	    />
	  </div>
	);
}

const ConnectedPage = connect(
  (state) => ({
		count: state.fetching.count,
		years: state.fetching.years,
		addSelectedYear: state.fetching.addSelectedYear,
		removeSelectedYear: state.fetching.removeSelectedYear,
		stepIndex: state.routing.stepIndex,
  }),
  (dispatch) => ({
		fetchYears: () => dispatch({ type: 'YEAR_FETCH_REQUESTED' }),
		decreaseCount: (count: number) => dispatch({ type: 'DECREASE_COUNT' , count: count }),
		increaseCount: (count: number) => dispatch({ type: 'INCREASE_COUNT' , count: count }),
		addSelectedYear: (addSelectedYear: number) => dispatch({ type: 'ADD_YEAR', addSelectedYear: addSelectedYear}),
		removeSelectedYear: (removeSelectedYear: number) => dispatch({ type: 'REMOVE_YEAR', removeSelectedYear: removeSelectedYear}),
    showNextStep: (stepIndex: number, selectedYears: any) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
  }),
)(SurveyStep);

export default ConnectedPage;
