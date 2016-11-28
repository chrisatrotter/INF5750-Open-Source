//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash'
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import styles from '../../styles/pagestyle';


export class VariableStep extends Component{
	props: {
		countryName: string,
		dataCategory: string,
		dataSelected: Array<number>,
		stepIndex: number,
		subCategory: Array<Object>,
		year: number,
		selectData: (dataId: number) => void,
		deselectData: (dataId: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}

	state: {
		open: boolean,
		selectedRows: any,
		inputVariable: string,
	}

	constructor() {
		super();
		this.state = {
			open: false,
			selectedRows: [],
			inputVariable: '',
		}
	}

  handleOpen (){
    this.setState({open: true});
  };
  handleClose () {
    this.setState({open: false});
  };

	getUserInputVariable (event){
		this.setState({inputVariable: event.target.value})
	}

	render() {

		const stepHeader = "Select data of " + this.props.dataCategory + " from " + this.props.countryName + " - " + this.props.year;
		return (
			<div>
				<TextField
					hintText={stepHeader}
					fullWidth={true}
					value={this.state.inputVariable}
					onChange={(event) => this.getUserInputVariable(event)}
				/>
				<div style={styles.text}>
					<p>Select data of {this.props.dataCategory} from {this.props.countryName} - {this.props.year}</p>
				</div>
				<Divider/>
					<List>
						{this.props.subCategory && this.props.subCategory
							.filter(data => data.Label.toLowerCase().startsWith(this.state.inputVariable.toLowerCase()))
							.map((data, index) =>
							<div key={index}>
								<ListItem key={data.DataId}
												 	style={{fontFamily: 'sans-serif'}}
													primaryText={data.Label}
													secondaryText={data.Definition}
													secondaryTextLines={2}
													leftCheckbox={<Checkbox key={data.DataId}
																									style={{marginTop: 12}}
																									onCheck={(event: Object, isInputChecked: boolean) =>
																									isInputChecked ? this.props.selectData(data.DataId) : this.props.deselectData(data.DataId)}/>}/>
								<Divider/>
							</div>)}
					</List>
					<div style={{display: 'flex', justifyContent: 'center'}}>
					<RaisedButton secondary={true} disabled={this.props.dataSelected.length === 0} label="Import" onClick={() => this.handleOpen()} />
				</div>
				<div style={{display: 'flex', justifyContent: 'center', marginRight: 12}}>
					<Subheader style={{display: 'flex', justifyContent: 'center'}}>or</Subheader>
				</div>
				{this.state.open &&
					<ImportDialog open={this.state.open}
												countryName={this.props.countryName}
												dataSelected={this.props.dataSelected}
												handleClose={() => this.handleClose()}
												subCategory={this.props.subCategory}
												year={this.props.year}/>}
			</div>
		);
	}
}

function createTitle(countryName: string, year: number) {
	return "Data selected from " + countryName + " - " + year
}

const ImportDialog = ({open, handleClose, dataSelected, subCategory, countryName, year}) => {
	return (<Dialog
		title={createTitle(countryName, year)}
		actions={[
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => handleClose()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => handleClose()}
      />,
    ]}
		modal={false}
		open={open}
		onRequestClose={handleClose}
		autoScrollBodyContent={true}
	>
		{dataSelected.map((dataId, index) => {
			const matchedDataObject = find(subCategory, subData => subData.DataId === dataId)
			return (<ListItem key={index} primaryText={matchedDataObject.Label} />)
			})
		}
	</Dialog>
)}

const mapStateToProps = (state) => ({
	countryName: state.survey.countryName,
	dataCategory: state.survey.dataCategory,
	dataSelected: state.survey.data,
	subCategory: state.survey.subCategory,
	stepIndex: state.routing.stepIndex,
	year: state.survey.year
})

const mapDispatchToProps = (dispatch) => ({
	deselectData: (dataId: number) => dispatch({ type: 'DATA_DESELECTED', dataId: dataId }),
	selectData: (dataId: number) => dispatch({ type: 'DATA_SELECTED', dataId: dataId }),
	showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
 })

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariableStep);

export default ConnectedPage;
