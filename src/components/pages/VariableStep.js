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
		if (!this.props.variables) {
      return (
				<div>
					<Loading />
					<DisplayText text={"Large amount of data are being fetched"} />
				</div>)
    }
		const dropNorth = this.state.northChecked ?
		<DropDownMenu value={this.state.menuList} onChange={this.handleDropMenu}>
			<MenuItem value={1} primaryText="Northern" />
			<MenuItem value={2} primaryText="Western" />
			<MenuItem value={3} primaryText="Eastern" />
			<MenuItem value={1} primaryText="Northern2" />
			<MenuItem value={4} primaryText="Southern" />
		</DropDownMenu> : null;

		const actions = [
			<RaisedButton
				label="Import"
				primary={true}
				onClick={this.handleClose}
				/>,
		];

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
