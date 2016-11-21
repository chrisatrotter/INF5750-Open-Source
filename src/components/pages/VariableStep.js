//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../layout/Loading';
import DisplayText from '../layout/DisplayText';

const styles = {
	checkbox: {
		marginTop:30,
	},
	buttons: {
		margin: 10,
		marginTop: 15,
	},
	loading: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

class VariableStep extends Component{
	props: {
		stepIndex: number,
		subCategory: Array<Object>,
		showPreviousStep: (stepIndex: number) => void,
	}
	render() {

		return (
			<div>
				<Table multiSelectable={true}>
					<TableHeader>
						<TableRow key={"32fnlk23fn2l3kf"}>
							<TableHeaderColumn>ID</TableHeaderColumn>
        			<TableHeaderColumn>Label</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{this.props.subCategory.map(data => (
							<TableRow key={data.DataId}>
								<TableRowColumn style={{width: 12}}>
									{data.DataId}
								</TableRowColumn>
								<TableRowColumn>
									{data.Label}
								</TableRowColumn>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Divider/>
				<Checkbox label="Re-use existing data elements" style={{marginTop:30}} />
				<RaisedButton label="Extra options" style={{margin: 10, marginTop: 15}} />
				<RaisedButton label="Import" primary={true} style={{margin: 10, marginTop: 15}} />
			</div>
		);
	}
}

const ConnectedPage = connect(
  (state) => ({
		stepIndex: state.routing.stepIndex,
		subCategory: state.survey.subCategory,
  }),
  (dispatch) => ({
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
  }),
)(VariableStep);

export default ConnectedPage;
