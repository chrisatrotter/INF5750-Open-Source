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

import type { Indicator } from '../../actions'

const styles = {
	checkbox: {
		marginTop:30,
	},
	buttons: {
		margin: 10,
		marginTop: 15,
	}
};

export type dataCategory = {
	Level1: [{
		Label: string,
		IndicatorId: string,
		Value: number,
	}]
}

class VariableStep extends Component{
	props: {
		countries: any,
		countryCode: string,
		indicatorMap: Object,
		surveyYears: Array<number>,
		variables: Array<Object>,
		fetchMetaData: (countryCode: string, surveyYears: string) => void,
		stepIndex: number,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}
	state: {
		open: boolean,
		menuList: number,
		northChecked: boolean,
		indicator: Object,
		categories: Object,
		selections: any,
	}
	constructor() {
		super();
		this.state = {
			open: false,
			menuList: 1,
			northChecked: false,
			indicator: {},
			categories: {},
			selections: [],
		}
	}

	componentWillMount() {
		this.props.fetchMetaData(this.props.countryCode, this.props.surveyYears.join(','))
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

	generateCategories(data: any, categories: Object, indicatorMap: Object) {
		data.map(data => {
			if (categories[indicatorMap[data.IndicatorId]] === undefined) {
				categories[indicatorMap[data.IndicatorId]] = []
			}
			const inside = {}
			inside["Label"] = data.Indicator
			inside["IndicatorId"] = data.IndicatorId
			inside["DataId"] = data.DataId
			inside["SurveyId"] = data.SurveyId
			inside["Value"] = data.Value
			categories[indicatorMap[data.IndicatorId]].push(inside)
			return inside
		})
	}

	onChildToggle(id: string, selected: boolean) {
		console.log("selected", selected)
		let selections = this.state.selections;
		console.log("selections", selections)
		console.log("state.sel", this.state.selections)
    selections[id] = selected;

    this.setState({
        selections: selections
    });
	}

	buildChildren(id: string) {
		return <Checkbox
						key={id}
						checked={this.state.selections[id]}
						onCheck={(event: any, isInputChecked: boolean) => this.onChildToggle(id, isInputChecked)} />
	}

	generateNestedItems(category) {
		return category.map(data => (<ListItem key={data.DataId}
														primaryText={data.Label}/>))
	}

	render() {
		if (this.props.variables.length === 0) {
      return (<div> <p>Loading...</p> </div>)
    }
		this.generateCategories(this.props.variables, this.state.categories, this.props.indicatorMap)
		console.log(this.state.categories)
		return (
			<div>

				<List>
					{Object.keys(this.state.categories).sort().map(category =>
						(<ListItem key={category}
											 primaryText={category}
											 primaryTogglesNestedList={true}
											 nestedItems={this.generateNestedItems(this.state.categories[category])}/>))}
					{/*	(<ListItem keys={category}
											 primaryText={category}
											 primaryTogglesNestedList={true}
											 nestedItems={this.state.categories[category]
												 .map(data => (<ListItem key={data.DataId}
													 											 primaryText={data.Label}
													 											 leftCheckbox={this.buildChildren(data.DataId)}/>))}/>))*/}
				</List>

				<Divider/>

				<Checkbox label="Re-use existing data elements" style={styles.checkbox} />

				<RaisedButton label="Extra options" style={styles.buttons} onClick={this.handleOpen}/>
				<Dialog
					title="Dialog with extra options"
					actions={<RaisedButton
						label="Import"
						primary={true}
						onClick={this.handleClose}
						/>}
					open={this.state.open}
					onRequestClose={this.state.handleClose}>
					This is we we find informations about provinces yo
					<div style={{flexDirection: 'row'}}>
						<Checkbox label="Northern" style={styles.checkbox} onCheck={this.handleNorth}/>
					</div>
				</Dialog>


				<RaisedButton label="Import" primary={true} style={styles.buttons} />
				<div style={{display:'flex', justifyContent: 'center'}}>
				<FlatButton
					label="Back"
					style={{marginRight: 12}}
					onClick={ () => this.props.showPreviousStep(this.props.stepIndex) }
				/>
				</div>
			</div>
		);
	}
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const ConnectedPage = connect(
  (state) => ({
		countries: state.fetching.countries,
		countryCode: state.survey.countryCode,
		indicatorMap: state.survey.indicatorMap,
		surveyYears: state.survey.years,
    stepIndex: state.routing.stepIndex,
		variables: state.fetching.variables,
  }),
  (dispatch) => ({
		fetchMetaData: (countryCode: string, surveyYears: string) => dispatch({ type: 'META_DATA_FETCH_REQUESTED', countryCode: countryCode, surveyYears: surveyYears }),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectSurveys', stepIndex: stepIndex }),
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
  }),
)(VariableStep);

export default ConnectedPage;
