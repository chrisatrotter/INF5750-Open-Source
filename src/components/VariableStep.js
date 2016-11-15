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
import { StepTabs } from './common';
import CircularProgress from 'material-ui/CircularProgress';



const styles = {
	checkbox: {
		marginTop:30,
	},
	buttons: {
		margin: 10,
		marginTop: 15,
	},
	progress: {
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
	}
};

var checkedObjects = [];


class VariableStep extends Component{
	props: {
		variables: Array<Object>,
		fetchMetaData: () => void,
		stepIndex: number,
		showNextStep: (stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}
	state: {
		open: boolean,
		menuList: number,
		northChecked: boolean,
		checkedVariables: Array<Object>,
		variableCat: Array<string, Number, Array<Number>>,
	}
	constructor() {
		super();
		this.state = {
			open: false,
			menuList: 1,
			northChecked: false,
			checkedVariables: [],
			variableCat: [{
				cateName: "",
				cateId: 0,
				cateSubs: [],
			}],
		}

		this.getVariableCategories().then(resp => {
			this.fillDataCats(resp.Data);
		})

	}

	async fillDataCats(data) {
		//const {variableCat} = this.state;
		var variableCategory = [];

		data.map(cat => {
			var exists = false;

			for(var i = 0; i < variableCategory.length; i++) {
				if(cat.Level1 === variableCategory[i].cateName) {
					exists = true;
					variableCategory[i].cateSubs.push(cat.SDRID);
					break;
				}
			}
				//console.log(cat.Level1);
			if(!exists){
				variableCategory.push({
					cateName: cat.Level1,
					cateId: variableCategory.length,
					cateSubs: [cat.SDRID],
				})
			}

		})

		this.setState({
			open:this.state.open,
			menuList: this.state.menuList,
			northChecked: this.state.northChecked,
			checkedVariables: this.state.checkedVariables,
			variableCat: variableCategory,
		});
	}

	getVariableCategories = () => {
		return (
			fetch('http://api.dhsprogram.com/rest/dhs/indicators?returnFields=SDRID,Level1')
				.then(response => response.json())
				.catch(function (err) {
					console.log("Error: " + err);
				}
			)
		);
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


	render() {
		if (!this.props.variables) {
			return <div>Loading... </div>;
      /*return (
				<div >
					<StepTabs stepIndex={this.props.stepIndex} />
					<div style={styles.progress}>
						<CircularProgress />
					</div>
						<FlatButton
							label="Back"
							style={{marginRight: 12,justifyContent:'center'}}
							onClick={ () => this.props.showPreviousStep(this.props.stepIndex) }
						/>
						<RaisedButton
							style={{justifyContent:'center'}}
							label="Next"
							primary={true}
							onClick={ () => this.props.showNextStep(this.props.stepIndex) }
						/>
				</div>

		)*/
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


		const checkPrint = (vara) => {
			var thisprint = this.checkIfChecked(vara);
			console.log("thisprinting: " + thisprint);
			return thisprint;
		}

		const	fillingCategoryList = (varCat) => {
				var tmpList = [];
				varCat.cateSubs.map(cat => {
					this.props.variables.map(vars => {
						if(vars.SDRID === cat) {
							tmpList.push(vars);
						}
					})
				})
				if(tmpList.length > 0) {
					return tmpList;
				} else {
					return null;
				}
			}

			const printingCategoryList = (varCat) => {

			}


		return (
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
				<StepTabs stepIndex={this.props.stepIndex} />
				<List>
					{
						this.state.variableCat.map(varCat => {
							const hello = fillingCategoryList(varCat);
							if(hello) {
								return <ListItem
									key={varCat.cateId}
									primaryText={varCat.cateName}
									primaryTogglesNestedList={true}
									nestedItems={
										hello.map(vars => {
											return <ListItem
												key={vars.DataId}
												primaryText={vars.Indicator}
												leftCheckbox={<Checkbox/>}
												/>
										})
									}/>
							} else {
								return null;
							}
						})
					}

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
