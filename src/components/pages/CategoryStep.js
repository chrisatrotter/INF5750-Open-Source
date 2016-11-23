//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import ListButton from '../layout/ListButton';
import Loading from '../layout/Loading';
import DisplayText from '../layout/DisplayText';
import Divider from 'material-ui/Divider';

import type { Indicator } from '../../actions'

class CategoryStep extends Component{
	props: {
		countries: any,
		countryCode: string,
		countryName: string,
    indicators: Array<Indicator>,
		indicatorMap: Object,
    stepIndex: number,
    surveyYears: Array<number>,
    variables: Array<Object>,
		year: number,
    categorySelected: (category: any, stepIndex: number) => void,
		showPreviousStep: (stepIndex: number) => void,
	}
	state: {
		indicator: Object,
		categories: Object,
	}
	constructor() {
		super();
		this.state = {
			indicator: {},
			categories: {},
		}
	}
	generateCategories(data: any, categories: Object, indicatorMap: Object) {

		data.map(data => {
			if (categories[indicatorMap[data.IndicatorId].Level1] === undefined) {
				categories[indicatorMap[data.IndicatorId].Level1] = []
			}
			const inside = {}
			inside["Label"] = data.Indicator
      inside["Definition"] = indicatorMap[data.IndicatorId].Definition
			inside["IndicatorId"] = data.IndicatorId
			inside["DataId"] = data.DataId
			inside["SurveyId"] = data.SurveyId
			inside["Value"] = data.Value
			categories[indicatorMap[data.IndicatorId].Level1].push(inside)
			return inside
		})
	}

	flatButton(category : any) {
		return <ListButton key={category}
											 label={category}
											 onClick={() => this.props.categorySelected(this.state.categories[category], this.props.stepIndex)} />
	}

	render() {
		if (!this.props.variables || this.props.indicators.length === 0) {
      return (
				<div>
					<Loading />
					<DisplayText text={"Large amount of data are being fetched"} />
				</div>
			)
    }
		if (this.props.variables.length === 0) {
			return <DisplayText text={"There exist no data for " + this.props.countryName} />
		}

		this.generateCategories(this.props.variables, this.state.categories, this.props.indicatorMap)
		return (
			<div>
				<div style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'}}>
					<p>Select category from {this.props.countryName} - {this.props.year}</p>
				</div>
				<Divider/>
		 		<List>
		 			{Object.keys(this.state.categories).sort().map(category =>
						<ListButton key={category}
												label={category}
												onClick={() => this.props.categorySelected(category, this.state.categories[category], this.props.stepIndex)} />)}
		 		</List>
		 	</div>
		 );

  }
}

const ConnectedPage = connect(
  (state) => ({
		countries: state.fetching.countries,
		countryCode: state.survey.countryCode,
		countryName: state.survey.countryName,
    indicators: state.fetching.indicators,
		indicatorMap: state.survey.indicatorMap,
		surveyYears: state.survey.years,
    stepIndex: state.routing.stepIndex,
		variables: state.fetching.variables,
		year: state.survey.year,
  }),
  (dispatch) => ({
    categorySelected: (dataCategory: number, subCategory: any, stepIndex: number) => {
      dispatch({ type: 'CATEGORY_SELECTED', dataCategory: dataCategory, subCategory: subCategory })
      dispatch({ type: 'PAGE_REQUESTED', name: 'SelectData', stepIndex: stepIndex })
    },
		showPreviousStep: (stepIndex: number) => dispatch({ type: 'PREVIOUS_PAGE_REQUESTED', stepIndex: stepIndex })
  }),
)(CategoryStep);

export default ConnectedPage;
