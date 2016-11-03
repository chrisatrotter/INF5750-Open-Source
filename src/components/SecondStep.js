//@flow
import React, { Component } from 'react';

import { GridList, GridTile } from 'material-ui/GridList';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import FlatButton from 'material-ui/FlatButton';

const styles = {
	block: {
		maxWidth: 120,
	},
	checkbox: {
		marginBottom: 16,
	},
	root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
	gridList: {
    width: 550,
    height: 500,
    overflowY: 'auto',
  },
};

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

const GridListExampleSimple = ({selectAll, listOfYear}) => (
  <div style={styles.root}>
		<GridList cellHeight={20} cols={3} style={styles.gridList} >
      {listOfYear.map((year) => (
        <GridTile key={year}>
					<CheckboxExampleSimple year={year} selectAll={selectAll} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

class SecondStep extends Component {
	state: {
		selectAll: boolean,
		listOfYear: array
	}
	constructor() {
		super();
		this.state = {
			selectAll: false,
			listOfYear: []
		}
		//const yearList = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998"];
		this.fetchYear().then(response => this.setListOfYear(response.Data))
	}
	setListOfYear(data) {
		const s = new Set();
		data.map(year => s.add(year.SurveyYear));
		this.setState({listOfYear: (Array.from(s)).sort().reverse()});
	}
	async fetchYear() {
		return (fetch('http://api.dhsprogram.com/rest/dhs/surveys/')
						.then(response => response.json()))
	}
	render() {
		return (
			<div>
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

				< GridListExampleSimple
						selectAll={this.state.selectAll}
						listOfYear={this.state.listOfYear}
				/>
			</div>
		);
	}
}

export default SecondStep;
