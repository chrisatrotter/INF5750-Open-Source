// @flow

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';


const child_heath = [
	{id:1,name:"Children stunted"}, {id:2, name:"Children wasted"}
];

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
		checked: false,
	};

	handleCheck(ev:ThirdStep, checke:boolean){
		console.log(typeof ev);
		const {checked} = this.state;
		this.setState({checked: !checked});
	}



	render() {
		return (
			<div>
				<List>
					<ListItem
						primaryText="Child health"
						primaryTogglesNestedList={true}
						nestedItems={[
							child_heath.map(function(child) {
								return (<ListItem

									key={child.name}
									primaryText={child.name}
									leftCheckbox={<Checkbox />} />)})
									]}
						/>
					<ListItem
						primaryText="Immunisation"
						primaryTogglesNestedList={true}
						nestedItems={[
							<ListItem
								key={"polio"}
								primaryText="Polio"
								checked={this.state.checked}
								leftCheckbox={<Checkbox />}
								onClick={this.handleCheck.bind(this)} />,
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


				<Divider inset={true}/>
				<Checkbox label="Re-use existing data elements" style={styles.checkbox} />
				<RaisedButton label="Extra options" style={styles.buttons} />
				<RaisedButton label="Import" primary={true} style={styles.buttons} />

			</div>
		);
	}
}

module.exports = ThirdStep;
