//@flow

import React from 'react';


import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/*
const child_heath = [
	{
		name:"Children stunted",
		checked:true
	},
	{
		name:"Children wasted",
		checked:false
	}
];*/
const child_heath = () =>  {
	return {
		data:[
			{id:1, name: "Children stunted", selected:false },
			{id:2, name: "Children wasted", selected:true}
		]
	};
}

const styles = {
	checkbox: {
		marginTop:30,
	},
	buttons: {
		margin: 10,
		marginTop: 15,
	}
};

class ThirdStep extends React.Component{


	state = {
		open: false,
		menuList: 1,
		northChecked: false,
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
						nestedItems={[
							child_heath().data.map(function(child) {
								return (<ListItem
									key={child.name}
									primaryText={child.name}
									leftCheckbox={<Checkbox
										checked={child.selected}
										onCheck={
											function (){
												child.selected = !child.selected;
											}
										}
									/>}
								/>)}
							)
						]}
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

			</div>
		);
	}
}

module.exports = ThirdStep;
