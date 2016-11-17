//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	checkbox: {
		marginTop:30,
	},
	buttons: {
		margin: 10,
		marginTop: 15,
	}
};

class VariableStep extends Component{
	props: {
		variables: Array<String>,
		fetchMetaData: () => void,
		stepIndex: number,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}
	state: {
		open: boolean,
		menuList: number,
		northChecked: boolean,
	}
	constructor() {
		super();
		this.state = {
			open: false,
			menuList: 1,
			northChecked: false,
		}
	}

	componentWillMount() {
		this.props.fetchMetaData()
	}

	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false});
	}

	handleNorth = () => {
		const {northChecked} = this.state;
		this.setState({northChecked: !northChecked});
	}

	handleDropMenu = (event, index, value) => {
		this.setState({menuList:value});
	}

	returnVarListMap = (variables: Array<String>) => {
		return variables.map(variable => <ListItem key={variable} primaryText={variable}/>)
	}

	render() {
		if (!this.props.variables) {
      return (<div> <p>Loading...</p> </div>)
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
				<List>
					<ListItem
						primaryText="Child health"
						primaryTogglesNestedList={true}
						nestedItems={this.props.variables.map(variable => <ListItem key={variable} primaryText={variable}/>)}
					/>
					<ListItem
						primaryText="Immunisation"
						primaryTogglesNestedList={true}
						nestedItems={[
							<ListItem
								key={"polio"}
								primaryText="Polio"
								leftCheckbox={<Checkbox />}
							 />,
							<ListItem
								key={"immun"}
								primaryText="Immun 2"
								leftCheckbox={<Checkbox />} />,
						]}
						/>
					<ListItem
						primaryText="Maternal healt" />
					<ListItem
						primaryText="HIV/Aids" />
					<ListItem
						primaryText="Malaria" />
				</List >

				<Divider/>

				<Checkbox label="Re-use existing data elements" style={styles.checkbox} />

				<RaisedButton label="Extra options" style={styles.buttons} onClick={this.handleOpen}/>
				<Dialog
					title="Dialog with extra options"
					actions={actions}
					open={this.state.open}
					onRequestClose={this.state.handleClose}>
					This is we we find informations about provinces yo
					<div style={{flexDirection: 'row'}}>
						<Checkbox label="Northern" style={styles.checkbox} onCheck={this.handleNorth}/>
						{ dropNorth }
					</div>
				</Dialog>


				<RaisedButton label="Import" primary={true} style={styles.buttons} />
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

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.routing.stepIndex,
		variables: state.fetching.variables,
  }),
  (dispatch) => ({
		fetchMetaData: () => dispatch({ type: 'META_DATA_FETCH_REQUESTED'}),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectSurveys', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
  }),
)(VariableStep);

export default ConnectedPage;
